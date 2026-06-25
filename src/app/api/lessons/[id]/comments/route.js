import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth-utils";
import { getCommentsCollection, getUsersCollection, toObjectId } from "@/lib/mongodb";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const commentsCol = await getCommentsCollection();
    const comments = await commentsCol
      .find({ lessonId: id })
      .sort({ createdAt: -1 })
      .toArray();

    const userIds = comments.map((c) => c.userId);
    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: userIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    return NextResponse.json({
      comments: comments.map((c) => ({
        id: c._id.toString(),
        text: c.text,
        createdAt: c.createdAt,
        user: {
          name: userMap[c.userId]?.name || "User",
          photoURL: userMap[c.userId]?.image || userMap[c.userId]?.photoURL || "",
        },
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { text } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: "Comment text required" }, { status: 400 });
    }

    const commentsCol = await getCommentsCollection();
    const doc = {
      lessonId: id,
      userId: user.id,
      text: text.trim(),
      createdAt: new Date(),
    };

    const result = await commentsCol.insertOne(doc);

    return NextResponse.json(
      {
        comment: {
          id: result.insertedId.toString(),
          text: doc.text,
          createdAt: doc.createdAt,
          user: {
            name: user.name,
            photoURL: user.image || user.photoURL || "",
          },
        },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
