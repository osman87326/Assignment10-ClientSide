import { Shield, Mail, Key, Activity, Calendar } from "lucide-react";
import Image from "next/image";

const SECURITY_LOGS = [
    { id: 1, action: "Authorized API Tier Bump", target: "@system_core", time: "2 hours ago" },
    { id: 2, action: "Suspended User Account", target: "UID-89412", time: "Yesterday at 14:22" },
    { id: 3, action: "Modified System Variables", target: "Max Daily Bounds", time: "June 18, 2026" },
];

export default function AdminProfilePage() {
    return (
        <div className="w-full min-h-screen bg-[#0a0a0a] text-[#e0e3e5] p-4 sm:p-6 md:p-10 select-none">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b border-white/5 pb-6">
                    <span className="text-[10px] font-sans font-bold tracking-widest text-[#c7c4d8]/30 uppercase block mb-1">
                        Identity Card
                    </span>
                    <h1 className="text-3xl font-serif font-bold text-white tracking-tight">
                        Admin Profile
                    </h1>
                </header>

                {/* Profile Card Hero Component */}
                <div className="w-full bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
                    {/* Avatar Container */}
                    <div className="w-20 h-20 rounded-full border-2 border-[#c3c0ff]/30 relative overflow-hidden bg-white/5 shrink-0 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop"
                            alt="Marcus Thorne Profile Avatar"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Info Elements */}
                    <div className="flex-grow text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                            <h2 className="text-xl font-sans font-bold text-white tracking-tight">Marcus Thorne</h2>
                            <span className="inline-flex items-center justify-center gap-1 bg-[#c3c0ff]/10 border border-[#c3c0ff]/20 text-xs text-[#c3c0ff] px-2.5 py-0.5 rounded-full w-max mx-auto sm:mx-0 font-medium">
                                <Shield className="w-3 h-3" /> Lead Editor
                            </span>
                        </div>
                        <p className="text-xs text-[#c7c4d8]/40 font-sans font-light mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                            <Mail className="w-3.5 h-3.5" /> marcus@digitallessons.io
                        </p>
                        <p className="text-[11px] text-[#c7c4d8]/30 font-sans font-light mt-3 flex items-center justify-center sm:justify-start gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> Security Access Issued: January 2026
                        </p>
                    </div>
                </div>

                {/* Security / System Logs Section Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs">

                    {/* Security Summary Matrix Block */}
                    <div className="md:col-span-2 bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col gap-4">
                        <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2 tracking-tight">
                            <Activity className="w-4 h-4 text-[#c3c0ff]" /> Recent System Enforcement Log
                        </h3>

                        <div className="flex flex-col gap-3 w-full divide-y divide-white/[0.04]">
                            {SECURITY_LOGS.map((log) => (
                                <div key={log.id} className="flex justify-between items-start pt-3 first:pt-0 gap-4">
                                    <div>
                                        <span className="text-white font-medium block">{log.action}</span>
                                        <span className="text-[11px] text-[#c7c4d8]/40 font-light mt-0.5 block">{log.target}</span>
                                    </div>
                                    <span className="text-[10px] text-[#c7c4d8]/30 font-light shrink-0 whitespace-nowrap">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct Security Token Box Controls */}
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
                        <div>
                            <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2 tracking-tight">
                                <Key className="w-4 h-4 text-[#c3c0ff]" /> Credentials
                            </h3>
                            <p className="text-[11px] text-[#c7c4d8]/40 font-light leading-normal mt-2">
                                Your cryptographic keys expire every 30 days.
                            </p>
                        </div>

                        <button className="w-full h-9 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer mt-4">
                            Rotate Auth Token
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}