"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { staggerContainer, fadeInUp, buttonTap } from "@/lib/animations";
import useTiltCard from "@/hooks/useTiltCard";

const LESSONS_DATA = [
  { id: 1, category: "Productivity", readTime: "12 min read", title: "The Art of Deliberate Boredom", description: "How reclaiming our idle time leads to a renaissance of creative breakthroughs.", imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop", href: "/lessons/deliberate-boredom", accent: "#c8ff6b" },
  { id: 2, category: "Leadership", readTime: "8 min read", title: "Leading Without Authority", description: "Understanding the silent influence of integrity in high-stakes environments.", imageUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop", href: "/lessons/leading-without-authority", accent: "#4dd0b1" },
  { id: 3, category: "Philosophy", readTime: "15 min read", title: "The Geometry of Gratitude", description: "A mathematical approach to emotional stability through consistent reflection.", imageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop", href: "/lessons/geometry-of-gratitude", accent: "#ffd166" },
];

function TiltLessonCard({ lesson }) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTiltCard(4);

  return (
    <motion.article
      variants={fadeInUp}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="rounded-2xl overflow-hidden group flex flex-col w-full bg-[#111] border-[2.5px] border-[#2a2a2a] shadow-[6px_6px_0px_0px_#0a0a0a]"
    >
      <div className="overflow-hidden h-48 relative w-full border-b-[2px] border-[#1e1e1e]">
        <Image
          src={lesson.imageUrl} alt={lesson.title} fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-6 flex flex-col flex-1 text-[#e8e4d9]">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-black text-[10px] uppercase tracking-widest px-2.5 py-1 rounded border-[1.5px] border-[#2a2a2a]"
            style={{ background: lesson.accent + "22", color: lesson.accent }}
          >
            {lesson.category}
          </span>
          <span className="text-[#444] text-xs font-bold uppercase">{lesson.readTime}</span>
        </div>

        <h3 className="font-black text-lg mb-3 text-[#e8e4d9] group-hover:text-[#c8ff6b] transition-colors line-clamp-2">
          <Link href={lesson.href}>{lesson.title}</Link>
        </h3>

        <p className="text-[#555] text-sm font-medium line-clamp-3 leading-relaxed mb-6">{lesson.description}</p>

        <div className="mt-auto pt-4 border-t border-[#1e1e1e]">
          <Link href={lesson.href}
            className="font-black uppercase text-xs tracking-wider flex items-center gap-2 text-[#666] group-hover:text-[#c8ff6b] group-hover:translate-x-1 transition-all duration-150"
          >
            <span>read lesson</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturedLessons() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto w-full bg-[#0d0d0d] text-[#e8e4d9]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b-[2.5px] border-[#1e1e1e] pb-6 gap-4"
      >
        <div>
          <h2 className="font-black text-4xl sm:text-5xl tracking-tight uppercase text-[#e8e4d9]">Featured Lessons</h2>
          <p className="text-[#555] mt-2 font-medium">Curated wisdom from our leading contributors.</p>
        </div>
        <motion.div variants={buttonTap} initial="rest" whileHover="hover" whileTap="tap">
          <Link href="/lessons"
            className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center px-6 py-2.5 rounded-full border-[2px] border-[#2a2a2a] shadow-[3px_3px_0px_0px_#0a0a0a] flex items-center gap-2 max-w-max"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
      >
        {LESSONS_DATA.map((lesson) => (
          <TiltLessonCard key={lesson.id} lesson={lesson} />
        ))}
      </motion.div>
    </section>
  );
}