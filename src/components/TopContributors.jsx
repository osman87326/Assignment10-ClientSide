"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const CONTRIBUTORS_DATA = [
  {
    id: 1,
    name: "Elena Vance",
    lessonsCount: 42,
    verified: true,
    memberSince: "Jan 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
    profileHref: "/contributors/elena-vance",
    bgClass: "bg-[#4DD0B1]", // Teal
  },
  {
    id: 2,
    name: "Marcus Thorne",
    lessonsCount: 38,
    verified: false,
    memberSince: "Mar 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop",
    profileHref: "/contributors/marcus-thorne",
    bgClass: "bg-[#FFB3A7]", // Pink
  },
  {
    id: 3,
    name: "Sarah Chen",
    lessonsCount: 31,
    verified: false,
    memberSince: "Jun 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    profileHref: "/contributors/sarah-chen",
    bgClass: "bg-[#FCD34D]", // Yellow
  },
  {
    id: 4,
    name: "Julian Aris",
    lessonsCount: 27,
    verified: false,
    memberSince: "Sep 2022",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    profileHref: "/contributors/julian-aris",
    bgClass: "bg-[#F6F0DD]", // Warm Cream
  },
];

export default function TopContributors({ contributors = [] }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const displayContributors = contributors.length > 0 ? contributors.map((person, idx) => {
    const bgClasses = ["bg-[#4DD0B1]", "bg-[#FFB3A7]", "bg-[#FCD34D]", "bg-[#F6F0DD]"];
    return {
      id: person._id,
      name: person.name || "Anonymous",
      lessonsCount: person.lessonCount || 0,
      verified: person.verified || false, // Assuming you might add this later
      memberSince: "2024", // Dummy data since backend doesn't return this yet
      avatarUrl: person.photoURL || person.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      profileHref: `/user/${person._id}`,
      bgClass: bgClasses[idx % 4],
    };
  }) : CONTRIBUTORS_DATA;

  return (
    <section className="py-20 w-full relative bg-[#F6F0DD] text-[#1C1611]">
      <div ref={ref} className="px-gutter max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="border-b-[3.5px] border-[#1C1611] pb-6 mb-12"
        >
          <h2 className="font-black text-4xl sm:text-5xl uppercase tracking-tight text-[#1C1611]">
            top contributors
          </h2>
          <p className="text-[#1C1611]/85 font-medium mt-2">
            Meet the top minds crafting verified wisdom blueprints.
          </p>
        </motion.div>

        {/* Scrollable Contributors Row */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex gap-6 overflow-x-auto pb-10 scroll-hide -mx-gutter px-gutter w-full"
        >
          {displayContributors.map((person) => (
            <motion.div key={person.id} variants={fadeInUp} className="flex-shrink-0">
              <Link
                href={person.profileHref}
                className={`flex-shrink-0 w-72 p-5 rounded-2xl flex flex-col gap-4 border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#1C1611] transition-all duration-150 group relative overflow-hidden ${person.bgClass}`}
              >
                {/* Top row: avatar + info */}
                <div className="flex items-center gap-4 relative z-10 text-[#1C1611]">
                  {/* Profile Avatar Container */}
                  <div className="relative">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-[2.5px] border-[#1C1611]">
                      <Image
                        src={person.avatarUrl}
                        alt={person.name}
                        fill
                        sizes="56px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {/* Verified badge */}
                    {person.verified && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF4A3A] rounded-full border-2 border-[#1C1611] flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Check className="w-3 h-3 text-[#1C1611] stroke-[3]" />
                      </motion.div>
                    )}
                    {/* Online indicator */}
                    <div className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#4DD0B1] border-2 border-[#1C1611]" />
                  </div>

                  {/* Contributor Metadata */}
                  <div>
                    <p className="font-black text-lg text-[#1C1611] tracking-tight lowercase">
                      {person.name}
                    </p>
                    <p className="text-xs font-black uppercase text-[#1C1611]/70">
                      {person.lessonsCount} lessons shared
                    </p>
                  </div>
                </div>

                {/* Always-visible info footer inside card */}
                <div className="relative z-10 flex items-center justify-between pt-3 border-t border-[#1C1611]/15 text-xs font-bold text-[#1C1611]/80">
                  <span>Since {person.memberSince}</span>
                  <span className="flex items-center gap-1 text-[#FF4A3A] font-black uppercase tracking-wider">
                    profile
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5px] transition-transform group-hover:translate-x-0.5" />
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