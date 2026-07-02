import ModerationFeed from "@/components/Panels/admin/ModerationFeed";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Queue",
};

async function getAdminReports(headersList) {
    try {
        const cookie = headersList.get('cookie') || '';
        const tokenRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, { headers: cookie ? { cookie } : {}, cache: 'no-store' });
        const token = tokenRes.ok ? (await tokenRes.json())?.token : "";
        if (!token) return [];

        const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
        
        const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/admin/reports`, { 
            headers: { "Authorization": `Bearer ${token}` }, 
            cache: 'no-store' 
        });

        const reportsData = res.ok ? await res.json() : null;
        return reportsData?.success ? reportsData.data : [];
    } catch (err) {
        console.error("Error fetching admin reports:", err);
        return [];
    }
}

export default async function FlaggedQueuePage() {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session || session.user.role !== 'admin') {
        redirect("/home");
    }

    const reports = await getAdminReports(headersList);

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none flex flex-col gap-8 font-sans">
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
                
                {/* Page Header */}
                <header className="w-full border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-[10px] font-black tracking-widest text-[#1C1611] uppercase block mb-1">
                        Admin Control Center
                    </span>
                    <h1 className="text-3xl font-black text-[#1C1611] tracking-tight uppercase">
                        Flagged Queue
                    </h1>
                    <p className="text-sm text-[#1C1611]/80 font-bold mt-1.5 max-w-xl leading-relaxed">
                        Real-time stream of reported platform content. Review policy violations and enforce platform safety actions immediately.
                    </p>
                </header>

                <ModerationFeed reports={reports} />

            </div>
        </div>
    );
}