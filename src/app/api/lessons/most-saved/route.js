import { NextResponse } from "next/server";
import { getLessonsCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const lessonsCol = await getLessonsCollection();
    const lessons = await lessonsCol
      .find({ visibility: "Public" })
      .sort({ favoritesCount: -1 })
      .limit(3)
      .toArray();

    const data = lessons.map((lesson) => ({
      id: lesson._id.toString(),
      title: lesson.title,
      description: lesson.description.slice(0, 120),
      author: `@${lesson.creatorId?.slice(0, 8) || "member"}`,
      authorHref: `/dashboard/profile?user=${lesson.creatorId}`,
      date: lesson.createdAt
        ? new Date(lesson.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      saveCount:
        lesson.favoritesCount >= 1000
          ? `${(lesson.favoritesCount / 1000).toFixed(1)}k`
          : String(lesson.favoritesCount || 0),
      imageUrl:
        lesson.imageUrl ||
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      href: `/lessons/${lesson._id.toString()}`,
    }));

    return NextResponse.json({ lessons: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
