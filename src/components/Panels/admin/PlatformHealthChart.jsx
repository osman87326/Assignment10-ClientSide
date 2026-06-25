"use client";

import { useState } from "react";

export default function PlatformHealthChart() {
    const [activeTab, setActiveTab] = useState("users");

    // Mock representations of the vertical layout bars
    const chartBars = [52, 68, 60, 74, 88, 38, 70, 64, 82];

    return (
        <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1611]">
            {/* Chart Headers and View Switches */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h3 className="text-xl font-black text-[#1C1611] tracking-tight uppercase">
                        Platform Health Analytics
                    </h3>
                    <p className="text-xs text-[#1C1611]/70 font-bold mt-0.5">
                        User Growth vs. Asset Generation (Past 30 Days)
                    </p>
                </div>

                {/* Dynamic Controls Switch */}
                <div className="flex items-center gap-6 text-xs font-black uppercase tracking-wider text-[#1C1611]/50">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-2 cursor-pointer transition-colors ${activeTab === "users" ? "text-[#1C1611]" : "hover:text-[#1C1611]/80"}`}
                    >
                        <span className={`w-3 h-3 border-[2px] border-[#1C1611] rounded-full ${activeTab === "users" ? "bg-[#4DD0B1]" : "bg-white"}`} />
                        Users
                    </button>

                    <button
                        onClick={() => setActiveTab("assets")}
                        className={`flex items-center gap-2 cursor-pointer transition-colors ${activeTab === "assets" ? "text-[#1C1611]" : "hover:text-[#1C1611]/80"}`}
                    >
                        <span className={`w-3 h-3 border-[2px] border-[#1C1611] rounded-full ${activeTab === "assets" ? "bg-[#FCD34D]" : "bg-white"}`} />
                        Assets
                    </button>
                </div>
            </div>

            {/* Fluid Bar Graph Container */}
            <div className="w-full h-48 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-2xl p-4 flex items-end justify-between gap-2 md:gap-4 overflow-hidden shadow-[inset_3px_3px_0px_0px_rgba(28,22,17,0.1)]">
                {chartBars.map((height, idx) => (
                    <div
                        key={idx}
                        style={{ height: `${height}%` }}
                        className="w-full bg-[#1C1611] rounded-t-lg transition-all duration-500 hover:bg-[#FF4A3A] cursor-pointer group relative border-[2.5px] border-b-0 border-[#1C1611] hover:-translate-y-1"
                    >
                        {/* Tooltip representation on bar hover */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-[2.5px] border-[#1C1611] text-[#1C1611] font-black uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-xl shadow-[3px_3px_0px_0px_#1C1611] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            Value: {height}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}