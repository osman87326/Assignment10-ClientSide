import { Save, RefreshCw, Server, ShieldCheck, Database } from "lucide-react";

export default function SystemSettingsPage() {
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-[#e0e3e5] p-4 sm:p-6 md:p-10 select-none">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b border-white/5 pb-6">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#c7c4d8]/30 uppercase block mb-1">
                        Configuration Matrix
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                        System Settings
                    </h1>
                    <p className="text-xs text-[#c7c4d8]/40 font-sans font-light mt-1.5">
                        Adjust network-wide parameters, switch security parameters, clear caches, and toggle public verification systems.
                    </p>
                </header>

                {/* Configuration Sections Stacks */}
                <div className="flex flex-col gap-6 w-full font-sans text-xs">

                    {/* Box 1: Platform Core Flags */}
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                        <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2 tracking-tight">
                            <Server className="w-4 h-4 text-[#c3c0ff]" /> Global Core Variables
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold tracking-wider text-[#c7c4d8]/40 uppercase">Platform Environment Mode</label>
                                <input type="text" readOnly value="Production / Stable" className="h-10 bg-white/[0.02] border border-white/5 rounded-xl px-4 text-[#c7c4d8]/60 cursor-not-allowed outline-none" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold tracking-wider text-[#c7c4d8]/40 uppercase">Maximum Daily Upload Bounds</label>
                                <input type="text" defaultValue="50MB / user" className="h-10 bg-white/[0.04] border border-white/10 rounded-xl px-4 text-white focus:border-[#c3c0ff] outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* Box 2: System Maintenance / Operation Triggers */}
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
                        <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2 tracking-tight">
                            <Database className="w-4 h-4 text-[#c3c0ff]" /> Cache & Operational Pipeline Routing
                        </h3>
                        <p className="text-[#c7c4d8]/40 font-light leading-normal -mt-2">
                            Flushing active memory caches or execution tables immediately terminates active visitor sessions.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button className="h-10 px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                                <RefreshCw className="w-3.5 h-3.5" /> Purge Asset Cache
                            </button>
                            <button className="h-10 px-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                                <ShieldCheck className="w-3.5 h-3.5" /> Force Route Verification
                            </button>
                        </div>
                    </div>

                    {/* Footer Save Row Trigger */}
                    <div className="w-full border-t border-white/5 pt-4 flex justify-end">
                        <button className="h-11 px-6 bg-[#c3c0ff] hover:bg-[#b0adfa] text-[#1d00a5] font-bold text-sm rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center gap-2 cursor-pointer">
                            <Save className="w-4 h-4 stroke-[2.5]" /> Commit Configurations
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}