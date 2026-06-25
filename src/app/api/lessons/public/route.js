import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-utils";
import { getLessonsCollection, getUsersCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const viewer = await getSessionUser();
    const { searchParams } = new URL(request.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(12, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category") || "";
    const tone = searchParams.get("tone") || "";
    const sort = searchParams.get("sort") || "newest";

    const filter = { visibility: "Public" };

    if (category && category !== "All Categories") {
      filter.category = category;
    }
    if (tone && tone !== "Any Tone") {
      filter.emotionalTone = tone;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortMap = {
      newest: { createdAt: -1 },
      saved: { favoritesCount: -1 },
    };

    const lessonsCol = await getLessonsCollection();
    const total = await lessonsCol.countDocuments(filter);
    const lessons = await lessonsCol
      .find(filter)
      .sort(sortMap[sort] || sortMap.newest)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const creatorIds = lessons.map((l) => l.creatorId);
    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: creatorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const data = lessons.map((lesson) => {
      const creator = userMap[lesson.creatorId] || {};
      const isPremiumLocked =
        lesson.accessLevel === "Premium" &&
        !viewer?.isPremium &&
        lesson.creatorId !== viewer?.id;

      return {
        id: lesson._id.toString(),
        title: lesson.title,
        description: lesson.description,
        category: lesson.category,
        emotionalTone: lesson.emotionalTone,
        accessLevel: lesson.accessLevel,
        imageUrl:
          lesson.imageUrl ||
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500&auto=format&fit=crop",
        tags: [lesson.category?.toUpperCase(), lesson.emotionalTone?.toUpperCase()].filter(Boolean),
        author: {
          name: creator.name || "Anonymous",
          initials: (creator.name || "A")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
          photoURL: creator.image || creator.photoURL || "",
        },
        href: `/lessons/${lesson._id.toString()}`,
        isPremium: isPremiumLocked,
        favoritesCount: lesson.favoritesCount || 0,
        createdAt: lesson.createdAt,
      };
    });

    return NextResponse.json({
      lessons: data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
