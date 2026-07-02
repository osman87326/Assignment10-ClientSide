"use client";

import Link from "next/link";
import { Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import GooglyEyes from "./GooglyEyes";

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer className="relative bg-[#0d0d0d] border-t-[2.5px] border-[#1e1e1e] w-full py-16 text-[#e8e4d9] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(#c8ff6b 1.5px, transparent 1.5px)", backgroundSize: "20px 20px" }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-6 sm:px-8 w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">

          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-1 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-6 hover:opacity-90 transition-opacity">
              <GooglyEyes className="h-5 w-10" />
              <span className="font-extrabold text-xl tracking-tight text-[#e8e4d9] lowercase">
                digital life lessons
              </span>
            </Link>
            <p className="text-[#555] text-sm font-medium leading-relaxed mb-6">
              Bridging deep editorial insight with modern productivity tools.
              Your wisdom, preserved forever.
            </p>
            <div className="flex gap-3">
              {[Globe, Mail].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full border-[2px] border-[#2a2a2a] bg-[#161616] flex items-center justify-center text-[#666] hover:text-[#c8ff6b] hover:border-[#c8ff6b] transition-all"
                >
                  <Icon className="w-4 h-4 stroke-[2px]" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-8 lg:col-span-1">
            <div>
              <h5 className="font-black text-xs uppercase tracking-wider text-[#444] mb-5">Platform</h5>
              <ul className="space-y-3">
                {["Vision", "X / Twitter", "LinkedIn"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm font-medium text-[#555] hover:text-[#c8ff6b] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-black text-xs uppercase tracking-wider text-[#444] mb-5">Resources</h5>
              <ul className="space-y-3">
                {["Support", "Terms", "Privacy"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm font-medium text-[#555] hover:text-[#c8ff6b] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161616] border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a]">
              <h5 className="font-black text-lg uppercase tracking-tight text-[#e8e4d9] mb-2">
                Subscribe to our Reader
              </h5>
              <p className="text-sm font-medium text-[#555] mb-6">
                Weekly editorial highlights delivered to your inbox.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="flex-grow text-sm"
                />
                <button
                  type="submit"
                  className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase px-6 py-3 rounded-xl border-[2px] border-[#2a2a2a] shadow-[3px_3px_0px_0px_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 shrink-0 text-sm cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 pt-8 border-t-[2px] border-dashed border-[#1e1e1e] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold uppercase text-[#333]"
        >
          <p>© 2024 Digital Life Lessons. All rights reserved.</p>
          <div className="flex gap-8">
            {["Cookie Policy", "Accessibility", "Status"].map((item) => (
              <Link key={item} href="#" className="hover:text-[#c8ff6b] transition-colors">{item}</Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}