"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import OverviewMetrics from "@/components/Panels/admin/OverviewMetrics";
import PlatformHealthChart from "@/components/Panels/admin/PlatformHealthChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .catch(() => {});
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6 flex justify-between items-start gap-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/50">
              Admin Control Center
            </span>
            <h1 className="text-3xl font-black uppercase tracking-tight mt-1">
              Command Center
            </h1>
          </div>
          <Link
            href="/dashboard/admin/manage-lessons"
            className="bg-[#FF4A3A] text-white font-black uppercase text-xs px-4 py-2 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]"
          >
            Manage Lessons
          </Link>
        </header>

        {stats && (
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: stats.totalUsers },
              { label: "Public Lessons", value: stats.totalPublicLessons },
              { label: "Reported Lessons", value: stats.totalReports },
              { label: "Today's Lessons", value: stats.todayLessons },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#FCD34D] border-[3px] border-[#1C1611] rounded-2xl p-5 shadow-[4px_4px_0px_0px_#1C1611]"
              >
                <p className="text-[10px] font-black uppercase">{item.label}</p>
                <p className="text-3xl font-black mt-2">{item.value}</p>
              </div>
            ))}
          </section>
        )}

        <OverviewMetrics />
        <PlatformHealthChart />
      </div>
    </div>
  );
}
