import ContentSafetyCounters from "@/components/Panels/admin/ContentSafetyCounters";
import ModerationQueueTable from "@/components/Panels/admin/ModerationQueueTable";
import ReportAnalysisPanel from "@/components/Panels/admin/ReportAnalysisPanel";


export const metadata = {
  title: "Safety",
};

export default function ContentSafetyDashboardPage() {
    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none flex flex-col justify-between gap-16">

            {/* Primary Layout Block Container */}
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">

                {/* Module Area Page Header Grid */}
                <header className="w-full border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-[10px] font-black tracking-widest text-[#1C1611]/70 uppercase block mb-1">
                        Moderation Queue
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase text-[#1C1611] tracking-tight mb-1.5">
                        Content Safety
                    </h1>
                    <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase max-w-xl leading-relaxed">
                        Review and manage reported lessons to maintain our editorial standard and community safety.
                    </p>
                </header>

                {/* Split Dynamic Main View Workspace Layout Column Layouts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full min-w-0">

                    {/* Left Axis: Counters Matrix list and primary Table feed */}
                    <div className="lg:col-span-2 flex flex-col gap-8 w-full min-w-0">
                        <ContentSafetyCounters />
                        <ModerationQueueTable />
                    </div>

                    {/* Right Axis: Dynamic Sidebar Operations Layer Client boundary wrapper */}
                    <div className="w-full min-w-0">
                        <ReportAnalysisPanel />
                    </div>

                </div>

            </div>

            {/* Corporate Dashboard Editorial Site Footer */}
            <footer className="w-full max-w-7xl mx-auto border-t-[3.5px] border-[#1C1611] pt-12 pb-4 flex flex-col md:flex-row items-start justify-between gap-8 mt-auto">
                <div className="flex flex-col gap-2 max-w-xs">
                    <h2 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">
                        Digital Life Lessons
                    </h2>
                    <p className="text-[10px] font-black uppercase text-[#1C1611]/60 leading-normal">
                        © 2026 Digital Life Lessons. Bridging deep editorial insight with modern productivity.
                    </p>
                </div>

                {/* Footer Navigation Columns Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[#1C1611]">
                    <div className="flex flex-col gap-2">
                        <span className="font-black text-[#1C1611] text-[10px] uppercase tracking-widest mb-1">Vision</span>
                        <a href="#" className="text-xs font-bold uppercase hover:text-[#FF4A3A] hover:translate-x-1 transition-all">X</a>
                        <a href="#" className="text-xs font-bold uppercase hover:text-[#FF4A3A] hover:translate-x-1 transition-all">LinkedIn</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-black text-[#1C1611] text-[10px] uppercase tracking-widest mb-1">GitHub</span>
                        <a href="#" className="text-xs font-bold uppercase hover:text-[#FF4A3A] hover:translate-x-1 transition-all">Support</a>
                        <a href="#" className="text-xs font-bold uppercase hover:text-[#FF4A3A] hover:translate-x-1 transition-all">Terms</a>
                    </div>
                    <div className="flex flex-col gap-3 col-span-2 sm:col-span-1 min-w-[200px]">
                        <span className="font-black text-[#1C1611] text-[10px] uppercase tracking-widest mb-1">Stay Informed</span>
                        <div className="relative w-full">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full h-12 bg-white border-[3px] border-[#1C1611] rounded-xl px-4 text-xs font-black text-[#1C1611] placeholder:text-[#1C1611]/40 focus:outline-none focus:shadow-[2px_2px_0px_0px_#1C1611] transition-all"
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 w-9 rounded-lg bg-[#4DD0B1] border-[2.5px] border-[#1C1611] text-[#1C1611] flex items-center justify-center hover:bg-[#FFD338] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#1C1611] active:translate-y-[1px] active:translate-x-[1px] active:shadow-none">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}