"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { staggerContainer } from "@/lib/animations";
import LessonCard from "./LessonCard";

export default function LessonsGrid({ lessons }) {
  const [savedIds, setSavedIds] = useState([]);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const LESSONS_LIST = lessons?.lessons || lessons?.data || [];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const totalPages = lessons?.pagination?.totalPages || 1;
  const totalCount = lessons?.pagination?.total || LESSONS_LIST.length;

  return (
    <section className="w-full pb-24 pt-8 px-gutter bg-[#F6F0DD] text-[#1C1611]">
      <div ref={ref} className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16"
        >
          {LESSONS_LIST.map((lesson) => (
            <LessonCard
              key={lesson._id || lesson.id}
              lesson={lesson}
              isSaved={savedIds.includes(lesson._id || lesson.id)}
              onToggleSave={toggleBookmark}
            />
          ))}
        </motion.div>

        {LESSONS_LIST.length === 0 && (
          <p className="text-center font-black uppercase text-[#1C1611]/60 mb-12">
            No lessons match your filters.
          </p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2">
            <Link
              href={`?page=${Math.max(1, currentPage - 1)}`}
              className={`w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611] hover:bg-[#FFB3A7] transition-all ${currentPage <= 1 ? "opacity-40 pointer-events-none" : ""}`}
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
            </Link>

            <span className="font-black text-xs uppercase">
              Page {currentPage} of {totalPages}
            </span>

            <Link
              href={`?page=${currentPage + 1}`}
              className={`w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611] hover:bg-[#FFB3A7] transition-all ${currentPage >= totalPages ? "opacity-40 pointer-events-none" : ""}`}
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
            </Link>
          </div>

          <p className="text-[11px] font-black tracking-widest text-[#1C1611]/60 uppercase select-none">
            Showing {LESSONS_LIST.length} of {totalCount} lessons
          </p>
        </motion.div>
      </div>
    </section>
  );
}
