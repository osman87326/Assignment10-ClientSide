import { BarChart3, Globe, Award } from "lucide-react";

export default function PerformanceCards({ stats = null }) {
  const data = stats || {
    totalEngagement: 0,
    totalLessons: 0,
    publicFootprintPercentage: 0,
    rank: "Novice"
  };

  const STATS_CARDS = [
    {
      title: "Total Engagement",
      metric: data.totalEngagement >= 1000 
        ? `${(data.totalEngagement / 1000).toFixed(1)}k` 
        : String(data.totalEngagement),
      subtext: `Across ${data.totalLessons} lesson${data.totalLessons !== 1 ? "s" : ""}`,
      icon: BarChart3,
      bgClass: "bg-[#4DD0B1]", // Teal
    },
    {
      title: "Public Footprint",
      metric: `${data.publicFootprintPercentage}%`,
      subtext: `${data.publicFootprintPercentage}% of your collection is shared`,
      icon: Globe,
      bgClass: "bg-[#FFB3A7]", // Pink
    },
    {
      title: "Reader Rank",
      metric: data.rank,
      subtext: data.rank === "Stoic Master" 
        ? "You've reached the highest rank! 🏆" 
        : data.rank === "Philosopher"
          ? "Next level: Stoic Master at 5k likes"
          : "Next level: Philosopher at 1k likes",
      icon: Award,
      bgClass: "bg-[#FCD34D]", // Yellow
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
      {STATS_CARDS.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className={`border-[3px] border-[#1C1611] rounded-2xl p-6 flex flex-col items-start justify-between min-h-[140px] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] transition-all duration-100 ${
              card.bgClass
            } ${index === 2 ? "sm:col-span-2 lg:col-span-1" : ""}`}
          >
            <div className="w-full">
              <div className="flex items-center justify-between w-full mb-3 text-[#1C1611]">
                <span className="text-[11px] font-black tracking-wider uppercase text-[#1C1611]/75">
                  {card.title}
                </span>
                <Icon className="w-4 h-4 stroke-[2.5px]" />
              </div>
              <h3 className="tracking-tight text-[#1C1611] font-black text-2xl uppercase">
                {card.metric}
              </h3>
            </div>
            <p className="text-[10px] font-black tracking-wider uppercase text-[#1C1611]/60 mt-4">
              {card.subtext}
            </p>
          </div>
        );
      })}
    </section>
  );
}