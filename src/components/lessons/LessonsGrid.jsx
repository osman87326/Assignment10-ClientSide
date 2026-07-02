"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer } from "@/lib/animations";
import LessonCard from "./LessonCard";

export default function LessonsGrid({ lessons, totalPages = 1, currentPage: initialPage = 1 }) {
  const [savedIds, setSavedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const lessonList = Array.isArray(lessons?.data) ? lessons.data
    : Array.isArray(lessons) ? lessons
    : [];

  const pages = lessons?.totalPages ?? totalPages;
  const total = lessons?.total ?? lessonList.length;

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  if (lessonList.length === 0) {
    return (
      <section className="w-full pb-24 pt-8 px-gutter bg-[#F6F0DD] text-[#1C1611]">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[300px] gap-4">
          <BookOpen className="w-12 h-12 stroke-[#1C1611]/30" />
          <h3 className="font-black text-[#1C1611]/60 uppercase text-center">No Lessons Found</h3>
          <p className="text-xs font-bold text-[#1C1611]/40 uppercase text-center">
            Try adjusting your filters or check back later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full pb-24 pt-8 px-gutter bg-[#F6F0DD] text-[#1C1611]">
      <div ref={ref} className="max-w-7xl mx-auto w-full relative z-10">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16"
        >
          <AnimatePresence mode="popLayout">
            {lessonList.map((lesson) => {
              const id = lesson._id || lesson.id;
              return (
                <motion.div key={id} layout exit={{ opacity: 0, scale: 0.9 }}>
                  <LessonCard lesson={lesson} isSaved={savedIds.includes(id)} onToggleSave={toggleBookmark} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {pages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center w-full gap-4"
          >
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611] disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
              </motion.button>

              {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-black flex items-center justify-center border-2 border-[#1C1611] ${
                    currentPage === page
                      ? "bg-[#FF4A3A] text-white shadow-[2px_2px_0px_0px_#1C1611]"
                      : "bg-white text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]"
                  }`}
                >
                  {page}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentPage((p) => Math.min(pages, p + 1))}
                disabled={currentPage === pages}
                className="w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611] disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
              </motion.button>
            </div>

            <p className="text-[11px] font-black tracking-widest text-[#1C1611]/60 uppercase select-none">
              Showing {lessonList.length} of {total} lessons
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
