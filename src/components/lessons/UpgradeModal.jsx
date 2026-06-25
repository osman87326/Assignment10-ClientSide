"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function UpgradeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1C1611]/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-[6px_6px_0px_0px_#1C1611] flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1C1611]/60 hover:text-[#1C1611] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 stroke-[3px]" />
        </button>

        {/* Header / Icon Area */}
        <div className="w-16 h-16 bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_#1C1611] mb-6">
          <span className="text-2xl">🖋️</span>
        </div>

        {/* Poetic Copy */}
        <h2 className="text-xl font-black uppercase text-[#1C1611] mb-3">
          Your Journal is Full
        </h2>
        <p className="text-sm font-bold text-[#1C1611]/80 leading-relaxed mb-8">
          Alas, your free journal is full. The pages run out, but your thoughts do not. 
          Upgrade to Premium to unlock an infinite notebook and continue your journey of reflection.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/pricing"
            onClick={onClose}
            className="w-full bg-[#FF4A3A] text-white font-black uppercase text-sm h-12 rounded-xl flex items-center justify-center border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
          >
            Unlock Infinite Pages
          </Link>
          <button
            onClick={onClose}
            className="w-full bg-white text-[#1C1611] font-black uppercase text-xs h-10 rounded-xl flex items-center justify-center border-2 border-[#1C1611] hover:bg-[#f7f9fb] transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}