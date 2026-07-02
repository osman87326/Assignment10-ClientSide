"use client";

import Link from "next/link";
import Image from "next/image";
import { Bookmark } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import PremiumOverlay from "./PremiumOverlay";

export default function LessonCard({ lesson, isSaved = false, onToggleSave }) {
  return (
    <motion.article
      variants={fadeInUp}
      className="relative rounded-2xl flex flex-col justify-between overflow-hidden group min-h-[440px] bg-[#111] border-[2.5px] border-[#2a2a2a] shadow-[5px_5px_0px_0px_#0a0a0a] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[3.5px_3.5px_0px_0px_#0a0a0a] transition-all duration-150"
    >
      <div>
        <div className="relative w-full aspect-[16/9] overflow-hidden border-b-[2px] border-[#1e1e1e]">
          <Image
            src={lesson.imageUrl} alt={lesson.title} fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center grayscale ${lesson.isPremium ? "blur-[6px] opacity-30 scale-105" : "transition-transform duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"}`}
            loading="lazy"
          />
        </div>

        <div className="p-5 relative text-[#e8e4d9]">
          <div className="flex flex-wrap gap-2 mb-3">
            {lesson.tags.map((tag, idx) => (
              <span key={idx}
                className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded border-[1.5px] border-[#2a2a2a] ${
                  idx === 0 ? "bg-[#c8ff6b22] text-[#c8ff6b]" : "bg-[#ffd16622] text-[#ffd166]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-black text-lg mb-3 text-[#e8e4d9] group-hover:text-[#c8ff6b] transition-colors duration-150 line-clamp-2">
            <Link href={lesson.href}>{lesson.title}</Link>
          </h3>

          <p className="text-sm text-[#555] font-medium leading-relaxed line-clamp-3">{lesson.description}</p>
        </div>
      </div>

      <div className="p-5 pt-0 flex justify-between items-center border-t border-[#1e1e1e]">
        <div className="flex items-center gap-2.5 mt-3">
          <div className="w-7 h-7 rounded-full bg-[#c8ff6b22] text-[#c8ff6b] border-[1.5px] border-[#2a2a2a] text-xs font-black flex items-center justify-center">
            {lesson.author.initials}
          </div>
          <span className="text-xs font-black uppercase text-[#555]">{lesson.author.name}</span>
        </div>

        {!lesson.isPremium && onToggleSave && (
          <button
            onClick={(e) => onToggleSave(lesson.id, e)}
            className="mt-3 w-8 h-8 rounded-lg border-[2px] border-[#2a2a2a] bg-[#161616] flex items-center justify-center text-[#666] shadow-[2px_2px_0px_0px_#0a0a0a] hover:border-[#c8ff6b] hover:text-[#c8ff6b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all duration-100"
            aria-label="Save lesson"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-[#c8ff6b] stroke-[#c8ff6b]" : "stroke-[2px]"}`} />
          </button>
        )}
      </div>

      {lesson.isPremium && <PremiumOverlay />}
    </motion.article>
  );
}