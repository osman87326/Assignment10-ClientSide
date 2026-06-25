import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth-utils";
import { getLessonsCollection, getUsersCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    await requireAdminUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const visibility = searchParams.get("visibility") || "";

    const filter = {};
    if (category && category !== "All Categories") filter.category = category;
    if (visibility) filter.visibility = visibility;

    const lessonsCol = await getLessonsCollection();
    const lessons = await lessonsCol.find(filter).sort({ createdAt: -1 }).limit(100).toArray();

    const creatorIds = lessons.map((l) => l.creatorId);
    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: creatorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const [publicCount, privateCount] = await Promise.all([
      lessonsCol.countDocuments({ visibility: "Public" }),
      lessonsCol.countDocuments({ visibility: "Private" }),
    ]);

    return NextResponse.json({
      stats: { publicCount, privateCount },
      lessons: lessons.map((l) => ({
        id: l._id.toString(),
        title: l.title,
        author: userMap[l.creatorId]?.name || "Unknown",
        visibility: l.visibility,
        accessLevel: l.accessLevel,
        isFeatured: Boolean(l.isFeatured),
        isReviewed: Boolean(l.isReviewed),
        category: l.category,
        createdAt: l.createdAt,
      })),
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await requireAdminUser();
    const { lessonId, isFeatured, isReviewed } = await request.json();
    const { ObjectId } = await import("mongodb");

    if (!ObjectId.isValid(lessonId)) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
    }

    const updates = {};
    if (isFeatured !== undefined) updates.isFeatured = Boolean(isFeatured);
    if (isReviewed !== undefined) updates.isReviewed = Boolean(isReviewed);

    const lessonsCol = await getLessonsCollection();
    await lessonsCol.updateOne({ _id: new ObjectId(lessonId) }, { $set: updates });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
