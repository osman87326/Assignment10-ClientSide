"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GooglyEyes from "./GooglyEyes";
import { buttonTap } from "@/lib/animations";

export default function CallToAction() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 w-full bg-[#0d0d0d] text-[#e8e4d9]" ref={ref}>
      <div className="px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 100, damping: 16 }}
          className="relative bg-[#161b12] border-[3px] border-[#c8ff6b33] rounded-3xl p-12 md:p-20 shadow-[8px_8px_0px_0px_#0a0a0a] w-full text-center overflow-visible z-10"
        >
          {/* Breathing ambient glow */}
          <motion.div
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 30%, #c8ff6b22, transparent 70%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto">
            <h2 className="font-black text-4xl md:text-5xl text-[#e8e4d9] mb-6 uppercase tracking-tight leading-[1.1]">
              Ready to document <span className="text-[#c8ff6b]">your journey?</span>
            </h2>
            <p className="text-[#666] text-lg font-medium mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of thinkers, leaders, and creators building a collective repository of human wisdom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              <motion.div variants={buttonTap} initial="rest" whileHover="hover" whileTap="tap">
                <Link
                  href="/add-lesson"
                  className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center px-10 py-5 rounded-full border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
                </Link>
              </motion.div>
              <motion.div variants={buttonTap} initial="rest" whileHover="hover" whileTap="tap">
                <Link
                  href="/pricing"
                  className="bg-transparent text-[#e8e4d9] font-bold uppercase text-center px-10 py-5 rounded-full border-[2.5px] border-[#2a2a2a] w-full sm:w-auto block"
                >
                  View Plans
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#0d0d0d] px-4 py-1 border-[2.5px] border-[#2a2a2a] rounded-full z-20 flex items-center justify-center shadow-[3px_3px_0px_0px_#0a0a0a]"
          >
            <GooglyEyes className="h-8 w-16" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}