import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-utils";
import { getLessonsCollection, ObjectId } from "@/lib/mongodb";

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

function serializeLesson(lesson, userMap = {}) {
  const creator = userMap[lesson.creatorId?.toString()] || {};
  return {
    id: lesson._id.toString(),
    title: lesson.title,
    description: lesson.description,
    category: lesson.category,
    emotionalTone: lesson.emotionalTone,
    visibility: lesson.visibility,
    accessLevel: lesson.accessLevel,
    imageUrl: lesson.imageUrl || "",
    likes: lesson.likes || [],
    likesCount: lesson.likesCount || 0,
    favoritesCount: lesson.favoritesCount || 0,
    isFeatured: Boolean(lesson.isFeatured),
    isReviewed: Boolean(lesson.isReviewed),
    creatorId: lesson.creatorId?.toString(),
    creator: {
      name: creator.name || "Anonymous",
      photoURL: creator.image || creator.photoURL || "",
    },
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
  };
}

export async function GET(request) {
  try {
    const user = await getSessionUser();
    const { searchParams } = new URL(request.url);
    const mine = searchParams.get("mine") === "true";

    const lessonsCol = await getLessonsCollection();

    if (mine) {
      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const lessons = await lessonsCol
        .find({ creatorId: user.id })
        .sort({ createdAt: -1 })
        .toArray();
      return NextResponse.json({
        lessons: lessons.map((l) => serializeLesson(l, { [user.id]: user })),
      });
    }

    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      emotionalTone,
      visibility = "Private",
      accessLevel = "Free",
      imageUrl = "",
    } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    if (!CATEGORIES.includes(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    if (!TONES.includes(emotionalTone)) {
      return NextResponse.json({ error: "Invalid emotional tone" }, { status: 400 });
    }

    const resolvedAccess =
      accessLevel === "Premium" && user.isPremium ? "Premium" : "Free";

    const now = new Date();
    const doc = {
      title: title.trim(),
      description: description.trim(),
      category,
      emotionalTone,
      visibility,
      accessLevel: resolvedAccess,
      imageUrl,
      creatorId: user.id,
      likes: [],
      likesCount: 0,
      favoritesCount: 0,
      isFeatured: false,
      isReviewed: false,
      createdAt: now,
      updatedAt: now,
    };

    const lessonsCol = await getLessonsCollection();
    const result = await lessonsCol.insertOne(doc);

    return NextResponse.json(
      { lesson: serializeLesson({ ...doc, _id: result.insertedId }, { [user.id]: user }) },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
