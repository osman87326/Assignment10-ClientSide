import { ArrowUpRight, Globe, AlertCircle, TrendingUp, Users } from "lucide-react";

export default function OverviewMetrics({ stats }) {
    const safeStats = stats || {
        totalUsers: "-",
        publicLessons: "-",
        privateLessons: "-",
        reportedLessons: "-"
    };

    const METRICS = [
        { title: "Total Users", value: safeStats.totalUsers, sub: "Registered Accounts", style: "bg-[#4DD0B1] text-[#1C1611]", icon: Users },
        { title: "Total Public Lessons", value: safeStats.publicLessons, sub: "Global Insight Pool", style: "bg-[#FCD34D] text-[#1C1611]", icon: Globe },
        { title: "Pending Reports", value: safeStats.reportedLessons, sub: "Immediate action required", style: "bg-[#FF4A3A] text-white", icon: AlertCircle },
        { title: "Private Drafts", value: safeStats.privateLessons, sub: "Unpublished Content", style: "bg-white text-[#1C1611]", icon: ArrowUpRight },
    ];

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {METRICS.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div
                        key={index}
                        className={`border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] p-5 flex flex-col justify-between min-h-[140px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1C1611] ${item.style}`}
                    >
                        <div>
                            <span className="text-[10px] font-sans font-black tracking-widest uppercase block mb-2 opacity-80">
                                {item.title}
                            </span>
                            <h3 className="text-4xl font-black tracking-tight leading-none">
                                {item.value}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-bold mt-4 opacity-90">
                            <Icon className="w-4 h-4 shrink-0 stroke-[2.5px]" />
                            <span>{item.sub}</span>
                        </div>
                    </div>
                );
            })}
        </section>
    );
}