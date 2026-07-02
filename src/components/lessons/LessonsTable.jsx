"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Edit2, Trash2, Heart, Bookmark } from "lucide-react";
import VisibilityToggle from "./VisibilityToggle";

export default function LessonsTable({ lessons = [], onDelete }) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const filter = searchParams.get("filter") || "All Lessons";
  const sort = searchParams.get("sort") || "Newest First";

  let filteredLessons = [...lessons];

  // Apply search and filter
  filteredLessons = filteredLessons.filter(row => {
    // Search
    if (search && !row.title?.toLowerCase().includes(search) && !row.category?.toLowerCase().includes(search)) {
      return false;
    }
    // Filter
    if (filter === "Public Only" && row.visibility !== "Public") return false;
    if (filter === "Private Only" && row.visibility === "Public") return false;
    return true;
  });

  // Apply Sort
  filteredLessons.sort((a, b) => {
    if (sort === "Newest First") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sort === "Oldest First") return new Date(a.createdAt) - new Date(b.createdAt);
    if (sort === "Most Liked") return (b.likesCount || 0) - (a.likesCount || 0);
    if (sort === "Most Saved") return (b.savesCount || 0) - (a.savesCount || 0);
    return 0;
  });

  if (filteredLessons.length === 0) {
    return (
      <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] mb-8 p-12 text-center">
        <p className="text-sm font-black uppercase text-[#1C1611]/60">
          No lessons found. Start writing your first lesson!
        </p>
      </div>
    );
  }

  const ICON_COLORS = ["bg-[#4DD0B1]", "bg-[#FCD34D]", "bg-[#FFB3A7]"];

  return (
    <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] mb-8 overflow-hidden">
      {/* Responsive scroll boundary shell */}
      <div className="w-full overflow-x-auto min-w-0">
        <table className="table w-full border-collapse min-w-[700px] lg:min-w-0">
          <thead>
            <tr className="border-b-[3.5px] border-[#1C1611] bg-[#FFB3A7]">
              <th className="text-xs font-black uppercase text-[#1C1611] p-5 text-left w-[40%] border-r-[2px] border-[#1C1611]">
                Lesson Title
              </th>
              <th className="text-xs font-black uppercase text-[#1C1611] p-5 text-left w-[15%] border-r-[2px] border-[#1C1611]">
                Created
              </th>
              <th className="text-xs font-black uppercase text-[#1C1611] p-5 text-left w-[15%] border-r-[2px] border-[#1C1611]">
                Visibility
              </th>
              <th className="text-xs font-black uppercase text-[#1C1611] p-5 text-left w-[15%] border-r-[2px] border-[#1C1611]">
                Engagement
              </th>
              <th className="text-xs font-black uppercase text-[#1C1611] p-5 text-center w-[15%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[#1C1611]">
            {filteredLessons.map((row, idx) => {
              const lessonId = row._id || row.id;
              const isPublic = row.visibility === "Public";
              const createdDate = row.createdAt
                ? new Date(row.createdAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
                : "—";

              return (
                <tr key={lessonId} className="hover:bg-[#1C1611]/5 transition-colors duration-100 group bg-[#F6F0DD]">
                  <td className="p-5 flex items-center gap-4 min-w-0 border-r-[2px] border-[#1C1611]">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black border-2 border-[#1C1611] shrink-0 shadow-[2px_2px_0px_0px_#1C1611] ${ICON_COLORS[idx % 3]} text-[#1C1611]`}>
                      {row.title?.charAt(0) || "?"}
                    </div>
                    <div className="min-w-0 truncate">
                      <h4 className="text-sm font-black text-[#1C1611] tracking-tight truncate group-hover:text-[#FF4A3A] transition-colors uppercase">
                        <Link href={`/lessons/${lessonId}`}>{row.title}</Link>
                      </h4>
                      <p className="text-[10px] font-black uppercase text-[#1C1611]/65 mt-0.5 truncate">
                        {row.category || "Uncategorized"}
                      </p>
                    </div>
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1C1611] whitespace-nowrap border-r-[2px] border-[#1C1611]">
                    {createdDate}
                  </td>

                  <td className="p-5 whitespace-nowrap border-r-[2px] border-[#1C1611]">
                    <VisibilityToggle lessonId={lessonId} initialStatus={isPublic} />
                  </td>

                  <td className="p-5 whitespace-nowrap border-r-[2px] border-[#1C1611]">
                    <div className="flex items-center gap-4 text-xs font-black text-[#1C1611]/80">
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 stroke-[2.5px]" /> {row.likesCount || 0}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Bookmark className="w-4 h-4 stroke-[2.5px]" /> {row.savesCount || 0}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-4 text-[#1C1611]">
                      <Link
                        href={`/add-lesson?id=${lessonId}`}
                        className="hover:text-[#FF4A3A] transition-colors cursor-pointer hover:scale-110 active:scale-95 duration-100"
                        aria-label={`Edit lesson: ${row.title}`}
                      >
                        <Edit2 className="w-4 h-4 stroke-[2.5px]" />
                      </Link>
                      {onDelete && (
                        <button 
                          onClick={() => onDelete(lessonId)}
                          className="hover:text-[#FF4A3A] transition-colors cursor-pointer hover:scale-110 active:scale-95 duration-100" 
                          aria-label={`Delete lesson: ${row.title}`}
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5px]" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}