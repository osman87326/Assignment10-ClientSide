import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth-utils";
import {
  getReportsCollection,
  getLessonsCollection,
  getUsersCollection,
} from "@/lib/mongodb";

export async function GET() {
  try {
    await requireAdminUser();
    const reportsCol = await getReportsCollection();
    const lessonsCol = await getLessonsCollection();
    const usersCol = await getUsersCollection();

    const reports = await reportsCol.find({}).sort({ timestamp: -1 }).toArray();

    const grouped = {};
    for (const report of reports) {
      if (!grouped[report.lessonId]) {
        grouped[report.lessonId] = [];
      }
      grouped[report.lessonId].push(report);
    }

    const lessonIds = Object.keys(grouped);
    const { ObjectId } = await import("mongodb");
    const objectIds = lessonIds.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
    const lessons = await lessonsCol.find({ _id: { $in: objectIds } }).toArray();
    const lessonMap = Object.fromEntries(lessons.map((l) => [l._id.toString(), l]));

    const reporterIds = reports.map((r) => r.reporterUserId);
    const users = await usersCol.find({ id: { $in: reporterIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const items = lessonIds.map((lessonId) => {
      const lesson = lessonMap[lessonId];
      const lessonReports = grouped[lessonId];
      return {
        lessonId,
        title: lesson?.title || "Deleted lesson",
        reportCount: lessonReports.length,
        reports: lessonReports.map((r) => ({
          reason: r.reason,
          reporter: userMap[r.reporterUserId]?.name || r.reportedUserEmail,
          timestamp: r.timestamp,
        })),
      };
    });

    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await requireAdminUser();
    const { lessonId, action } = await request.json();
    const { ObjectId } = await import("mongodb");

    if (!ObjectId.isValid(lessonId)) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
    }

    const reportsCol = await getReportsCollection();
    const lessonsCol = await getLessonsCollection();

    if (action === "delete") {
      await lessonsCol.deleteOne({ _id: new ObjectId(lessonId) });
      await reportsCol.deleteMany({ lessonId });
    } else if (action === "ignore") {
      await reportsCol.deleteMany({ lessonId });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
