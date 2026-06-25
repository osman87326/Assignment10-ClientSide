"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function LessonsPageHeader() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section className="w-full pt-32 pb-10 px-gutter bg-[#F6F0DD] text-[#1C1611] border-b-[3.5px] border-[#1C1611]">
      <div ref={ref} className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h1 className="font-black text-4xl md:text-5xl uppercase tracking-tight text-[#1C1611] mb-4">
            public lessons archive
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#1C1611]/80 leading-relaxed">
            Explore a curated library of wisdom from thinkers, creators, and
            everyday philosophers. Bridging insight with action.
          </p>
        </motion.div>
      </div>
    </section>
  );
}