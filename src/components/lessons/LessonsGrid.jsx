"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer } from "@/lib/animations";
import LessonCard from "./LessonCard";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";



export default function LessonsGrid({ lessons }) {
  const [savedIds, setSavedIds] = useState([]);
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");
  const LESSONS_LIST = lessons?.lessons || [];
  
  const { data: session } = authClient.useSession();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const [isNavigating, setIsNavigating] = useState(false);
  
  // Reset loading state when searchParams change (navigation completes)
  useEffect(() => {
    return () => {
      setIsNavigating(false);
    };
  }, [searchParams]);

  // Fetch initial favorites
  useEffect(() => {
    const fetchFavorites = async () => {
        if (!session?.user?.id) return;
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;
            if (!token) return;
            
            const res = await fetch(`/api/backend/users/${session.user.id}/favorites`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success && data.data) {
                setSavedIds(data.data.map(fav => fav.lessonId || fav.lessonDetails?._id));
            }
        } catch (err) {
            console.error("Failed to fetch favorites", err);
        }
    };
    fetchFavorites();
  }, [session]);

  const toggleBookmark = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session?.user?.id) return;

    // Optimistic UI update
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      await fetch(`/api/backend/favorites/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: session.user.id, lessonId: id })
      });
    } catch (err) {
      console.error("Failed to toggle bookmark", err);
      // Rollback on error
      setSavedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  return (
    <section className="w-full pb-24 pt-8 px-gutter bg-[#F6F0DD] text-[#1C1611]">
      <div ref={ref} className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mb-16 transition-opacity duration-200 ${isNavigating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
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

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center w-full gap-4"
        >
          <div className="flex items-center gap-4">
            
            {/* Prev Button */}
            <Link 
              href={`?page=${Math.max(1, currentPage - 1)}`}
              onClick={() => { if (currentPage > 1) setIsNavigating(true); }}
              className={`w-10 h-10 rounded-xl border-2 border-[#1C1611] flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 ${currentPage <= 1 || isNavigating ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <ChevronLeft className="w-5 h-5 stroke-[3px]" />
            </Link>

            {/* Dynamic Page Indicators */}
            <div className="w-28 h-10 flex items-center justify-center bg-white border-2 border-[#1C1611] rounded-xl shadow-[2px_2px_0px_0px_#1C1611]">
              {isNavigating ? (
                <div className="w-5 h-5 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
              ) : (
                <span className="font-black uppercase tracking-widest text-sm text-[#1C1611]">
                  Page {currentPage}
                </span>
              )}
            </div>

            {/* Next Button */}
            <Link 
              href={`?page=${currentPage + 1}`}
              onClick={() => { if (currentPage < (lessons?.pagination?.totalPages || 1)) setIsNavigating(true); }}
              className={`w-10 h-10 rounded-xl border-2 border-[#1C1611] flex items-center justify-center bg-white shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 ${currentPage >= (lessons?.pagination?.totalPages || 1) || isNavigating ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <ChevronRight className="w-5 h-5 stroke-[3px]" />
            </Link>
          </div>

          <p className="text-[11px] font-black tracking-widest text-[#1C1611]/60 uppercase select-none">
             Showing {lessons.pagination.length} of {lessons.pagination.totalPages} lessons
          </p>
        </motion.div>
      </div>
    </section>
  );
}