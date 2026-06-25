import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

export default function PremiumOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#1C1611]/95 backdrop-blur-[2px]">
      <div className="w-12 h-12 rounded-xl bg-[#FF4A3A] border-2 border-[#1C1611] text-white flex items-center justify-center mb-5 shadow-[2.5px_2.5px_0px_0px_#FCD34D]">
        <Lock className="w-5 h-5 stroke-[2.5px]" />
      </div>

      <span className="text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded bg-[#FCD34D] text-[#1C1611] border-2 border-[#1C1611] mb-3 flex items-center gap-1 shadow-[1.5px_1.5px_0px_0px_#1C1611]">
        <Sparkles className="w-3 h-3 fill-current" />
        Premium Vault
      </span>

      <h4 className="font-serif italic font-extrabold text-lg text-white mb-2 tracking-tight">
        A deeper truth lies here.
      </h4>
      <p className="text-xs text-white/70 max-w-[200px] mb-6 leading-relaxed font-bold italic">
        &ldquo;This blueprint is veiled from common view. Cross the threshold to reveal its
        wisdom.&rdquo;
      </p>
      <Link
        href="/pricing"
        className="bg-[#4DD0B1] text-[#1C1611] px-6 py-2.5 rounded-full font-black text-xs uppercase flex items-center gap-2 border-[2.5px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100"
      >
        Unlock the Blueprint
      </Link>
    </div>
  );
}
