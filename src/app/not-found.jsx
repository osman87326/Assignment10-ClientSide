import Link from "next/link";
import { Home, Search, BookOpen, Sparkles, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-dvh bg-[#0d0d0d] text-[#e8e4d9] px-4 py-6 flex flex-col justify-between items-center select-none overflow-hidden relative">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#c8ff6b 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />

      <header className="z-10 relative">
        <h2 className="text-base sm:text-lg font-black uppercase tracking-wider text-[#e8e4d9]">
          Digital Life Lessons
        </h2>
      </header>

      <main className="w-full max-w-md sm:max-w-xl bg-[#161616] border-[2.5px] border-[#2a2a2a] rounded-2xl sm:rounded-3xl p-6 sm:p-10 mx-auto text-center relative shadow-[6px_6px_0px_0px_#0a0a0a] flex flex-col items-center z-10">
        <div className="absolute top-4 text-[#c8ff6b]/5 pointer-events-none">
          <Compass className="w-24 h-24 stroke-[0.5]" />
        </div>

        <h1 className="text-[72px] sm:text-[96px] font-black leading-none tracking-tighter text-[#c8ff6b] italic select-none">
          404
        </h1>

        <h3 className="text-lg sm:text-2xl font-black text-[#e8e4d9] tracking-tight mt-2 mb-2 uppercase">
          A path less traveled.
        </h3>

        <p className="text-[10px] sm:text-xs text-[#555] font-bold leading-relaxed max-w-sm mx-auto mb-6 uppercase">
          This lesson has yet to be written. You&rsquo;ve drifted beyond the mapped territories of our insight.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Link href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-xs sm:text-sm h-11 px-6 rounded-xl border-[2px] border-[#2a2a2a] shadow-[2.5px_2.5px_0px_0px_#0a0a0a] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all cursor-pointer"
          >
            <Home className="w-4 h-4 stroke-[3px]" /> Return Home
          </Link>
          <Link href="/lessons"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1e1e1e] text-[#e8e4d9] font-black uppercase text-xs sm:text-sm h-11 px-6 rounded-xl border-[2px] border-[#2a2a2a] shadow-[2.5px_2.5px_0px_0px_#0a0a0a] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none transition-all cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[3px]" /> Search Lessons
          </Link>
        </div>

        <span className="text-[9px] font-mono tracking-widest text-[#333] font-black uppercase mt-6 block select-none">
          Error Ref: #NO_ENTRY_FOUND_0x404
        </span>
      </main>

      <footer className="w-full max-w-md flex justify-center items-center gap-8 z-10 pt-4 border-t border-[#1e1e1e]">
        {[BookOpen, Sparkles, Compass].map((Icon, i) => (
          <div key={i} className="flex flex-col items-center gap-1 opacity-30 hover:opacity-80 transition-opacity text-[#c8ff6b]">
            <Icon className="w-3.5 h-3.5 stroke-[2.5px]" />
          </div>
        ))}
      </footer>
    </div>
  );
}