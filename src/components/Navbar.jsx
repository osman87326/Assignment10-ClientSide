"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import GooglyEyes from "./GooglyEyes";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const dashboardHref =
    session?.user?.role === "admin" ? "/admin/dashboard" : "/my-lessons";

  const navLinks = [
    { name: "home", href: "/" },
    { name: "public lessons", href: "/lessons" },
    { name: "add lesson", href: "/add-lesson" },
    { name: "my lessons", href: "/my-lessons" },
    { name: "pricing", href: "/pricing" },
  ];

  const menuVariants = {
    closed: { opacity: 0, y: "-100%", transition: { duration: 0.2, ease: "easeInOut" } },
    open:   { opacity: 1, y: 0,       transition: { duration: 0.3, ease: "easeOut"  } },
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      {/* Main Navbar */}
      <nav className="w-full bg-[#111111] border-b-[2.5px] border-[#2a2a2a]">
        <div className="flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <GooglyEyes className="h-5 w-10" />
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#e8e4d9] lowercase">
              digital life lessons
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-1 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-bold text-xs uppercase tracking-wider px-3 py-2 text-[#666] hover:text-[#e8e4d9] hover:bg-[#1e1e1e] rounded-lg transition-all duration-100"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex gap-3 items-center">
            {isPending ? (
              <>
                <div className="w-16 h-8 bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] animate-pulse" />
                <div className="w-28 h-9 bg-[#1e1e1e] rounded-full border border-[#2a2a2a] animate-pulse" />
              </>
            ) : session?.user ? (
              <Link
                href={dashboardHref}
                className="bg-[#c8ff6b] text-[#1a2200] font-black text-xs uppercase px-5 py-2.5 rounded-full border-[2px] border-[#2a2a2a] shadow-[3px_3px_0px_0px_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
              >
                dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-[#666] font-bold text-xs uppercase px-4 py-2 hover:bg-[#1e1e1e] hover:text-[#e8e4d9] border border-transparent hover:border-[#2a2a2a] rounded-xl transition-all duration-100"
                >
                  login
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#c8ff6b] text-[#1a2200] font-black text-xs uppercase px-5 py-2.5 rounded-full border-[2px] border-[#2a2a2a] shadow-[3px_3px_0px_0px_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                >
                  get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#e8e4d9] border-[2px] border-[#2a2a2a] rounded-lg bg-[#161616] ml-2"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24">
              <motion.path strokeWidth="2.5" strokeLinecap="round"
                d="M 3.75 6.75 L 20.25 6.75"
                animate={isOpen ? { d: "M 4.5 19.5 L 19.5 4.5" } : { d: "M 3.75 6.75 L 20.25 6.75" }}
                transition={{ duration: 0.2 }}
              />
              <motion.path strokeWidth="2.5" strokeLinecap="round"
                d="M 3.75 12 L 20.25 12"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.path strokeWidth="2.5" strokeLinecap="round"
                d="M 3.75 17.25 L 20.25 17.25"
                animate={isOpen ? { d: "M 4.5 4.5 L 19.5 19.5" } : { d: "M 3.75 17.25 L 20.25 17.25" }}
                transition={{ duration: 0.2 }}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Marquee ribbon */}
      <div className="w-full bg-[#0d0d0d] border-b-[2px] border-[#1e1e1e] py-2 overflow-hidden whitespace-nowrap flex select-none z-30">
        <div className="animate-marquee flex items-center gap-12 text-[10px] font-black uppercase tracking-widest">
          {["preserve your wisdom","●","document your blueprint","●","retro-grade layouts","●","honest onboarding","●","share what matters","●",
            "preserve your wisdom","●","document your blueprint","●","retro-grade layouts","●","honest onboarding","●","share what matters","●"].map((item, i) => (
            <span key={i} style={{ color: item === "●" ? "#c8ff6b" : "#333" }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed" animate="open" exit="closed" variants={menuVariants}
            className="fixed inset-0 top-0 w-full h-screen bg-[#0d0d0d] z-40 lg:hidden flex flex-col justify-center px-6 sm:px-12 pt-24 border-b-[3px] border-[#2a2a2a]"
          >
            <div className="flex flex-col gap-4 my-auto max-w-md mx-auto w-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-black uppercase text-[#666] hover:text-[#e8e4d9] transition-colors border-b border-[#1e1e1e] pb-3"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                {session?.user ? (
                  <Link href={dashboardHref} onClick={() => setIsOpen(false)}
                    className="text-center bg-[#c8ff6b] text-[#1a2200] border-[2px] border-[#2a2a2a] py-3 rounded-xl font-black uppercase shadow-[3px_3px_0px_0px_#0a0a0a]"
                  >
                    dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}
                      className="text-center text-[#e8e4d9] border-[2px] border-[#2a2a2a] bg-[#161616] py-3 rounded-xl font-bold uppercase"
                    >
                      login
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}
                      className="text-center bg-[#c8ff6b] text-[#1a2200] border-[2px] border-[#2a2a2a] py-3 rounded-xl font-black uppercase shadow-[3px_3px_0px_0px_#0a0a0a]"
                    >
                      get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}