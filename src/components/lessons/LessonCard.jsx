"use client";

import Link from "next/link";
import Image from "next/image";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import PremiumOverlay from "./PremiumOverlay";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function LessonCard({ lesson, isSaved = false, onToggleSave }) {
  const { data: session } = authClient.useSession();
  const isPremiumUser =
    session?.user?.role === "admin" || session?.user?.isPremium === true;
  const isPremiumLesson = lesson.accessLevel === "Premium" || lesson.isPremium;
  const isLocked =
    isPremiumLesson && !isPremiumUser && session?.user?.id !== lesson.creatorId;
  const [isLiked, setIsLiked] = useState(
    lesson.likes?.includes(session?.user?.id) || false,
  );
  const [likesCount, setLikesCount] = useState(lesson.likesCount || 0);

  const handleToggleLike = async (e) => {
    e.preventDefault();
    if (!session?.user) return;
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
    try {
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;
      const res = await fetch(`/api/backend/lessons/${lesson._id || lesson.id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: session.user.id }),
      });
      const data = await res.json();
      if (data.success) {
        setIsLiked(data.isLiked);
        if (data.isLiked) {
          toast.success("Lesson liked! ❤️");
        } else {
          toast.success("Lesson unliked.");
        }
      }
    } catch (err) {
      console.error("Error toggling like:", err);
      setIsLiked(isLiked);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  const tags = lesson.tags || [lesson.category, lesson.emotionalTone].filter(Boolean);

  return (
    <motion.article
      variants={fadeInUp}
      className="relative rounded-2xl flex flex-col justify-between overflow-hidden group min-h-[460px] bg-[#F6F0DD] border-[3.5px] border-[#1C1611] shadow-[5px_5px_0px_0px_#1C1611] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[3.5px_3.5px_0px_0px_#1C1611] transition-all duration-150"
    >
      <div>
        <div className="relative w-full aspect-[16/9] overflow-hidden border-b-[3.5px] border-[#1C1611]">
          <Image
            src={lesson.imageUrl || "/pen-and-notebook.jpg"}
            alt={lesson.title || "Lesson thumbnail"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center grayscale ${isLocked ? "blur-[6px] opacity-40 scale-102" : "transition-transform duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"}`}
            loading="lazy"
          />
        </div>

        <div className="p-6 relative text-[#1C1611]">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded border-2 border-[#1C1611] ${
                  idx === 0
                    ? "bg-[#FF4A3A] text-white"
                    : "bg-[#FCD34D] text-[#1C1611]"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="font-black text-xl mb-3 text-[#1C1611] group-hover:text-[#FF4A3A] transition-colors duration-150 line-clamp-2">
            <Link href={lesson.href || `/lessons/${lesson._id || lesson.id}`}>
              {lesson.title}
            </Link>
          </h3>

          <p className="text-sm text-[#1C1611]/80 font-medium leading-relaxed line-clamp-3">
            {lesson.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 flex justify-between items-center border-t-2 border-[#1C1611]/15 text-[#1C1611]">
        <div className="flex items-center gap-2.5 mt-4">
          {lesson.authorImage || lesson.authorPhotoURL ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#1C1611]">
              <Image
                src={lesson.authorImage || lesson.authorPhotoURL}
                alt={lesson.authorName || lesson.author?.name || "Author"}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#4DD0B1] text-[#1C1611] border-2 border-[#1C1611] text-xs font-black flex items-center justify-center">
              {lesson.author?.initials ||
                (lesson.authorName ? lesson.authorName.charAt(0).toUpperCase() : "?")}
            </div>
          )}
          <span className="text-xs font-black uppercase text-[#1C1611]/80">
            {lesson.author?.name || lesson.authorName || "Unknown"}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {!isPremiumLesson && (
            <>
              <button
                onClick={handleToggleLike}
                className="flex items-center gap-1.5 px-3 h-9 rounded-lg border-2 border-[#1C1611] bg-white text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
                aria-label="Like reflection card"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isLiked ? "fill-[#FF4A3A] stroke-[#FF4A3A]" : "stroke-[#1C1611] stroke-[2.5px]"}`}
                />
                <span className="text-xs font-black">{likesCount}</span>
              </button>
              <Link
                href={`/lessons/${lesson._id || lesson.id}#comments`}
                className="w-9 h-9 rounded-lg border-2 border-[#1C1611] bg-white flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
                aria-label="Comments"
              >
                <MessageSquare className="w-4 h-4 stroke-[#1C1611] stroke-[2px]" />
              </Link>
            </>
          )}
          {!isPremiumLesson && onToggleSave && (
            <button
              onClick={(e) => onToggleSave(lesson._id || lesson.id, e)}
              className="w-9 h-9 rounded-lg border-2 border-[#1C1611] bg-white flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
              aria-label="Save reflection card"
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-[#FF4A3A] stroke-[#1C1611]" : "stroke-[#1C1611] stroke-[2px]"}`}
              />
            </button>
          )}
        </div>
      </div>

      {isLocked && <PremiumOverlay />}
    </motion.article>
  );
}
