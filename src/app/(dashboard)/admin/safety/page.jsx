import ContentSafetyCounters from "@/components/Panels/admin/ContentSafetyCounters";
import ModerationQueueTable from "@/components/Panels/admin/ModerationQueueTable";
import ReportAnalysisPanel from "@/components/Panels/admin/ReportAnalysisPanel";

export default function ContentSafetyDashboardPage() {
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-[#e0e3e5] p-4 sm:p-6 md:p-10 select-none flex flex-col justify-between gap-16">

            {/* Primary Layout Block Container */}
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">

                {/* Module Area Page Header Grid */}
                <header className="w-full border-b border-white/5 pb-6">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#c7c4d8]/30 uppercase block mb-1">
                        Moderation Queue
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                        Content Safety
                    </h1>
                    <p className="text-xs text-[#c7c4d8]/40 font-sans font-light mt-1.5 max-w-xl leading-relaxed">
                        Review and manage reported lessons to maintain our editorial standard and community safety.
                    </p>
                </header>

                {/* Split Dynamic Main View Workspace Layout Column Layouts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full min-w-0">

                    {/* Left Axis: Counters Matrix list and primary Table feed */}
                    <div className="lg:col-span-2 flex flex-col gap-6 w-full min-w-0">
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
            <footer className="w-full max-w-7xl mx-auto border-t border-white/5 pt-12 pb-4 font-sans text-xs flex flex-col md:flex-row items-start justify-between gap-8 mt-auto">
                <div className="flex flex-col gap-2 max-w-xs">
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                        Digital Life Lessons
                    </h2>
                    <p className="text-[11px] text-[#c7c4d8]/30 font-light leading-normal">
                        © 2026 Digital Life Lessons. Bridging deep editorial insight with modern productivity.
                    </p>
                </div>

                {/* Footer Navigation Columns Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-[#c7c4d8]/50">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-white text-[11px] uppercase tracking-wider mb-1">Vision</span>
                        <a href="#" className="hover:text-white transition-colors">X</a>
                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-white text-[11px] uppercase tracking-wider mb-1">GitHub</span>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 sm:col-span-1 min-w-[200px]">
                        <span className="font-bold text-white text-[11px] uppercase tracking-wider mb-1">Stay Informed</span>
                        <div className="relative w-full mt-1">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full h-10 bg-white/[0.04] border border-white/10 rounded-xl px-4 text-xs font-light text-white focus:outline-none focus:border-[#c3c0ff]"
                            />
                            <button className="absolute right-1 top-1 w-8 h-8 rounded-lg bg-[#c3c0ff] hover:bg-[#b0adfa] text-[#1d00a5] flex items-center justify-center transition-colors cursor-pointer">
                                →
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}