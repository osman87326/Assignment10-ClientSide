"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const CONTRIBUTORS_DATA = [
  { id: 1, name: "Elena Vance",  lessonsCount: 42, verified: true,  memberSince: "Jan 2022", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop", profileHref: "/contributors/elena-vance",  accent: "#c8ff6b" },
  { id: 2, name: "Marcus Thorne",lessonsCount: 38, verified: false, memberSince: "Mar 2022", avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop", profileHref: "/contributors/marcus-thorne", accent: "#4dd0b1" },
  { id: 3, name: "Sarah Chen",   lessonsCount: 31, verified: false, memberSince: "Jun 2022", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop", profileHref: "/contributors/sarah-chen",   accent: "#ffd166" },
  { id: 4, name: "Julian Aris",  lessonsCount: 27, verified: false, memberSince: "Sep 2022", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop", profileHref: "/contributors/julian-aris",  accent: "#ffb3a7" },
];

export default function TopContributors() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-20 w-full bg-[#0d0d0d] text-[#e8e4d9]">
      <div ref={ref} className="px-6 sm:px-8 max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="border-b-[2.5px] border-[#1e1e1e] pb-6 mb-12"
        >
          <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight">top contributors</h2>
          <p className="text-[#555] font-medium mt-2">Meet the top minds crafting verified wisdom blueprints.</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex gap-6 overflow-x-auto pb-8 scroll-hide -mx-6 sm:-mx-8 px-6 sm:px-8"
        >
          {CONTRIBUTORS_DATA.map((person) => (
            <motion.div key={person.id} variants={fadeInUp} className="flex-shrink-0">
              <Link
                href={person.profileHref}
                className="flex-shrink-0 w-64 p-5 rounded-2xl flex flex-col gap-4 bg-[#111] border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#0a0a0a] transition-all duration-150 group"
                style={{ '--accent': person.accent }}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-[2px] border-[#2a2a2a]">
                      <Image src={person.avatarUrl} alt={person.name} fill sizes="48px" className="object-cover" loading="lazy" />
                    </div>
                    {person.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-[1.5px] border-[#2a2a2a] flex items-center justify-center" style={{ background: person.accent }}>
                        <Check className="w-2.5 h-2.5 stroke-[3]" style={{ color: "#1a2200" }} />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-black text-base text-[#e8e4d9] group-hover:text-[#c8ff6b] transition-colors lowercase">{person.name}</p>
                    <p className="text-xs font-bold uppercase text-[#444]">{person.lessonsCount} lessons</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#1e1e1e] text-xs font-bold text-[#444]">
                  <span>Since {person.memberSince}</span>
                  <span className="flex items-center gap-1 font-black uppercase tracking-wider group-hover:translate-x-1 transition-transform" style={{ color: person.accent }}>
                    profile <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}