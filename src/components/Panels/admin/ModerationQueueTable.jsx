import { ChevronRight, SlidersHorizontal, ShieldCheck, ChevronLeft } from "lucide-react";

const CASES_DATA = [
    { id: 1, title: "The Stoic Guide to Modern Productivity", meta: "Submitted 2h ago", author: "Marcus Aurelius", initials: "MA", reports: 12, status: "Urgent Review", statusColor: "text-red-400 bg-red-400/10 border-red-500/20" },
    { id: 2, title: "Financial Literacy for the Existential Crisis", meta: "Submitted 5h ago", author: "Joan Didion", initials: "JD", reports: 3, status: "Pending", statusColor: "text-slate-400 bg-white/5 border-white/5" },
    { id: 3, title: "Digital Minimalism or Digital Death?", meta: "Submitted 1d ago", author: "Cal Newport", initials: "CN", reports: 8, status: "Review In Progress", statusColor: "text-amber-400 bg-amber-400/10 border-amber-500/20" },
];

export default function ModerationQueueTable() {
    return (
        <div className="w-full flex flex-col gap-6">

            {/* Filter Options Utility Action Bar Strip */}
            <div className="flex items-center justify-end gap-3 w-full">
                <button className="h-10 px-4 bg-white/[0.04] border border-white/10 rounded-xl text-xs font-sans font-medium text-[#c7c4d8]/70 hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                    <SlidersHorizontal className="w-3.5 h-3.5" /> Filter
                </button>
                <button className="h-10 px-5 bg-[#c3c0ff] hover:bg-[#b0adfa] text-[#1d00a5] text-xs font-sans font-bold rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2 cursor-pointer">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" /> Batch Resolve
                </button>
            </div>

            {/* Main Datatable Card Block Wrapper */}
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl shadow-xl overflow-hidden">
                <div className="w-full overflow-x-auto min-w-0">
                    <table className="table w-full border-collapse min-w-[650px] lg:min-w-0">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[0.01] text-[10px] font-sans font-bold tracking-widest text-[#c7c4d8]/30 uppercase">
                                <th className="p-5 text-left w-[45%]">Lesson Title</th>
                                <th className="p-5 text-left w-[25%]">Author</th>
                                <th className="p-5 text-left w-[12%]">Reports</th>
                                <th className="p-5 text-left w-[13%]">Status</th>
                                <th className="p-5 text-center w-[5%]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.06]">
                            {CASES_DATA.map((item) => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors duration-150 group cursor-pointer">

                                    {/* Title & Metadata */}
                                    <td className="p-5 min-w-0">
                                        <h4 className="text-sm font-sans font-semibold text-white tracking-tight group-hover:text-[#c3c0ff] transition-colors truncate">
                                            {item.title}
                                        </h4>
                                        <p className="text-[11px] font-sans text-[#c7c4d8]/40 mt-0.5 truncate">{item.meta}</p>
                                    </td>

                                    {/* Profile mapping */}
                                    <td className="p-5 flex items-center gap-3 whitespace-nowrap">
                                        <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                            {item.initials}
                                        </div>
                                        <span className="text-xs font-sans font-medium text-[#e0e3e5]">{item.author}</span>
                                    </td>

                                    {/* Reports volume dot */}
                                    <td className="p-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center justify-center text-[10px] font-sans font-bold rounded-md px-2 py-0.5 ${item.reports > 5 ? "bg-red-500/10 text-red-400" : "bg-white/5 text-slate-400"
                                            }`}>
                                            {item.reports}
                                        </span>
                                    </td>

                                    {/* Status Indicator */}
                                    <td className="p-5 whitespace-nowrap">
                                        <span className={`inline-block text-[10px] font-sans font-medium uppercase tracking-wider px-2 py-0.5 border rounded-md ${item.statusColor}`}>
                                            • {item.status}
                                        </span>
                                    </td>

                                    {/* Trailing arrow navigation pointer action */}
                                    <td className="p-5 text-center whitespace-nowrap">
                                        <ChevronRight className="w-4 h-4 text-[#c7c4d8]/20 group-hover:text-[#c3c0ff] group-hover:translate-x-0.5 transition-all mx-auto" />
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Unified Table Pagination Bar */}
                <footer className="border-t border-white/5 px-5 py-4 flex items-center justify-between gap-4 text-xs font-sans text-[#c7c4d8]/40 bg-white/[0.01]">
                    <span className="font-light">Showing 1-3 of 24 reports</span>
                    <div className="flex items-center gap-1">
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/5 hover:bg-white/5 text-white transition-colors cursor-pointer" disabled>
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#c3c0ff] text-[#1d00a5] font-bold shadow-xs">
                            1
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/5 hover:bg-white/5 text-white transition-colors cursor-pointer">
                            2
                        </button>
                        <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/5 hover:bg-white/5 text-white transition-colors cursor-pointer">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </footer>
            </div>

        </div>
    );
}