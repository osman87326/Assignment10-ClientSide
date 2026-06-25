const SAFETY_COUNTERS = [
    { label: "Pending Review", count: "24 Cases", style: "border-white/10 text-red-300 bg-white/[0.04]" },
    { label: "Critical Priority", count: "08 Cases", style: "border-white/10 text-amber-400 bg-white/[0.04]" },
    { label: "Resolved Today", count: "142 Items", style: "border-white/10 text-purple-300 bg-white/[0.04]" },
];

export default function ContentSafetyCounters() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
            {SAFETY_COUNTERS.map((item, index) => (
                <div
                    key={index}
                    className={`border rounded-2xl p-5 flex flex-col justify-between min-h-[105px] transition-all duration-300 hover:scale-[1.01] ${item.style}`}
                >
                    <span className="text-[10px] font-sans font-bold tracking-wider text-[#c7c4d8]/30 uppercase block">
                        {item.label}
                    </span>
                    <h3 className="text-2xl font-serif font-bold tracking-tight mt-2 text-white">
                        {item.count.split(" ")[0]}
                        <span className="text-sm font-sans font-light text-[#c7c4d8]/40 ml-1.5">{item.count.split(" ")[1]}</span>
                    </h3>
                </div>
            ))}
        </section>
    );
}