"use client";

import { useState } from "react";

export default function VisibilityToggle({ lessonId, initialStatus }) {
  const [isPublic, setIsPublic] = useState(initialStatus);

  return (
    <label className="inline-flex items-center gap-2.5 cursor-pointer select-none touch-manipulation">
      <input
        type="checkbox"
        checked={isPublic}
        onChange={() => setIsPublic(!isPublic)}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-white border-2 border-[#1C1611] rounded-full transition-colors peer-checked:bg-[#4DD0B1] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#1C1611] after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-[20px]" />
      <span className="text-[10px] font-black w-14 text-[#1C1611] uppercase tracking-wider">
        {isPublic ? "Public" : "Private"}
      </span>
    </label>
  );
}
