import Link from "next/link";
import { Home, Search, BookOpen, Sparkles, Compass } from "lucide-react";
import PenMascot from "@/components/PenMascot";

export default function NotFound() {
  return (
    <div className="w-full h-dvh bg-[#F6F0DD] text-[#1C1611] px-3 sm:px-4 py-4 sm:py-6 flex flex-col justify-between items-center select-none overflow-hidden relative">
      
      {/* Blueprint Dot Matrix texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1611 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px"
        }}
        aria-hidden="true"
      />

      {/* Top Brand Token Header */}
      <header className="z-10 relative shrink-0">
        <h2 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-[#1C1611]">
          Digital Life Lessons
        </h2>
      </header>

      {/* Primary Error Context Card */}
      <main className="w-full max-w-md sm:max-w-xl bg-[#FCD34D] border-[3px] sm:border-[3.5px] border-[#1C1611] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 mx-auto text-center relative shadow-[4px_4px_0px_0px_#1C1611] sm:shadow-[6px_6px_0px_0px_#1C1611] flex flex-col items-center z-10 transition-all duration-100">
        
        {/* Ambient watermark icon behind the error number */}
        <div className="absolute top-4 sm:top-6 text-[#1C1611]/5 pointer-events-none select-none">
          <Compass className="w-20 sm:w-28 h-20 sm:h-28 stroke-[0.5]" />
        </div>

        {/* Crying Pen Mascot */}
        <div className="mb-0 sm:mb-1 z-10 relative">
          <PenMascot variant="crying" color="teal" className="w-10 h-20 sm:w-14 sm:h-28" />
        </div>

        {/* Luxury Editorial Error Number */}
        <h1 className="text-[48px] sm:text-[80px] md:text-[96px] font-black leading-none tracking-tighter text-[#1C1611] italic select-none">
          404
        </h1>

        {/* Heading */}
        <h3 className="text-base sm:text-xl md:text-2xl font-black text-[#1C1611] tracking-tight mt-1 sm:mt-2 mb-1 sm:mb-2 uppercase">
          A path less traveled.
        </h3>

        {/* Informative message */}
        <p className="text-[10px] sm:text-[11px] md:text-xs text-[#1C1611]/80 font-bold leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-4 sm:mb-6 uppercase">
          This specific lesson has yet to be written into our digital history. It seems you&rsquo;ve drifted beyond the mapped territories of our insight.
        </p>

        {/* Fluid Button Array Configuration */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF4A3A] text-white font-black uppercase text-xs sm:text-sm h-10 sm:h-11 px-5 sm:px-6 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 stroke-[3px]" />
            Return Home
          </Link>

          <Link
            href="/my-lessons"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#1C1611] font-black uppercase text-xs sm:text-sm h-10 sm:h-11 px-5 sm:px-6 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#1C1611] stroke-[3px]" />
            Search Lessons
          </Link>
        </div>

        {/* Bottom Technical System Stamp Reference */}
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#1C1611]/60 font-black uppercase mt-4 sm:mt-6 block select-none">
          Error Ref: #NO_ENTRY_FOUND_0x404
        </span>
      </main>

      {/* Page Base Architectural Philosophy Links */}
      <footer className="w-full max-w-md flex justify-center items-center gap-6 sm:gap-8 md:gap-12 z-10 pt-3 sm:pt-4 border-t-2 border-[#1C1611] shrink-0">
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity text-[#1C1611]">
          <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5px]" />
          <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase">Philosophy</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity text-[#1C1611]">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5px]" />
          <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase">Focus</span>
        </div>
        <div className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity text-[#1C1611]">
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5px]" />
          <span className="text-[8px] sm:text-[9px] font-black tracking-widest uppercase">Structure</span>
        </div>
      </footer>

    </div>
  );
}