import Image from "next/image";

export default function LessonsLoading() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#F6F0DD]">
      <div className="relative animate-bounce">
        <div className="w-40 h-40 relative rounded-2xl overflow-hidden border-[4px] border-[#1C1611] shadow-[6px_6px_0px_0px_#1C1611] bg-white flex items-center justify-center">
          <Image 
            src="/thinking-pen.png" 
            alt="Thinking pen loader" 
            fill
            className="object-cover"
          />
        </div>
        {/* Floating thought bubbles */}
        <div className="absolute -top-6 -right-4 w-4 h-4 rounded-full border-[2px] border-[#1C1611] bg-[#FF4A3A] animate-ping" style={{ animationDelay: '0ms', animationDuration: '1.5s' }}></div>
        <div className="absolute -top-10 -right-1 w-6 h-6 rounded-full border-[2.5px] border-[#1C1611] bg-[#FCD34D] animate-ping" style={{ animationDelay: '300ms', animationDuration: '1.5s' }}></div>
        <div className="absolute -top-16 right-4 w-8 h-8 rounded-full border-[3px] border-[#1C1611] bg-[#4DD0B1] animate-ping" style={{ animationDelay: '600ms', animationDuration: '1.5s' }}></div>
      </div>
      
      <h2 className="mt-12 text-2xl font-black uppercase text-[#1C1611] tracking-widest flex items-center gap-2">
        Gathering Notes 
        <span className="flex gap-1">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
        </span>
      </h2>
      <p className="mt-3 text-sm font-bold text-[#1C1611]/70 uppercase tracking-wider">
        Flipping through the archives
      </p>
    </div>
  );
}