"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const STATS = [
  { value: 50, suffix: "K+", label: "lessons shared" },
  { value: 120, suffix: "+", label: "contributors" },
  { value: 1, suffix: "M+", label: "wisdom readers" },
  { value: 85, suffix: "+", label: "countries reached" },
];

const easeOutExpo = (t, b, c, d) => {
  return t === d
    ? b + c
    : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
};

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="relative py-12 w-full bg-[#F6F0DD] text-[#1C1611]">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 px-gutter max-w-7xl mx-auto w-full"
      >
        {/* Main Neo-Brutalist Container */}
        <div className="bg-[#FFB3A7] border-[3.5px] border-[#1C1611] rounded-2xl p-8 md:p-12 shadow-[6px_6px_0px_0px_#1C1611]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="text-center flex flex-col items-center justify-center"
              >
                {/* Stats Number */}
                <div className="text-4xl md:text-5xl font-black text-[#1C1611] tracking-tight uppercase mb-1">
                  {inView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      separator=","
                      suffix={stat.suffix}
                      easingFn={easeOutExpo}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <p className="text-[#1C1611] text-xs font-black uppercase tracking-wider">
                  {stat.label}
                </p>

                {/* Playful diamond divider instead of a subtle gradient line */}
                <div className="mt-4 w-3.5 h-3.5 bg-[#1C1611] rotate-45 border border-[#FFB3A7]" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}