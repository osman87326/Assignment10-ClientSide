import { NextResponse } from "next/server";
import { getLessonsCollection, getUsersCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const lessonsCol = await getLessonsCollection();
    const lessons = await lessonsCol
      .find({ visibility: "Public", isFeatured: true })
      .sort({ updatedAt: -1 })
      .limit(3)
      .toArray();

    const creatorIds = lessons.map((l) => l.creatorId);
    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: creatorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const data = lessons.map((lesson) => ({
      id: lesson._id.toString(),
      category: lesson.category,
      readTime: `${Math.max(1, Math.ceil(lesson.description.split(/\s+/).length / 200))} min read`,
      title: lesson.title,
      description: lesson.description.slice(0, 160),
      imageUrl:
        lesson.imageUrl ||
        "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop",
      href: `/lessons/${lesson._id.toString()}`,
      bgClass: "bg-[#F6F0DD]",
    }));

    return NextResponse.json({ lessons: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
