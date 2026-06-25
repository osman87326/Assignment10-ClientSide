"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import GooglyEyes from "./GooglyEyes";

export default function CallToAction() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="py-24 w-full bg-[#F6F0DD] text-[#1C1611]" ref={ref}>
      <div className="px-gutter max-w-7xl mx-auto w-full relative overflow-visible">
        {/* Yellow Bounding Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative bg-[#FCD34D] border-[4px] border-[#1C1611] rounded-3xl p-12 md:p-20 shadow-[8px_8px_0px_0px_#1C1611] w-full text-center overflow-visible z-10"
        >
          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
            
            <h2 className="font-black text-4xl md:text-5xl text-[#1C1611] mb-6 uppercase tracking-tight leading-[1.1]">
              Ready to document your journey?
            </h2>
            
            <p className="text-[#1C1611]/85 text-lg font-bold mb-10 max-w-xl mx-auto">
              Join thousands of thinkers, leaders, and creators who are building
              a collective repository of human wisdom.
            </p>

            {/* Action Buttons Column / Row */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
              
              {/* Primary Action Button (Red Capsule) */}
              <Link
                href="/add-lesson"
                className="bg-[#FF4A3A] text-[#1C1611] font-black uppercase text-center px-10 py-5 rounded-full border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
              </Link>
              
              {/* Secondary Action Button (Transparent Capsule) */}
              <Link
                href="/pricing"
                className="bg-transparent text-[#1C1611] font-extrabold uppercase text-center px-10 py-5 rounded-full border-[3px] border-[#1C1611] hover:bg-[#1C1611]/5 transition-all duration-100 w-full sm:w-auto"
              >
                View Plans
              </Link>

            </div>

          </div>

          {/* Cartoon Eye Graphics peeking out from behind the bottom border */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#F6F0DD] px-4 py-1 border-[3.5px] border-[#1C1611] rounded-full z-20 flex items-center justify-center shadow-[3px_3px_0px_0px_#1C1611]">
            <GooglyEyes className="h-10 w-20" />
          </div>

        </motion.div>
      </div>
    </section>
  );
} 