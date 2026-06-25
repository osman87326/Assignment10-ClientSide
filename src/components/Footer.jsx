"use client";

import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import GooglyEyes from "./GooglyEyes";

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="relative bg-[#F6F0DD] border-t-[3.5px] border-[#1C1611] w-full py-16 text-[#1C1611] overflow-hidden">
      
      {/* Blueprint Dot Matrix subtle texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1611 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px"
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-gutter w-full relative z-10"
      >
        {/* Main Footer Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">
          
          {/* Column 1: Branding & Description */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 flex flex-col items-start">
            <Link
              href="/"
              className="hover:opacity-95 transition-opacity flex items-center gap-2.5 mb-6"
            >
              <GooglyEyes className="h-5 w-10" />
              <span className="font-extrabold text-2xl tracking-tight text-[#1C1611] lowercase font-sans">
                digital life lessons
              </span>
            </Link>
            <p className="text-[#1C1611]/80 text-sm font-medium leading-relaxed mb-6">
              Bridging deep editorial insight with modern productivity tools. Your
              wisdom, preserved forever.
            </p>
            {/* Social Icons Row */}
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#1C1611] bg-white flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] transition-all"
                aria-label="Website"
              >
                <Globe className="w-5 h-5 stroke-[2px]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border-2 border-[#1C1611] bg-white flex items-center justify-center text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] transition-all"
                aria-label="Contact Email"
              >
                <Mail className="w-5 h-5 stroke-[2px]" />
              </a>
            </div>
          </motion.div>

          {/* Columns 2 & 3: Platform and Resources */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 gap-8 lg:col-span-1"
          >
            <div>
              <h5 className="font-black text-sm uppercase tracking-wider text-[#1C1611] mb-6">Platform</h5>
              <ul className="space-y-3">
                {["Vision", "X / Twitter", "LinkedIn"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm font-bold text-[#1C1611]/80 hover:text-[#FF4A3A] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-black text-sm uppercase tracking-wider text-[#1C1611] mb-6">Resources</h5>
              <ul className="space-y-3">
                {["Support", "Terms", "Privacy"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm font-bold text-[#1C1611]/80 hover:text-[#FF4A3A] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 4: Newsletter Subscription Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#4DD0B1] border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611]">
              <h5 className="font-black text-lg uppercase tracking-tight text-[#1C1611] mb-2">
                Subscribe to our Reader
              </h5>
              <p className="text-sm font-bold text-[#1C1611]/80 mb-6">
                Weekly editorial highlights delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full"
              >
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="bg-[#F6F0DD] border-[2.5px] border-[#1C1611] rounded-xl px-4 py-3 flex-grow text-sm text-[#1C1611] placeholder-[#1C1611]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#FF4A3A] text-[#1C1611] font-black uppercase px-6 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 shrink-0 text-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Footer Sub-row Info - Cleanly anchored over a final horizontal dashed line */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 pt-8 border-t-[3px] border-dashed border-[#1C1611] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase text-[#1C1611]/70"
        >
          <p>© 2024 Digital Life Lessons. All rights reserved.</p>
          <div className="flex gap-8">
            {["Cookie Policy", "Accessibility", "Status"].map((item) => (
              <Link
                key={item}
                href="#"
                className="hover:text-[#FF4A3A] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}