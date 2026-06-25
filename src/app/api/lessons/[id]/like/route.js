import { NextResponse } from "next/server";
import { requireSessionUser } from "@/lib/auth-utils";
import { getLessonsCollection, toObjectId } from "@/lib/mongodb";

export async function POST(request, { params }) {
  try {
    const user = await requireSessionUser();
    const { id } = await params;
    const objectId = toObjectId(id);
    if (!objectId) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
    }

    const lessonsCol = await getLessonsCollection();
    const lesson = await lessonsCol.findOne({ _id: objectId });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const likes = lesson.likes || [];
    const hasLiked = likes.includes(user.id);
    const nextLikes = hasLiked
      ? likes.filter((uid) => uid !== user.id)
      : [...likes, user.id];

    await lessonsCol.updateOne(
      { _id: objectId },
      {
        $set: {
          likes: nextLikes,
          likesCount: nextLikes.length,
        },
      },
    );

    return NextResponse.json({
      liked: !hasLiked,
      likesCount: nextLikes.length,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
