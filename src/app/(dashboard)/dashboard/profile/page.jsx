"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import LessonCard from "@/components/lessons/LessonCard";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const sessionUser = session?.user;
  const [name, setName] = useState(() => sessionUser?.name || "");
  const [photoURL, setPhotoURL] = useState(() => sessionUser?.image || sessionUser?.photoURL || "");
  const [publicLessons, setPublicLessons] = useState([]);
  const [stats, setStats] = useState({ lessons: 0, favorites: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [mineRes, favRes] = await Promise.all([
          fetch("/api/lessons?mine=true"),
          fetch("/api/favorites"),
        ]);
        const mine = await mineRes.json();
        const fav = await favRes.json();
        const lessons = mine.lessons || [];
        setStats({ lessons: lessons.length, favorites: fav.favorites?.length || 0 });
        setPublicLessons(
          lessons
            .filter((l) => l.visibility === "Public")
            .map((l) => ({
              id: l.id,
              title: l.title,
              description: l.description,
              imageUrl: l.imageUrl || "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500",
              tags: [l.category, l.emotionalTone],
              author: { name: session?.user?.name || "You", initials: "ME" },
              href: `/lessons/${l.id}`,
              isPremium: l.accessLevel === "Premium",
            })),
        );
      } finally {
        setLoading(false);
      }
    }
    if (session?.user) load();
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    toast.success("Profile updated locally. Redeploy auth plugin to persist custom fields.");
  };

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
          <h1 className="text-3xl font-black uppercase">Profile</h1>
        </header>

        <div className="bg-white border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611] flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-full border-[3px] border-[#1C1611] overflow-hidden relative shrink-0">
            <Image src={photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150"} alt="Profile" fill className="object-cover" />
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black uppercase">{session?.user?.name}</h2>
              {session?.user?.isPremium && (
                <span className="bg-[#FCD34D] border-2 border-[#1C1611] px-2 py-0.5 text-xs font-black uppercase rounded-full">
                  Premium ⭐
                </span>
              )}
            </div>
            <p className="text-sm font-bold mt-1">{session?.user?.email}</p>
            <p className="text-xs font-black uppercase mt-3">
              {stats.lessons} lessons • {stats.favorites} saved
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="bg-[#4DD0B1] border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611] grid gap-4 max-w-xl">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Display name" className="h-11 px-4 rounded-xl border-[2.5px] border-[#1C1611] font-bold" />
          <input value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL" className="h-11 px-4 rounded-xl border-[2.5px] border-[#1C1611] font-bold" />
          <button type="submit" className="h-11 bg-[#FF4A3A] text-white font-black uppercase rounded-xl border-[2.5px] border-[#1C1611]">
            Update Profile
          </button>
        </form>

        <section>
          <h3 className="text-xl font-black uppercase mb-6">Public Lessons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
