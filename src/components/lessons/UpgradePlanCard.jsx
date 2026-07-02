import Link from "next/link";

export default function UpgradePlanCard() {
  return (
    <div className="w-full bg-[#161b12] border-[2px] border-[#c8ff6b33] rounded-xl p-4 flex flex-col gap-3 mt-auto shadow-[2px_2px_0px_0px_#0a0a0a]">
      <div>
        <h4 className="text-xs font-black uppercase text-[#c8ff6b] tracking-wide">Upgrade Plan</h4>
        <p className="text-[10px] font-bold text-[#444] leading-relaxed mt-1 uppercase">
          Unlock detailed metrics and private collections.
        </p>
      </div>
      <Link
        href="/pricing"
        className="w-full h-9 bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-[10px] rounded-lg flex items-center justify-center border-[2px] border-[#2a2a2a] shadow-[2px_2px_0px_0px_#0a0a0a] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#0a0a0a] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all duration-100 cursor-pointer"
      >
        Explore Pro
      </Link>
    </div>
  );
}