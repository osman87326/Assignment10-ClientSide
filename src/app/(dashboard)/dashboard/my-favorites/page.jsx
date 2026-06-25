"use client";

import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyFavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All Categories");
  const [tone, setTone] = useState("Any Tone");

  useEffect(() => {
    let isActive = true;

    const loadFavorites = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (category !== "All Categories") params.set("category", category);
        if (tone !== "Any Tone") params.set("tone", tone);
        const res = await fetch(`/api/favorites?${params}`);
        const data = await res.json();
        if (isActive) {
          setFavorites(data.favorites || []);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isActive = false;
    };
  }, [category, tone]);

  const removeFavorite = async (lessonId) => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId }),
    });
    if (res.ok) {
      toast.success("Removed from favorites");
      const params = new URLSearchParams();
      if (category !== "All Categories") params.set("category", category);
      if (tone !== "Any Tone") params.set("tone", tone);
      const refreshRes = await fetch(`/api/favorites?${params}`);
      const data = await refreshRes.json();
      setFavorites(data.favorites || []);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl font-black uppercase">My Favorites</h1>
          <p className="text-xs font-bold uppercase text-[#1C1611]/70 mt-1">
            Lessons you saved for future reflection.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 px-4 text-xs font-black uppercase rounded-xl border-[2.5px] border-[#1C1611]"
          >
            <option>All Categories</option>
            <option>Personal Growth</option>
            <option>Career</option>
            <option>Relationships</option>
            <option>Mindset</option>
            <option>Mistakes Learned</option>
          </select>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="h-10 px-4 text-xs font-black uppercase rounded-xl border-[2.5px] border-[#1C1611]"
          >
            <option>Any Tone</option>
            <option>Motivational</option>
            <option>Sad</option>
            <option>Realization</option>
            <option>Gratitude</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] overflow-hidden">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-[3px] border-[#1C1611] bg-[#FFB3A7]">
                  {["Title", "Category", "Tone", "Author", "Actions"].map((h) => (
                    <th key={h} className="p-4 text-left text-xs font-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => (
                  <tr key={item.id} className="border-b-2 border-[#1C1611]/20">
                    <td className="p-4 font-black text-sm uppercase">{item.title}</td>
                    <td className="p-4 text-sm font-bold">{item.category}</td>
                    <td className="p-4 text-sm font-bold">{item.emotionalTone}</td>
                    <td className="p-4 text-sm font-bold">{item.creatorName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Link href={item.href} className="hover:text-[#FF4A3A]">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button onClick={() => removeFavorite(item.id)} className="hover:text-[#FF4A3A]">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {favorites.length === 0 && (
              <p className="p-8 text-center text-sm font-bold uppercase text-[#1C1611]/60">
                No favorites saved yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
