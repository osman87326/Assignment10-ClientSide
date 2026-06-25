"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ReportedLessonsPage() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReports = () => {
    fetch("/api/admin/reports")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleAction = async (lessonId, action) => {
    const res = await fetch("/api/admin/reports", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, action }),
    });
    if (res.ok) {
      toast.success(action === "delete" ? "Lesson deleted" : "Reports ignored");
      setSelected(null);
      loadReports();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl font-black uppercase">Reported Lessons</h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border-[3px] border-[#1C1611] rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_#1C1611]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#FFB3A7] border-b-[3px] border-[#1C1611]">
                    <th className="p-4 text-left text-xs font-black uppercase">Title</th>
                    <th className="p-4 text-left text-xs font-black uppercase">Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr
                      key={item.lessonId}
                      className="border-b border-[#1C1611]/15 cursor-pointer hover:bg-[#1C1611]/5"
                      onClick={() => setSelected(item)}
                    >
                      <td className="p-4 font-black text-sm">{item.title}</td>
                      <td className="p-4 font-bold">{item.reportCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[4px_4px_0px_0px_#1C1611] bg-white">
              {selected ? (
                <>
                  <h3 className="font-black uppercase mb-4">{selected.title}</h3>
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                    {selected.reports.map((r, i) => (
                      <div key={i} className="text-xs border-b border-[#1C1611]/10 pb-2">
                        <p className="font-black">{r.reason}</p>
                        <p className="text-[#1C1611]/60">{r.reporter}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAction(selected.lessonId, "delete")}
                      className="h-10 bg-[#FF4A3A] text-white font-black uppercase text-xs rounded-xl border-2 border-[#1C1611]"
                    >
                      Delete Lesson
                    </button>
                    <button
                      onClick={() => handleAction(selected.lessonId, "ignore")}
                      className="h-10 bg-[#FCD34D] font-black uppercase text-xs rounded-xl border-2 border-[#1C1611]"
                    >
                      Ignore Reports
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-sm font-bold text-[#1C1611]/60">Select a reported lesson to review details.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
