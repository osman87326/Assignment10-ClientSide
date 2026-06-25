"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const FEATURES_DATA = [
  {
    id: 1,
    emoji: "💡",
    title: "Active Reflection",
    description:
      "Transform passing thoughts into structured insights through guided editorial prompts.",
  },
  {
    id: 2,
    emoji: "📁",
    title: "Legacy Preservation",
    description:
      "Securely store your life's most valuable lessons in a digital vault designed for longevity.",
  },
  {
    id: 3,
    emoji: "📈",
    title: "Exponential Growth",
    description:
      "Identify patterns in your decision-making and accelerate your personal evolution.",
  },
  {
    id: 4,
    emoji: "👥",
    title: "Curation Community",
    description:
      "Connect with a thoughtful, ambitious audience that values intellectual substance.",
  },
];

export default function ReflectionFeatures() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  return (
    <section className="py-24 relative w-full bg-[#1C1611] text-white">
      {/* Blueprint Dot Matrix overlay (very subtle white dots) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
        aria-hidden="true"
      />

      <div ref={ref} className="px-gutter max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight text-white mb-4">
            why reflection matters
          </h2>
          <p className="text-[#FCD34D] font-bold max-w-xl mx-auto uppercase text-sm tracking-wide">
            bridging deep editorial insight with modern productivity tools.
          </p>
        </motion.div>

        {/* 4-Column Grid with outline cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {FEATURES_DATA.map((item) => {
            return (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-transparent border-2 border-white/30 flex flex-col items-start text-left relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,0.25)] hover:border-white/60 transition-all duration-150"
              >
                {/* Emoji Icon Box */}
                <div className="w-14 h-14 bg-white/5 border-2 border-white/30 rounded-xl flex items-center justify-center mb-6">
                  <span className="text-3xl select-none">{item.emoji}</span>
                </div>

                {/* Feature Title */}
                <h4 className="font-black text-white text-xl mb-3 uppercase tracking-tight">
                  {item.title}
                </h4>

                {/* Feature Description */}
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}