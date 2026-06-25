import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireSessionUser } from "@/lib/auth-utils";
import {
  getFavoritesCollection,
  getLessonsCollection,
  getUsersCollection,
} from "@/lib/mongodb";

export async function GET(request) {
  try {
    const user = await requireSessionUser();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const tone = searchParams.get("tone") || "";

    const favoritesCol = await getFavoritesCollection();
    const favorites = await favoritesCol
      .find({ userId: user.id })
      .sort({ savedAt: -1 })
      .toArray();

    const objectIds = favorites
      .map((f) => f.lessonId)
      .filter((id) => ObjectId.isValid(id))
      .map((id) => new ObjectId(id));

    const lessonsCol = await getLessonsCollection();
    const lessonFilter = { _id: { $in: objectIds } };
    if (category && category !== "All Categories") lessonFilter.category = category;
    if (tone && tone !== "Any Tone") lessonFilter.emotionalTone = tone;

    const lessons = await lessonsCol.find(lessonFilter).toArray();
    const creatorIds = lessons.map((l) => l.creatorId);
    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: creatorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    return NextResponse.json({
      favorites: lessons.map((lesson) => ({
        id: lesson._id.toString(),
        title: lesson.title,
        category: lesson.category,
        emotionalTone: lesson.emotionalTone,
        accessLevel: lesson.accessLevel,
        creatorName: userMap[lesson.creatorId]?.name || "Unknown",
        createdAt: lesson.createdAt,
        href: `/lessons/${lesson._id.toString()}`,
      })),
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await requireSessionUser();
    const { lessonId } = await request.json();

    if (!lessonId) {
      return NextResponse.json({ error: "lessonId required" }, { status: 400 });
    }

    const favoritesCol = await getFavoritesCollection();
    const existing = await favoritesCol.findOne({ userId: user.id, lessonId });

    const lessonsCol = await getLessonsCollection();

    if (existing) {
      await favoritesCol.deleteOne({ _id: existing._id });
      if (ObjectId.isValid(lessonId)) {
        await lessonsCol.updateOne(
          { _id: new ObjectId(lessonId) },
          { $inc: { favoritesCount: -1 } },
        );
      }
      return NextResponse.json({ saved: false });
    }

    await favoritesCol.insertOne({
      userId: user.id,
      lessonId,
      savedAt: new Date(),
    });

    if (ObjectId.isValid(lessonId)) {
      await lessonsCol.updateOne(
        { _id: new ObjectId(lessonId) },
        { $inc: { favoritesCount: 1 } },
      );
    }

    return NextResponse.json({ saved: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
