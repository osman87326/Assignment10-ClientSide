"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";
import GooglyEyes from "./GooglyEyes";
import PenMascot from "./PenMascot";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  
  const { data: session, isPending } = authClient.useSession();
  const dashboardHref = session?.user?.role === "admin" ? "/admin/dashboard" : "/my-lessons";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };

  const navLinks = [
    { name: "home", href: "/home" },
    { name: "public lessons", href: "/lessons" },
    { name: "add lesson", href: "/add-lesson" },
    { name: "my lessons", href: "/my-lessons" },
    ...(session?.user?.isPremium ? [] : [{ name: "pricing", href: "/pricing" }]),
  ];

  // Variants for the mobile menu container overlay
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <div className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top Navbar Header */}
      <nav className="w-full bg-[#F6F0DD] text-[#1C1611] border-b-[3.5px] border-[#1C1611] transition-all duration-200">
        <div className="flex justify-between items-center h-16 sm:h-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="hover:opacity-95 transition-opacity flex items-center gap-3"
            >
              <PenMascot variant="logo" color="teal" className="scale-[0.8] sm:scale-100 origin-center -my-3" />
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#1C1611] lowercase font-sans">
                digital life lessons
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex gap-6 items-center h-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-sans text-sm font-extrabold tracking-tight py-2 px-3 rounded-md transition-all duration-100 uppercase ${
                    isActive 
                      ? 'text-[#FF4A3A] bg-[#1C1611]/5' 
                      : 'text-[#1C1611] hover:text-[#FF4A3A] hover:bg-[#1C1611]/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Authentication Actions & Mobile Toggle */}
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="hidden md:flex gap-2 sm:gap-4 items-center">
              {isPending ? (
                <div className="flex gap-2 sm:gap-4 items-center">
                  <div className="w-16 h-8 bg-[#1C1611]/10 rounded-xl border-[2px] border-dashed border-[#1C1611]/20 animate-pulse" />
                  <div className="w-28 h-9 bg-[#1C1611]/10 rounded-full border-[2.5px] border-dashed border-[#1C1611]/20 animate-pulse" />
                </div>
              ) : session?.user ? (
                <div className="flex items-center gap-3 relative" ref={dropdownRef}>
                  {session.user.isPremium && (
                    <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#4DD0B1] text-[#1C1611] border-[2.5px] border-[#1C1611] rounded-full shadow-[2px_2px_0px_0px_#1C1611] text-[10px] font-black uppercase tracking-widest" title="Premium Account">
                      <Star className="w-3.5 h-3.5 fill-[#1C1611]" /> Premium
                    </div>
                  )}
                  
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="relative w-10 h-10 rounded-full border-[3px] border-[#1C1611] bg-[#FF4A3A] overflow-hidden shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all focus:outline-none"
                  >
                    {session.user.image ? (
                      <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-lg uppercase">
                        {session.user.name?.charAt(0) || '?'}
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-14 right-0 min-w-[200px] bg-white border-[3px] border-[#1C1611] rounded-xl shadow-[4px_4px_0px_0px_#1C1611] flex flex-col p-2 z-50"
                      >
                        <div className="px-3 py-2 border-b-[2.5px] border-[#1C1611]/10 mb-2">
                           <span className="block text-sm font-black text-[#1C1611] truncate">{session.user.name}</span>
                           <span className="block text-[10px] font-bold text-[#1C1611]/60 truncate uppercase mt-0.5">{session.user.email}</span>
                        </div>
                        
                        <Link
                          href={session.user.role === 'admin' ? '/admin/profile' : '/settings'}
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-3 py-2 text-xs font-black uppercase text-[#1C1611] hover:bg-[#FFB3A7] rounded-lg transition-colors flex items-center gap-2"
                        >
                          Profile
                        </Link>
                        
                        <Link
                          href={dashboardHref}
                          onClick={() => setIsDropdownOpen(false)}
                          className="px-3 py-2 text-xs font-black uppercase text-[#1C1611] hover:bg-[#FCD34D] rounded-lg transition-colors flex items-center gap-2"
                        >
                          Dashboard
                        </Link>
                        
                        <div className="h-[2.5px] w-full bg-[#1C1611]/10 my-1.5" />
                        
                        <button
                          onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                          className="w-full text-left px-3 py-2 text-xs font-black uppercase text-[#FF4A3A] hover:bg-[#FF4A3A]/10 rounded-lg transition-colors"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-[#1C1611] font-extrabold text-sm uppercase px-4 py-2 hover:bg-[#FFB3A7] border-[2.5px] border-transparent hover:border-[#1C1611] rounded-xl transition-all duration-100"
                  >
                    login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#FF4A3A] text-[#1C1611] font-black text-sm uppercase px-5 py-2.5 rounded-full border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 whitespace-nowrap"
                  >
                    get started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-[#1C1611] focus:outline-none z-50 ml-2 border-[2.5px] border-[#1C1611] rounded-lg bg-white/20 active:translate-y-0.5"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24">
                <motion.path
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M 3.75 6.75 L 20.25 6.75"
                  animate={isOpen ? { d: "M 4.5 19.5 L 19.5 4.5" } : { d: "M 3.75 6.75 L 20.25 6.75" }}
                  transition={{ duration: 0.2 }}
                />
                <motion.path
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M 3.75 12 L 20.25 12"
                  initial={{ opacity: 1 }}
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.path
                  strokeWidth="3"
                  strokeLinecap="round"
                  d="M 3.75 17.25 L 20.25 17.25"
                  animate={isOpen ? { d: "M 4.5 4.5 L 19.5 19.5" } : { d: "M 3.75 17.25 L 20.25 17.25" }}
                  transition={{ duration: 0.2 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Infinite Marquee Ribbon */}
      <div className="w-full bg-[#1C1611] text-white py-2 border-b-[3px] border-[#1C1611] overflow-hidden whitespace-nowrap flex select-none relative z-30">
        <div className="animate-marquee flex items-center gap-12 text-xs font-black uppercase tracking-widest">
          {/* Set 1 */}
          <span>preserve your wisdom</span>
          <span className="text-[#FF4A3A]">●</span>
          <span>document your blueprint</span>
          <span className="text-[#FCD34D]">●</span>
          <span>retro-grade layouts</span>
          <span className="text-[#4DD0B1]">●</span>
          <span>honest onboarding</span>
          <span className="text-[#FFB3A7]">●</span>
          <span>share what matters</span>
          <span className="text-[#FF4A3A]">●</span>

          {/* Set 2 */}
          <span>preserve your wisdom</span>
          <span className="text-[#FF4A3A]">●</span>
          <span>document your blueprint</span>
          <span className="text-[#FCD34D]">●</span>
          <span>retro-grade layouts</span>
          <span className="text-[#4DD0B1]">●</span>
          <span>honest onboarding</span>
          <span className="text-[#FFB3A7]">●</span>
          <span>share what matters</span>
          <span className="text-[#FF4A3A]">●</span>
        </div>
      </div>

      {/* Mobile/Tablet Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#F6F0DD] z-40 lg:hidden flex flex-col justify-center px-6 sm:px-12 pt-24 border-b-[4px] border-[#1C1611]"
          >
            <div className="flex flex-col gap-5 my-auto max-w-md mx-auto w-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-2xl font-black uppercase transition-colors border-b-2 pb-2 ${
                      isActive 
                        ? 'text-[#FF4A3A] border-[#FF4A3A]' 
                        : 'text-[#1C1611] hover:text-[#FF4A3A] border-[#1C1611]/20'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-3 mt-6">
                {isPending ? (
                  <div className="flex flex-col gap-3">
                    <div className="w-full h-12 bg-[#1C1611]/10 rounded-xl border-[2.5px] border-dashed border-[#1C1611]/20 animate-pulse" />
                    <div className="w-full h-12 bg-[#1C1611]/10 rounded-xl border-[2.5px] border-dashed border-[#1C1611]/20 animate-pulse" />
                  </div>
                ) : session?.user ? (
                  <>
                    <Link
                      href={session.user.role === 'admin' ? '/admin/profile' : '/settings'}
                      onClick={() => setIsOpen(false)}
                      className="text-center bg-[#FFB3A7] text-[#1C1611] border-[3px] border-[#1C1611] py-3 rounded-xl font-black uppercase shadow-[3px_3px_0px_0px_#1C1611]"
                    >
                      profile
                    </Link>
                    <Link
                      href={dashboardHref}
                      onClick={() => setIsOpen(false)}
                      className="text-center bg-[#FCD34D] text-[#1C1611] border-[3px] border-[#1C1611] py-3 rounded-xl font-black uppercase shadow-[3px_3px_0px_0px_#1C1611]"
                    >
                      dashboard
                    </Link>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="text-center text-[#1C1611] border-[3px] border-[#1C1611] bg-white py-3 rounded-xl font-bold uppercase shadow-[3px_3px_0px_0px_#1C1611]"
                    >
                      logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center text-[#1C1611] border-[3px] border-[#1C1611] bg-white py-3 rounded-xl font-bold uppercase shadow-[3px_3px_0px_0px_#1C1611]"
                    >
                      login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="text-center bg-[#FF4A3A] text-[#1C1611] border-[3px] border-[#1C1611] py-3 rounded-xl font-black uppercase shadow-[3px_3px_0px_0px_#1C1611]"
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