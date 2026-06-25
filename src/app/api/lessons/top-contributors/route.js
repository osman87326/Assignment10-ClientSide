import { NextResponse } from "next/server";
import { getLessonsCollection, getUsersCollection } from "@/lib/mongodb";

export async function GET() {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const lessonsCol = await getLessonsCollection();
    const pipeline = [
      { $match: { createdAt: { $gte: oneWeekAgo } } },
      { $group: { _id: "$creatorId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ];

    const top = await lessonsCol.aggregate(pipeline).toArray();
    const creatorIds = top.map((t) => t._id).filter(Boolean);

    const usersCol = await getUsersCollection();
    const users = await usersCol.find({ id: { $in: creatorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    const contributors = top.map((entry, index) => {
      const user = userMap[entry._id] || {};
      const bgClasses = ["bg-[#4DD0B1]", "bg-[#FFB3A7]", "bg-[#FCD34D]", "bg-[#F6F0DD]"];
      return {
        id: entry._id,
        name: user.name || "Contributor",
        lessonsCount: entry.count,
        verified: user.isPremium || false,
        memberSince: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })
          : "2024",
        avatarUrl:
          user.image ||
          user.photoURL ||
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        profileHref: `/dashboard/profile?user=${entry._id}`,
        bgClass: bgClasses[index % bgClasses.length],
      };
    });

    return NextResponse.json({ contributors });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
