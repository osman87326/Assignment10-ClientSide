"use client";

import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LessonEditorForm } from "@/components/lessons";

function AddLessonContent() {
  const searchParams = useSearchParams();
  const lessonId = searchParams.get("id");

  return (
    <div className="max-w-4xl mx-auto w-full flex flex-col gap-8 flex-grow">

      {/* Page Header with back navigation */}
      <header className="flex items-center gap-4 border-b-[3.5px] border-[#1C1611] pb-6">
        <Link
          href="/my-lessons"
          className="w-10 h-10 rounded-xl bg-white border-2 border-[#1C1611] flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 shrink-0 cursor-pointer"
          aria-label="Back to My Lessons"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3px]" />
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-[#1C1611]">
            {lessonId ? "Edit Lesson" : "New Lesson"}
          </h1>
          <p className="text-xs text-[#1C1611]/80 font-black uppercase mt-0.5">
            {lessonId
              ? "Update your lesson and republish when ready."
              : "Document a new life lesson and share it with the world."
            }
          </p>
        </div>
      </header>

      {/* Editor Form — receives lessonId for edit mode */}
      <LessonEditorForm lessonId={lessonId} />

    </div>
  );
}

export default function AddLessonPage() {
  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none flex flex-col">
      <Suspense fallback={
        <div className="max-w-4xl mx-auto w-full flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
        </div>
      }>
        <AddLessonContent />
      </Suspense>
    </div>
  );
}