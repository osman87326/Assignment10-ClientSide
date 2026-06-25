import { Check, ShieldAlert, Terminal } from "lucide-react";

const RECENT_EVENTS = [
    { id: 1, type: "verified", label: "New Publisher Verified", text: "Elena Vance passed editorial review.", time: "14m ago" },
    { id: 2, type: "limit", label: "API Limit Increase", text: "Content generation tiers updated.", time: "1h ago" },
    { id: 3, type: "system", label: "Server Maintenance", text: "Scheduled for Sunday 03:00 UTC.", time: "4h ago" },
];

export default function SystemEventsLog() {
    return (
        <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1611] flex flex-col justify-between min-h-[340px]">
            <div className="w-full">
                <h3 className="text-xl font-black text-[#1C1611] uppercase tracking-tight mb-5 pb-4 border-b-[3.5px] border-[#1C1611]">
                    System Events
                </h3>

                <div className="flex flex-col gap-5 w-full">
                    {RECENT_EVENTS.map((event) => (
                        <div key={event.id} className="flex gap-3.5 items-start text-xs font-sans">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border-[2.5px] border-[#1C1611] mt-0.5 shadow-[2px_2px_0px_0px_#1C1611] ${event.type === "verified" ? "bg-[#4DD0B1] text-[#1C1611]" :
                                event.type === "limit" ? "bg-[#FCD34D] text-[#1C1611]" :
                                    "bg-[#FFB3A7] text-[#1C1611]"
                                }`}>
                                {event.type === "verified" ? <Check className="w-4 h-4 stroke-[3px]" /> :
                                    event.type === "limit" ? <ShieldAlert className="w-4 h-4 stroke-[2.5px]" /> :
                                        <Terminal className="w-4 h-4 stroke-[2.5px]" />}
                            </div>
                            <div className="min-w-0">
                                <h4 className="font-black text-[#1C1611] tracking-tight uppercase">{event.label}</h4>
                                <p className="text-[#1C1611]/80 font-bold mt-0.5 leading-normal">{event.text}</p>
                                <span className="text-[10px] text-[#1C1611]/50 font-black tracking-wider uppercase mt-1 block">{event.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="w-full h-12 bg-white text-[#1C1611] border-[2.5px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] font-sans font-black text-xs uppercase tracking-widest rounded-xl mt-6 transition-all cursor-pointer whitespace-nowrap">
                Download Logs
            </button>
        </div>
    );
}