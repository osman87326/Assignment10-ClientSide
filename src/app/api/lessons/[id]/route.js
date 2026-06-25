import { NextResponse } from "next/server";
import { getSessionUser, requireSessionUser } from "@/lib/auth-utils";
import {
  getLessonsCollection,
  getUsersCollection,
  toObjectId,
} from "@/lib/mongodb";

const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

async function getCreatorMap(creatorIds) {
  const usersCol = await getUsersCollection();
  const ids = [...new Set(creatorIds.filter(Boolean))];
  const users = await usersCol.find({ id: { $in: ids } }).toArray();
  return Object.fromEntries(users.map((u) => [u.id, u]));
}

function serializeLesson(lesson, userMap = {}, viewer = null) {
  const creator = userMap[lesson.creatorId] || {};
  const isPremiumLocked =
    lesson.accessLevel === "Premium" && !viewer?.isPremium && lesson.creatorId !== viewer?.id;

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
    creatorId: lesson.creatorId,
    creator: {
      name: creator.name || "Anonymous",
      photoURL: creator.image || creator.photoURL || "",
    },
    createdAt: lesson.createdAt,
    updatedAt: lesson.updatedAt,
    isPremiumLocked,
  };
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const objectId = toObjectId(id);
    if (!objectId) {
      return NextResponse.json({ error: "Invalid lesson id" }, { status: 400 });
    }

    const viewer = await getSessionUser();
    const lessonsCol = await getLessonsCollection();
    const lesson = await lessonsCol.findOne({ _id: objectId });

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    const isOwner = viewer?.id === lesson.creatorId;
    const isAdmin = viewer?.role === "admin";

    if (lesson.visibility !== "Public" && !isOwner && !isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const userMap = await getCreatorMap([lesson.creatorId]);
    const creatorLessonsCount = await lessonsCol.countDocuments({
      creatorId: lesson.creatorId,
      visibility: "Public",
    });

    const serialized = serializeLesson(
      { ...lesson, creatorId: lesson.creatorId },
      userMap,
      viewer,
    );

    return NextResponse.json({
      lesson: serialized,
      creatorLessonsCount,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
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

    if (lesson.creatorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const updates = { updatedAt: new Date() };

    if (body.title) updates.title = body.title.trim();
    if (body.description) updates.description = body.description.trim();
    if (body.category && CATEGORIES.includes(body.category)) updates.category = body.category;
    if (body.emotionalTone && TONES.includes(body.emotionalTone)) {
      updates.emotionalTone = body.emotionalTone;
    }
    if (body.visibility) updates.visibility = body.visibility;
    if (body.imageUrl !== undefined) updates.imageUrl = body.imageUrl;
    if (body.isFeatured !== undefined && user.role === "admin") {
      updates.isFeatured = Boolean(body.isFeatured);
    }
    if (body.isReviewed !== undefined && user.role === "admin") {
      updates.isReviewed = Boolean(body.isReviewed);
    }
    if (body.accessLevel) {
      updates.accessLevel =
        body.accessLevel === "Premium" && user.isPremium ? "Premium" : "Free";
    }

    await lessonsCol.updateOne({ _id: objectId }, { $set: updates });
    const updated = await lessonsCol.findOne({ _id: objectId });
    const userMap = await getCreatorMap([updated.creatorId]);

    return NextResponse.json({
      lesson: serializeLesson({ ...updated, creatorId: updated.creatorId }, userMap, user),
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
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

    if (lesson.creatorId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await lessonsCol.deleteOne({ _id: objectId });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
