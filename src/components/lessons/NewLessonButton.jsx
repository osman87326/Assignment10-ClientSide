"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpgradeModal from "./UpgradeModal";

export default function NewLessonButton({ isPremium, lessonCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = (e) => {
    if (!isPremium && lessonCount >= 3) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Link
        href="/add-lesson"
        onClick={handleClick}
        className="inline-flex items-center justify-center gap-2 bg-[#FF4A3A] text-white font-black uppercase text-sm px-6 h-12 rounded-xl border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 shrink-0 self-start sm:self-auto cursor-pointer"
      >
        <Plus className="w-5 h-5 stroke-[3px]" />
        <span>New Lesson</span>
      </Link>

      <UpgradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}