import Link from "next/link";
import { Lock, Star } from "lucide-react";

export default function PremiumOverlay() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-[#0d0d0d]/92 backdrop-blur-sm">
      <div className="w-11 h-11 rounded-xl bg-[#c8ff6b22] border-[2px] border-[#c8ff6b44] text-[#c8ff6b] flex items-center justify-center mb-5 shadow-[2px_2px_0px_0px_#0a0a0a]">
        <Lock className="w-5 h-5 stroke-[2.5px]" />
      </div>
      <h4 className="font-black text-sm text-[#e8e4d9] mb-2 uppercase tracking-tight">Premium Lesson</h4>
      <p className="text-xs text-[#555] max-w-xs mb-6 leading-relaxed font-medium">
        Unlock our deep-dive archives with a Pro subscription.
      </p>
      <Link
        href="/pricing"
        className="bg-[#c8ff6b] text-[#1a2200] px-6 py-2.5 rounded-full font-black text-xs uppercase flex items-center gap-2 border-[2px] border-[#2a2a2a] shadow-[3px_3px_0px_0px_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
      >
        <Star className="w-3.5 h-3.5 fill-[#1a2200] stroke-[#1a2200]" />
        Upgrade to Unlock
      </Link>
    </div>
  );
}