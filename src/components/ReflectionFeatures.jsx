"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const FEATURES_DATA = [
  { id: 1, emoji: "💡", title: "Active Reflection",    description: "Transform passing thoughts into structured insights through guided editorial prompts.", accent: "#c8ff6b" },
  { id: 2, emoji: "📁", title: "Legacy Preservation",  description: "Securely store your life's most valuable lessons in a digital vault designed for longevity.", accent: "#4dd0b1" },
  { id: 3, emoji: "📈", title: "Exponential Growth",   description: "Identify patterns in your decision-making and accelerate your personal evolution.", accent: "#ffd166" },
  { id: 4, emoji: "👥", title: "Curation Community",   description: "Connect with a thoughtful, ambitious audience that values intellectual substance.", accent: "#ffb3a7" },
];

export default function ReflectionFeatures() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-24 relative w-full bg-[#111] text-[#e8e4d9]">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#c8ff6b 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />

      <div ref={ref} className="px-6 sm:px-8 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#e8e4d9] mb-4">
            why reflection matters
          </h2>
          <p className="text-[#c8ff6b] font-bold max-w-xl mx-auto uppercase text-xs tracking-widest">
            bridging deep editorial insight with modern productivity tools.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {FEATURES_DATA.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeInUp}
              className="p-7 rounded-2xl bg-[#161616] border-[2px] border-[#2a2a2a] flex flex-col items-start shadow-[4px_4px_0px_0px_#0a0a0a] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#0a0a0a] transition-all duration-150 group"
            >
              <div
                className="w-12 h-12 border-[2px] border-[#2a2a2a] rounded-xl flex items-center justify-center mb-5 transition-all duration-150"
                style={{ background: item.accent + "15" }}
              >
                <span className="text-2xl select-none">{item.emoji}</span>
              </div>
              <h4 className="font-black text-[#e8e4d9] text-lg mb-3 uppercase tracking-tight group-hover:text-[#c8ff6b] transition-colors">
                {item.title}
              </h4>
              <p className="text-[#555] text-sm font-medium leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}