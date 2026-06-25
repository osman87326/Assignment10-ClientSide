"use client";

import Link from "next/link";
import { BookOpen, Heart, Plus, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardHomePage() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [mineRes, favRes] = await Promise.all([
          fetch("/api/lessons?mine=true"),
          fetch("/api/favorites"),
        ]);
        const mineData = await mineRes.json();
        const favData = await favRes.json();
        setStats({
          lessons: mineData.lessons?.length || 0,
          favorites: favData.favorites?.length || 0,
        });
        setRecent((mineData.lessons || []).slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm font-bold uppercase text-[#1C1611]/70 mt-1">
            Your reflection hub and weekly progress snapshot.
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { label: "Lessons Created", value: stats?.lessons || 0, icon: BookOpen, bg: "bg-[#4DD0B1]" },
            { label: "Saved Favorites", value: stats?.favorites || 0, icon: Heart, bg: "bg-[#FFB3A7]" },
            { label: "Weekly Reflections", value: Math.min(stats?.lessons || 0, 7), icon: BarChart3, bg: "bg-[#FCD34D]" },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`${card.bg} border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611]`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase">{card.label}</span>
                  <Icon className="w-4 h-4 stroke-[2.5px]" />
                </div>
                <p className="text-3xl font-black">{card.value}</p>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611]">
            <h2 className="font-black uppercase mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link href="/dashboard/add-lesson" className="inline-flex items-center gap-2 bg-[#FF4A3A] text-white font-black uppercase text-sm px-5 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]">
                <Plus className="w-4 h-4" /> Add New Lesson
              </Link>
              <Link href="/dashboard/my-lessons" className="inline-flex items-center gap-2 bg-[#FCD34D] font-black uppercase text-sm px-5 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]">
                <BookOpen className="w-4 h-4" /> My Lessons
              </Link>
              <Link href="/dashboard/my-favorites" className="inline-flex items-center gap-2 bg-[#4DD0B1] font-black uppercase text-sm px-5 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]">
                <Heart className="w-4 h-4" /> My Favorites
              </Link>
            </div>
          </div>

          <div className="bg-white border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611]">
            <h2 className="font-black uppercase mb-4">Recently Added</h2>
            {recent.length === 0 ? (
              <p className="text-sm font-bold text-[#1C1611]/70">No lessons yet. Start your first reflection.</p>
            ) : (
              <ul className="space-y-3">
                {recent.map((lesson) => (
                  <li key={lesson.id} className="border-b border-[#1C1611]/15 pb-2">
                    <Link href={`/lessons/${lesson.id}`} className="font-black text-sm uppercase hover:text-[#FF4A3A]">
                      {lesson.title}
                    </Link>
                    <p className="text-[10px] font-bold uppercase text-[#1C1611]/60 mt-1">
                      {lesson.category} • {lesson.visibility}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
