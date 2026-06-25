import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/auth-utils";
import { getReportsCollection, getLessonsCollection, toObjectId } from "@/lib/mongodb";

const REASONS = [
  "Spam or misleading",
  "Harassment or hate speech",
  "Inappropriate content",
  "Copyright violation",
  "Other",
];

export async function POST(request, { params }) {
  try {
    const user = await requireSessionUser();
    const { id } = await params;
    const objectId = toObjectId(id);
    if (!objectId) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
    }

    const body = await request.json();
    const { reason } = body;

    if (!REASONS.includes(reason)) {
      return NextResponse.json({ error: "Invalid reason" }, { status: 400 });
    }

    const lessonsCol = await getLessonsCollection();
    const lesson = await lessonsCol.findOne({ _id: objectId });
    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const reportsCol = await getReportsCollection();
    await reportsCol.insertOne({
      lessonId: id,
      reporterUserId: user.id,
      reportedUserEmail: user.email,
      reason,
      timestamp: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
