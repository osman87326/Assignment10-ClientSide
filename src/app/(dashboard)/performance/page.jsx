import { BarChart3 } from "lucide-react";
import { PerformanceCards, StatsChart } from "@/components/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Performance & Insights",
  description: "Your engagement stats, rank, and public footprint.",
};

async function getStats(userId, headersList) {
  try {
    const tokenRes = await fetch('http://localhost:3000/api/auth/token', {
      headers: headersList,
      cache: 'no-store'
    });
    let token = "";
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      token = tokenData?.token || "";
    }
    if (!token) return null;

    const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/users/${userId}/stats`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error fetching stats:", err);
    return null;
  }
}

export default async function PerformancePage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/login");
  }

  const stats = await getStats(session.user.id, headersList);

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* Page Header */}
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] mb-1.5 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 stroke-[2.5px]" />
            Performance & Insights
          </h1>
          <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase">
            Your engagement stats, rank, and public footprint at a glance.
          </p>
        </header>

        {/* Stats Cards */}
        <main className="w-full min-w-0">
          <PerformanceCards stats={stats} />
          
          <StatsChart data={stats?.topLessons} />

          {/* Additional context section */}
          <div className="mt-8 bg-white border-[3px] border-[#1C1611] rounded-2xl p-8 shadow-[4px_4px_0px_0px_#1C1611]">
            <h2 className="text-lg font-black uppercase text-[#1C1611] mb-4">
              Ranking System
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { rank: "Novice", requirement: "Starting rank", color: "bg-[#F6F0DD]" },
                { rank: "Philosopher", requirement: "1,000+ total likes", color: "bg-[#FCD34D]" },
                { rank: "Stoic Master", requirement: "5,000+ total likes", color: "bg-[#4DD0B1]" },
              ].map((tier) => (
                <div
                  key={tier.rank}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 border-[#1C1611] ${tier.color} ${
                    stats?.rank === tier.rank ? "shadow-[3px_3px_0px_0px_#1C1611]" : ""
                  }`}
                >
                  <span className="text-sm font-black uppercase text-[#1C1611]">
                    {stats?.rank === tier.rank && "→ "}{tier.rank}
                  </span>
                  <span className="text-xs font-bold text-[#1C1611]/70 uppercase">
                    {tier.requirement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}