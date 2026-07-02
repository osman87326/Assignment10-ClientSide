import OverviewMetrics from "@/components/Panels/admin/OverviewMetrics";
import PlatformHealthChart from "@/components/Panels/admin/PlatformHealthChart";
import ModerationFeed from "@/components/Panels/admin/ModerationFeed";
import SystemEventsLog from "@/components/Panels/admin/SystemEventsLog";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Dashboard",
};

async function getAdminData(headersList) {
    try {
        const cookie = headersList.get('cookie') || '';
        const tokenRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, { headers: cookie ? { cookie } : {}, cache: 'no-store' });
        const token = tokenRes.ok ? (await tokenRes.json())?.token : "";
        if (!token) return { stats: null, reports: [], analytics: [] };

        const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
        
        const [statsRes, reportsRes, analyticsRes] = await Promise.all([
            fetch(`${serverUrl}/api/admin/stats`, { headers: { "Authorization": `Bearer ${token}` }, cache: 'no-store' }),
            fetch(`${serverUrl}/api/admin/reports`, { headers: { "Authorization": `Bearer ${token}` }, cache: 'no-store' }),
            fetch(`${serverUrl}/api/admin/analytics`, { headers: { "Authorization": `Bearer ${token}` }, cache: 'no-store' })
        ]);

        const statsData = statsRes.ok ? await statsRes.json() : null;
        const reportsData = reportsRes.ok ? await reportsRes.json() : null;
        const analyticsData = analyticsRes.ok ? await analyticsRes.json() : null;

        return {
            stats: statsData?.success ? statsData.stats : null,
            reports: reportsData?.success ? reportsData.data : [],
            analytics: analyticsData?.success ? analyticsData.data : []
        };
    } catch (err) {
        console.error("Error fetching admin data:", err);
        return { stats: null, reports: [] };
    }
}

export default async function AdminDashboardPage() {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session || session.user.role !== 'admin') {
        redirect("/home");
    }

    const { stats, reports, analytics } = await getAdminData(headersList);
    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none flex flex-col gap-8 font-sans">
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">

                {/* Global Admin Header Nav Area */}
                <header className="flex flex-row items-center justify-between gap-4 border-b-[3.5px] border-[#1C1611] pb-6">
                    <div>
                        <span className="text-xs font-black tracking-widest text-[#1C1611] uppercase block mb-1">
                            Admin Control Center
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black text-[#1C1611] tracking-tight uppercase">
                            Command Center Overview
                        </h1>
                        <p className="text-sm text-[#1C1611]/80 font-bold mt-1 hidden sm:block">
                            Real-time oversight of global editorial growth and moderation priority.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <div className="flex flex-col items-end text-right hidden sm:flex">
                            <span className="text-sm font-black text-[#1C1611] uppercase leading-none">{session.user.name}</span>
                            <span className="text-[11px] font-bold text-[#FF4A3A] uppercase mt-1">Lead Editor</span>
                        </div>
                        <div className="w-10 h-10 rounded-xl border-[2.5px] border-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] relative overflow-hidden bg-[#FCD34D]">
                            {session.user.image ? (
                                <Image
                                    src={session.user.image}
                                    alt="Admin avatar"
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#1C1611] font-black text-lg uppercase">
                                    {session.user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Overview Metric Row */}
                <OverviewMetrics stats={stats} />

                {/* Main Analytics Visualization Section */}
                <PlatformHealthChart analytics={analytics} />

                {/* Bottom Split Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full min-w-0">
                    <div className="lg:col-span-2 min-w-0 w-full">
                        <ModerationFeed reports={reports} />
                    </div>
                    <div className="w-full">
                        <SystemEventsLog />
                    </div>
                </div>

            </div>
        </div>
    );
}