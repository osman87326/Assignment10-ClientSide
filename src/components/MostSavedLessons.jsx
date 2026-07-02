"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const SAVED_LESSONS = [
  { id: 1, title: "Navigating Middle-Management Burnout", description: "Strategies for maintaining your passion when you're caught between two worlds.", author: "@david_ross", authorHref: "/user/david_ross", date: "Nov 14, 2024", saveCount: "1.2k", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", href: "/lessons/middle-management-burnout" },
  { id: 2, title: "The Power of the 'No' Framework",     description: "How to decline opportunities without burning bridges or losing respect.",           author: "@clara_m",   authorHref: "/user/clara_m",   date: "Nov 12, 2024", saveCount: "940",   imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop", href: "/lessons/no-framework"               },
  { id: 3, title: "Time as a Non-Renewable Asset",       description: "Revisiting the concept of 'leisure' in an era of hyper-productivity.",              author: "@prof_henry",authorHref: "/user/prof_henry",date: "Nov 10, 2024", saveCount: "821",   imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=600&auto=format&fit=crop", href: "/lessons/time-non-renewable-asset"   },
];

export default function MostSavedLessons() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 w-full bg-[#0d0d0d] text-[#e8e4d9]">
      <div ref={ref} className="px-6 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-16 border-b-[2.5px] border-[#1e1e1e] pb-6"
        >
          <div className="p-3 bg-[#ffd16622] border-[2px] border-[#2a2a2a] rounded-xl shadow-[3px_3px_0px_0px_#0a0a0a] flex items-center justify-center">
            <Star className="w-5 h-5 fill-[#ffd166] stroke-[#ffd166]" />
          </div>
          <h2 className="font-black text-3xl sm:text-4xl uppercase tracking-tight">most saved this week</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {SAVED_LESSONS.map((lesson) => (
            <motion.article
              key={lesson.id}
              variants={fadeInUp}
              className="flex flex-col group bg-[#111] border-[2.5px] border-[#2a2a2a] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#0a0a0a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#0a0a0a] transition-all duration-150"
            >
              <div className="aspect-video relative overflow-hidden w-full border-b-[2px] border-[#1e1e1e]">
                <Image src={lesson.imageUrl} alt={lesson.title} fill sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale group-hover:grayscale-0"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#0d0d0d] border-[2px] border-[#2a2a2a] rounded-full flex items-center gap-1.5 z-10">
                  <Bookmark className="w-3 h-3 fill-[#c8ff6b] stroke-[#c8ff6b]" />
                  <span className="text-[10px] font-black text-[#c8ff6b]">{lesson.saveCount}</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h4 className="font-black text-lg mb-3 text-[#e8e4d9] group-hover:text-[#c8ff6b] transition-colors line-clamp-2">
                  <Link href={lesson.href}>{lesson.title}</Link>
                </h4>
                <p className="text-[#555] text-sm font-medium mb-5 leading-relaxed flex-grow line-clamp-3">{lesson.description}</p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1e1e1e]">
                  <Link href={lesson.authorHref} className="text-[#c8ff6b] font-black text-xs uppercase hover:underline">{lesson.author}</Link>
                  <span className="text-xs font-bold uppercase text-[#333]">{lesson.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}