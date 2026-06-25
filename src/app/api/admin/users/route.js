import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth-utils";
import { getUsersCollection, getLessonsCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    await requireAdminUser();
    const usersCol = await getUsersCollection();
    const lessonsCol = await getLessonsCollection();

    const users = await usersCol.find({}).sort({ createdAt: -1 }).limit(100).toArray();

    const usersWithCounts = await Promise.all(
      users.map(async (user) => {
        const lessonCount = await lessonsCol.countDocuments({ creatorId: user.id });
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role || "user",
          lessonCount,
          isPremium: Boolean(user.isPremium),
        };
      }),
    );

    return NextResponse.json({ users: usersWithCounts });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    await requireAdminUser();
    const { userId, role } = await request.json();

    if (!userId || !["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const usersCol = await getUsersCollection();
    await usersCol.updateOne({ id: userId }, { $set: { role } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
