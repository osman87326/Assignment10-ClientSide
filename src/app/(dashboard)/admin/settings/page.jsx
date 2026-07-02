import { RefreshCw, Server, ShieldCheck, Database, Globe, Users, FileText } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "System Settings",
};

async function getPlatformStats(headersList) {
    try {
        const cookie = headersList.get('cookie') || '';
        const tokenRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, { headers: cookie ? { cookie } : {}, cache: 'no-store' });
        const token = tokenRes.ok ? (await tokenRes.json())?.token : "";
        if (!token) return null;

        const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
        const res = await fetch(`${serverUrl}/api/admin/stats`, {
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.success ? data.stats : null;
    } catch (err) {
        console.error("Error fetching platform stats:", err);
        return null;
    }
}

export default async function SystemSettingsPage() {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session || session.user.role !== 'admin') {
        redirect("/home");
    }

    const stats = await getPlatformStats(headersList);

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-[10px] font-black tracking-widest text-[#1C1611]/70 uppercase block mb-1">
                        Configuration Matrix
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] mb-1.5 flex items-center gap-3">
                        System Settings
                    </h1>
                    <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase">
                        Platform overview and system configuration.
                    </p>
                </header>

                {/* Configuration Sections */}
                <div className="flex flex-col gap-8 w-full">

                    {/* Platform Overview */}
                    <div className="bg-white border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] rounded-2xl p-6 flex flex-col gap-6">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] flex items-center gap-2">
                            <Server className="w-5 h-5 stroke-[2.5px]" /> Platform Overview
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Total Users", value: stats?.totalUsers ?? '—', icon: Users, color: "text-[#1C1611]", bg: "bg-[#4DD0B1]" },
                                { label: "Public Lessons", value: stats?.totalPublicLessons ?? '—', icon: Globe, color: "text-[#1C1611]", bg: "bg-[#FFD338]" },
                                { label: "Private Drafts", value: stats?.totalDrafts ?? '—', icon: FileText, color: "text-[#1C1611]", bg: "bg-[#FFB3A7]" },
                                { label: "Pending Reports", value: stats?.pendingReports ?? '—', icon: ShieldCheck, color: "text-white", bg: "bg-[#FF4A3A]" },
                            ].map((item) => (
                                <div key={item.label} className={`${item.bg} border-[3px] border-[#1C1611] rounded-xl p-4 flex flex-col gap-2 shadow-[2px_2px_0px_0px_#1C1611]`}>
                                    <item.icon className={`w-5 h-5 stroke-[2.5px] ${item.color}`} />
                                    <span className={`text-2xl font-black ${item.color}`}>{item.value}</span>
                                    <span className={`text-[10px] font-black ${item.color} uppercase tracking-widest`}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Environment Info */}
                    <div className="bg-white border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] rounded-2xl p-6 flex flex-col gap-6">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] flex items-center gap-2">
                            <Database className="w-5 h-5 stroke-[2.5px]" /> Environment
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">Platform Environment</label>
                                <div className="h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-xl px-4 flex items-center text-[#1C1611] font-black text-sm shadow-[2px_2px_0px_0px_#1C1611]">
                                    Production / Stable
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">Auth Provider</label>
                                <div className="h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-xl px-4 flex items-center text-[#1C1611]/80 font-bold text-sm shadow-[2px_2px_0px_0px_#1C1611]">
                                    Better-Auth + Google OAuth
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">Payment Gateway</label>
                                <div className="h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-xl px-4 flex items-center text-[#1C1611]/80 font-bold text-sm shadow-[2px_2px_0px_0px_#1C1611]">
                                    Stripe (Test Mode)
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">Database</label>
                                <div className="h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] rounded-xl px-4 flex items-center text-[#1C1611]/80 font-bold text-sm shadow-[2px_2px_0px_0px_#1C1611]">
                                    MongoDB Atlas
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cache Controls */}
                    <div className="bg-white border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] rounded-2xl p-6 flex flex-col gap-5">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] flex items-center gap-2">
                            <RefreshCw className="w-5 h-5 stroke-[2.5px]" /> Cache & Pipeline Controls
                        </h3>
                        <p className="text-[#1C1611]/80 font-bold uppercase text-xs">
                            Operational actions for cache management and system verification.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button className="h-12 px-6 bg-[#FF4A3A] text-white border-[3px] border-[#1C1611] font-black uppercase text-sm rounded-xl shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 stroke-[2.5px]" /> Purge Asset Cache
                            </button>
                            <button className="h-12 px-6 bg-[#4DD0B1] text-[#1C1611] border-[3px] border-[#1C1611] font-black uppercase text-sm rounded-xl shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 stroke-[2.5px]" /> Force Route Verification
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}