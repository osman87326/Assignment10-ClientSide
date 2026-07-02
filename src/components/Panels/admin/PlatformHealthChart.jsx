"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function PlatformHealthChart({ analytics = [] }) {
    const [activeTab, setActiveTab] = useState("users");

    // Fallback static data just in case analytics array is empty
    const defaultData = [
        { date: "Day 1", users: 52, assets: 30 },
        { date: "Day 2", users: 68, assets: 40 },
        { date: "Day 3", users: 60, assets: 35 },
        { date: "Day 4", users: 74, assets: 50 },
        { date: "Day 5", users: 88, assets: 60 },
        { date: "Day 6", users: 38, assets: 20 },
        { date: "Day 7", users: 70, assets: 45 }
    ];

    const chartData = analytics && analytics.length > 0 ? analytics : defaultData;

    // Custom Tooltip for professional look
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white border-[2.5px] border-[#1C1611] px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_#1C1611]">
                    <p className="text-[10px] font-black text-[#1C1611]/60 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-sm font-black text-[#1C1611] uppercase tracking-tight">
                        {payload[0].name}: <span className={activeTab === "users" ? "text-[#4DD0B1]" : "text-[#FCD34D]"}>{payload[0].value}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

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
            <div className="w-full h-64 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-2xl p-4 flex items-end justify-between gap-2 overflow-hidden shadow-[inset_3px_3px_0px_0px_rgba(28,22,17,0.1)] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <XAxis 
                            dataKey="date" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#1C1611', fontSize: 10, fontWeight: 900, fontFamily: 'sans-serif' }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#1C1611', fontSize: 10, fontWeight: 900, fontFamily: 'sans-serif' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(28,22,17,0.05)' }} />
                        <Bar 
                            dataKey={activeTab} 
                            name={activeTab === "users" ? "Users" : "Assets"}
                            radius={[6, 6, 0, 0]}
                        >
                            {
                                chartData.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={activeTab === "users" ? "#4DD0B1" : "#FCD34D"} 
                                        stroke="#1C1611"
                                        strokeWidth={2.5}
                                    />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}