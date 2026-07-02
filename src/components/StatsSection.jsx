"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import CountUp from "react-countup";
import { staggerContainer, scaleIn } from "@/lib/animations";

const STATS = [
  { value: 50,  suffix: "K+", label: "lessons shared"   },
  { value: 120, suffix: "+",  label: "contributors"      },
  { value: 1,   suffix: "M+", label: "wisdom readers"    },
  { value: 85,  suffix: "+",  label: "countries reached" },
];

const easeOutExpo = (t, b, c, d) =>
  t === d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative py-12 w-full bg-[#0d0d0d] text-[#e8e4d9] overflow-hidden">
      <motion.div
        ref={ref}
        style={{ y }}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 px-6 sm:px-8 max-w-7xl mx-auto w-full"
      >
        <div className="bg-[#161616] border-[2.5px] border-[#2a2a2a] rounded-2xl p-8 md:p-12 shadow-[6px_6px_0px_0px_#0a0a0a]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ scale: 1.06 }}
                className="text-center flex flex-col items-center cursor-default"
              >
                <div className="text-4xl md:text-5xl font-black text-[#c8ff6b] tracking-tight uppercase mb-1">
                  {inView ? (
                    <CountUp start={0} end={stat.value} duration={2} suffix={stat.suffix} easingFn={easeOutExpo} />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>
                <p className="text-[#444] text-xs font-black uppercase tracking-wider">{stat.label}</p>
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={inView ? { scale: 1, rotate: 45 } : {}}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="mt-4 w-3 h-3 bg-[#c8ff6b] border border-[#0d0d0d]"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}