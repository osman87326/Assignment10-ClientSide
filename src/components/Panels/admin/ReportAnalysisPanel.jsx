"use client";

import { useState } from "react";
import { X, ShieldAlert } from "lucide-react";
import Image from "next/image";

export default function ReportAnalysisPanel() {
    const [selectedCase, setSelectedCase] = useState({
        title: "The Stoic Guide to Modern Productivity",
        violation: "HATE SPEECH & HARASSMENT",
        density: "12 reports in 45 mins",
        warnings: "2 prior warnings",
    });

    if (!selectedCase) return null;

    return (
        <div className="w-full flex flex-col gap-6">

            {/* Primary Report Detail Card */}
            <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <span className="bg-red-900/40 text-red-400 text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-red-500/20">
                        High Priority
                    </span>
                    <button
                        onClick={() => setSelectedCase(null)}
                        className="text-[#c7c4d8]/40 hover:text-white transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-6 tracking-tight">
                    Report Analysis
                </h3>

                {/* Matrix Metrics Grid */}
                <div className="space-y-4 font-sans text-xs mb-8">
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                        <span className="text-[#c7c4d8]/40">Primary Violation</span>
                        <span className="text-red-400 font-bold tracking-wide">{selectedCase.violation}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                        <span className="text-[#c7c4d8]/40">Report Density</span>
                        <span className="text-white font-medium">{selectedCase.density}</span>
                    </div>
                    <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
                        <span className="text-[#c7c4d8]/40">User History</span>
                        <span className="text-amber-400 font-medium">{selectedCase.warnings}</span>
                    </div>
                </div>

                {/* Isolated Comments Strip */}
                <div className="mb-8">
                    <h4 className="text-[10px] font-sans font-bold tracking-widest text-[#c7c4d8]/40 uppercase mb-3">
                        User Comments
                    </h4>
                    <div className="space-y-3">
                        <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl text-xs font-sans font-light leading-relaxed">
                            <span className="text-[#c3c0ff] font-medium">@reader_alpha:</span> &ldquo;Section 3 uses highly inflammatory language targeting a specific demographic under the guise of &lsquo;Stoicism&rsquo;.&rdquo;
                        </div>
                        <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl text-xs font-sans font-light leading-relaxed">
                            <span className="text-[#c3c0ff] font-medium">@safety_first:</span> &ldquo;The metaphors used in the conclusion are dog-whistles for extremist ideologies.&rdquo;
                        </div>
                    </div>
                </div>

                {/* Actions Button Stack */}
                <div className="flex flex-col gap-3 w-full">
                    <button
                        onClick={() => console.log("Ban routine triggered")}
                        className="w-full h-12 bg-red-400/20 hover:bg-red-400/30 text-red-200 border border-red-500/30 font-sans font-bold text-xs tracking-wide rounded-xl transition-all duration-200 active:scale-[0.99] cursor-pointer"
                    >
                        Delete Lesson & Ban Author
                    </button>

                    <button
                        onClick={() => console.log("Hide routine triggered")}
                        className="w-full h-12 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 font-sans font-bold text-xs tracking-wide rounded-xl transition-all duration-200 active:scale-[0.99] cursor-pointer"
                    >
                        Send Warning & Hide Content
                    </button>

                    <button
                        onClick={() => console.log("Dismiss routine triggered")}
                        className="w-full h-12 bg-transparent hover:bg-white/5 text-[#c7c4d8] border border-white/10 font-sans font-bold text-xs tracking-wide rounded-xl transition-all duration-200 active:scale-[0.99] cursor-pointer"
                    >
                        Dismiss Report
                    </button>
                </div>
            </div>

            {/* Editorial Quote Image Display Module Card */}
            <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden relative group shadow-xl">
                <div className="aspect-video w-full bg-neutral-900 relative">
                    <Image
                        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=400&auto=format&fit=crop"
                        alt="Editorial workspace overview"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover opacity-45 mix-blend-luminosity group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end">
                        <p className="text-sm font-serif italic text-white font-semibold">
                            &ldquo;Integrity is the bedrock of insight.&rdquo;
                        </p>
                        <span className="text-[10px] font-sans tracking-wider text-[#c7c4d8]/40 mt-1 block">
                            — Editorial Manifesto
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}