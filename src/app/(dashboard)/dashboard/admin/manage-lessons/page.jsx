"use client";

import { Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageLessonsPage() {
  const [lessons, setLessons] = useState([]);
  const [stats, setStats] = useState({ publicCount: 0, privateCount: 0 });
  const [loading, setLoading] = useState(true);

  const loadLessons = () => {
    fetch("/api/admin/lessons")
      .then((r) => r.json())
      .then((d) => {
        setLessons(d.lessons || []);
        setStats(d.stats || { publicCount: 0, privateCount: 0 });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLessons();
  }, []);

  const toggleFeatured = async (lessonId, isFeatured) => {
    const res = await fetch("/api/admin/lessons", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, isFeatured: !isFeatured }),
    });
    if (res.ok) {
      toast.success("Featured status updated");
      loadLessons();
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!confirm("Delete this lesson permanently?")) return;
    const res = await fetch(`/api/lessons/${lessonId}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Lesson deleted");
      loadLessons();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl font-black uppercase">Manage Lessons</h1>
          <p className="text-xs font-bold uppercase mt-1">
            Public: {stats.publicCount} • Private: {stats.privateCount}
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="border-[3px] border-[#1C1611] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#1C1611] overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-[#4DD0B1] border-b-[3px] border-[#1C1611]">
                  {["Title", "Author", "Visibility", "Featured", "Actions"].map((h) => (
                    <th key={h} className="p-4 text-left text-xs font-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="border-b-2 border-[#1C1611]/15">
                    <td className="p-4 font-black text-sm">{lesson.title}</td>
                    <td className="p-4 text-sm font-bold">{lesson.author}</td>
                    <td className="p-4 text-sm font-bold uppercase">{lesson.visibility}</td>
                    <td className="p-4">
                      <button onClick={() => toggleFeatured(lesson.id, lesson.isFeatured)}>
                        <Star className={`w-4 h-4 ${lesson.isFeatured ? "fill-[#FF4A3A] text-[#FF4A3A]" : ""}`} />
                      </button>
                    </td>
                    <td className="p-4">
                      <button onClick={() => deleteLesson(lesson.id)} className="hover:text-[#FF4A3A]">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
