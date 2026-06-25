import Link from "next/link";
import { Edit2, Trash2, Heart, Bookmark } from "lucide-react";
import VisibilityToggle from "./VisibilityToggle";

const ICON_COLORS = ["bg-[#4DD0B1]", "bg-[#FCD34D]", "bg-[#FFB3A7]"];

export default function LessonsTable({ lessons = [], onDelete }) {
  if (lessons.length === 0) {
    return (
      <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] mb-8 p-12 text-center">
        <p className="text-sm font-black uppercase text-[#1C1611]/60">
          No lessons found. Start writing your first lesson!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] mb-8 overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="table w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b-[3.5px] border-[#1C1611] bg-[#FFB3A7]">
              {["Lesson Title", "Created", "Visibility", "Engagement", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-xs font-black uppercase p-5 text-left text-[#1C1611] tracking-wider border-r-[2px] border-[#1C1611] last:border-r-0"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-[#1C1611]">
            {lessons.map((row, idx) => {
              const lessonId = row._id || row.id;
              const isPublic = row.visibility === "Public";
              const createdDate = row.createdAt
                ? new Date(row.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "—";

              return (
                <tr
                  key={lessonId}
                  className="hover:bg-[#1C1611]/5 transition-colors duration-100 group bg-[#F6F0DD]"
                >
                  <td className="p-5 flex items-center gap-4 min-w-0 border-r-[2px] border-[#1C1611]">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black border-2 border-[#1C1611] shrink-0 shadow-[2px_2px_0px_0px_#1C1611] ${ICON_COLORS[idx % 3]} text-[#1C1611]`}
                    >
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
