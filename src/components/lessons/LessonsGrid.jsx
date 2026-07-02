"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer } from "@/lib/animations";
import LessonCard from "./LessonCard";

// ...keep LESSONS_LIST as-is...

export default function LessonsGrid() {
  const [savedIds, setSavedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

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
            {LESSONS_LIST.map((lesson) => (
              <motion.div key={lesson.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                <LessonCard lesson={lesson} isSaved={savedIds.includes(lesson.id)} onToggleSave={toggleBookmark} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
              className="w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611]"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5px]" />
            </motion.button>

            {[1, 2, 3, "...", 12].map((page, index) => (
              <motion.button
                key={index}
                whileHover={page !== "..." ? { scale: 1.1 } : {}}
                whileTap={page !== "..." ? { scale: 0.9 } : {}}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                className={`w-9 h-9 rounded-xl text-xs font-black flex items-center justify-center border-2 border-[#1C1611] ${
                  page === "..." ? "border-transparent bg-transparent text-[#1C1611]/40" :
                  currentPage === page ? "bg-[#FF4A3A] text-white shadow-[2px_2px_0px_0px_#1C1611]" :
                  "bg-white text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]"
                }`}
                disabled={page === "..."}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
              className="w-9 h-9 rounded-xl border-2 border-[#1C1611] bg-white text-[#1C1611] font-black flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611]"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5px]" />
            </motion.button>
          </div>

          <p className="text-[11px] font-black tracking-widest text-[#1C1611]/60 uppercase select-none">
            Showing 6 of 72 lessons
          </p>
        </motion.div>
      </div>
    </section>
  );
}