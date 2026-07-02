"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GooglyEyes from "./GooglyEyes";

export default function CallToAction() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 w-full bg-[#0d0d0d] text-[#e8e4d9]" ref={ref}>
      <div className="px-6 sm:px-8 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative bg-[#161b12] border-[3px] border-[#c8ff6b33] rounded-3xl p-12 md:p-20 shadow-[8px_8px_0px_0px_#0a0a0a] w-full text-center overflow-visible z-10"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(#c8ff6b 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }}
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
              <Link
                href="/add-lesson"
                className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center px-10 py-5 rounded-full border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#0a0a0a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
              </Link>
              <Link
                href="/pricing"
                className="bg-transparent text-[#e8e4d9] font-bold uppercase text-center px-10 py-5 rounded-full border-[2.5px] border-[#2a2a2a] hover:bg-[#1e1e1e] hover:border-[#444] transition-all duration-100 w-full sm:w-auto"
              >
                View Plans
              </Link>
            </div>
          </div>

          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-[#0d0d0d] px-4 py-1 border-[2.5px] border-[#2a2a2a] rounded-full z-20 flex items-center justify-center shadow-[3px_3px_0px_0px_#0a0a0a]">
            <GooglyEyes className="h-8 w-16" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}