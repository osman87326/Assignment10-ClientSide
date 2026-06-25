"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const SAVED_LESSONS = [
  {
    id: 1,
    title: "Navigating Middle-Management Burnout",
    description:
      "Strategies for maintaining your passion when you're caught between two worlds.",
    author: "@david_ross",
    authorHref: "/user/david_ross",
    date: "Nov 14, 2024",
    saveCount: "1.2k",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    href: "/lessons/middle-management-burnout",
  },
  {
    id: 2,
    title: "The Power of the 'No' Framework",
    description:
      "How to decline opportunities without burning bridges or losing respect.",
    author: "@clara_m",
    authorHref: "/user/clara_m",
    date: "Nov 12, 2024",
    saveCount: "940",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    href: "/lessons/no-framework",
  },
  {
    id: 3,
    title: "Time as a Non-Renewable Asset",
    description:
      "Revisiting the concept of 'leisure' in an era of hyper-productivity.",
    author: "@prof_henry",
    authorHref: "/user/prof_henry",
    date: "Nov 10, 2024",
    saveCount: "821",
    imageUrl:
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop",
    href: "/lessons/time-non-renewable-asset",
  },
];

export default function MostSavedLessons({ lessons = [] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const displayLessons = lessons.length > 0 ? lessons.slice(0, 3).map((lesson) => {
    return {
      id: lesson._id,
      title: lesson.title,
      description: lesson.description ? lesson.description.substring(0, 100) + "..." : "No description available.",
      author: lesson.authorName || "Anonymous",
      authorHref: `/user/${lesson.creatorId}`,
      date: new Date(lesson.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      saveCount: lesson.savedCount || 0,
      imageUrl: lesson.imageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
      href: `/lessons/${lesson._id}`,
    };
  }) : SAVED_LESSONS;

  return (
    <section className="py-20 relative w-full bg-[#F6F0DD] text-[#1C1611]">
      <div ref={ref} className="px-gutter max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Block with Title Icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16 border-b-[3.5px] border-[#1C1611] pb-6"
        >
          <div className="p-3 bg-[#FCD34D] border-[3px] border-[#1C1611] rounded-xl shadow-[3px_3px_0px_0px_#1C1611] text-[#1C1611] flex items-center justify-center">
            <Star className="w-6 h-6 fill-[#1C1611] stroke-[#1C1611] stroke-[2px]" />
          </div>
          <h2 className="font-black text-3xl sm:text-4xl uppercase tracking-tight text-[#1C1611]">
            most saved this week
          </h2>
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full"
        >
          {displayLessons.map((lesson) => (
            <motion.article
              key={lesson.id}
              variants={fadeInUp}
              className="flex flex-col group w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#1C1611] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1C1611] transition-all duration-150"
            >
              {/* Image Frame Container with Floating Counter */}
              <div className="aspect-video relative overflow-hidden w-full border-b-[3.5px] border-[#1C1611]">
                <Image
                  src={lesson.imageUrl}
                  alt={lesson.title}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
                  loading="lazy"
                />

                {/* Save Count Overlay Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#FCD34D] border-[2px] border-[#1C1611] rounded-full shadow-[2px_2px_0px_0px_#1C1611] flex items-center gap-1.5 z-10 text-[#1C1611]">
                  <Bookmark className="w-3.5 h-3.5 fill-[#1C1611] stroke-[#1C1611] stroke-[2px]" />
                  <span className="text-xs font-black">
                    {lesson.saveCount}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Title Header */}
                <h4 className="font-black text-xl mb-3 text-[#1C1611] group-hover:text-[#FF4A3A] transition-colors duration-150 line-clamp-2">
                  <Link href={lesson.href}>{lesson.title}</Link>
                </h4>

                {/* Sub-description Blurb */}
                <p className="text-[#1C1611]/80 text-sm font-medium mb-6 leading-relaxed flex-grow line-clamp-3">
                  {lesson.description}
                </p>

                {/* Action and Timeline Metadata Footer */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1C1611]/15">
                  <Link
                    href={lesson.authorHref}
                    className="text-[#FF4A3A] font-black text-xs uppercase hover:underline transition-all"
                  >
                    {lesson.author}
                  </Link>
                  <span className="text-xs font-black uppercase text-[#1C1611]/70">
                    {lesson.date}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}