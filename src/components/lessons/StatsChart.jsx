"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { BarChart2 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border-[3px] border-[#1C1611] p-3 shadow-[4px_4px_0px_0px_#1C1611] rounded-xl text-[#1C1611]">
        <p className="font-black text-xs uppercase mb-1">{label}</p>
        <p className="font-bold text-sm text-[#FF4A3A]">
          {payload[0].value} Likes
        </p>
      </div>
    );
  }
  return null;
};

export default function StatsChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-2xl shadow-[4px_4px_0px_0px_#1C1611] p-6 sm:p-8 mt-8 flex flex-col items-center justify-center min-h-[300px]">
        <BarChart2 className="w-10 h-10 stroke-[#1C1611]/30 mb-3" />
        <h3 className="font-black text-[#1C1611]/60 uppercase text-center">No Data Available</h3>
        <p className="text-xs font-bold text-[#1C1611]/40 uppercase text-center mt-1">
          Publish some lessons to see your stats here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-2xl shadow-[4px_4px_0px_0px_#1C1611] p-6 sm:p-8 mt-8">
      <h2 className="text-xl font-black uppercase text-[#1C1611] mb-6 flex items-center gap-2">
        <BarChart2 className="w-6 h-6 stroke-[2.5px]" />
        Top Lessons by Engagement
      </h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1C1611" opacity={0.1} vertical={false} />
            <XAxis 
              dataKey="title" 
              axisLine={{ stroke: '#1C1611', strokeWidth: 2 }}
              tickLine={false}
              tick={{ fill: '#1C1611', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#1C1611', fontSize: 10, fontWeight: 900 }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(28, 22, 17, 0.05)' }} />
            <Bar 
              dataKey="likes" 
              fill="#FF4A3A" 
              radius={[4, 4, 0, 0]}
              stroke="#1C1611"
              strokeWidth={2}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}