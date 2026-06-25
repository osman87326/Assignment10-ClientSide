import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth-utils";
import {
  getLessonsCollection,
  getReportsCollection,
  getUsersCollection,
} from "@/lib/mongodb";

export async function GET() {
  try {
    await requireAdminUser();

    const lessonsCol = await getLessonsCollection();
    const usersCol = await getUsersCollection();
    const reportsCol = await getReportsCollection();

    const [totalUsers, totalPublicLessons, totalReports, todayLessons] =
      await Promise.all([
        usersCol.countDocuments({}),
        lessonsCol.countDocuments({ visibility: "Public" }),
        reportsCol.countDocuments({}),
        lessonsCol.countDocuments({
          createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
        }),
      ]);

    const topContributors = await lessonsCol
      .aggregate([
        { $group: { _id: "$creatorId", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    const contributorIds = topContributors.map((c) => c._id);
    const users = await usersCol.find({ id: { $in: contributorIds } }).toArray();
    const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

    return NextResponse.json({
      stats: {
        totalUsers,
        totalPublicLessons,
        totalReports,
        todayLessons,
        topContributors: topContributors.map((c) => ({
          name: userMap[c._id]?.name || "User",
          count: c.count,
        })),
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
