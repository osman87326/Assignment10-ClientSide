"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import GooglyEyes from "./GooglyEyes";
import { textContainer, textWord, buttonTap } from "@/lib/animations";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "premium wisdom edition",
    emoji: "🎯",
    title: "preserve your",
    keyword: "wisdom",
    description:
      "Your experiences are the blueprints for the next generation. Document, reflect, and share the lessons that truly matter in a space designed for depth.",
    primaryCta: { text: "start writing", href: "/add-lesson" },
    secondaryCta: { text: "explore archives", href: "/lessons" },
  },
  {
    id: 2,
    badge: "secure digital archives",
    emoji: "📁",
    title: "curate your own",
    keyword: "legacy",
    description:
      "Build an organized collection of insights and personal milestones. Securely store your life's most valuable lessons in a digital vault.",
    primaryCta: { text: "create vault", href: "/add-lesson" },
    secondaryCta: { text: "view showcase", href: "/lessons" },
  },
  {
    id: 3,
    badge: "collaborative insights",
    emoji: "🤝",
    title: "pass down key",
    keyword: "lessons",
    description:
      "Connect with readers looking for depth over noise. Identify patterns in your decision-making and accelerate your personal evolution.",
    primaryCta: { text: "join circle", href: "/add-lesson" },
    secondaryCta: { text: "read letters", href: "/lessons" },
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = HERO_SLIDES[currentSlide];
  const words = slide.description.split(" ");

  const handleNext = () => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length);
  const handlePrev = () => setCurrentSlide((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative min-h-screen w-full flex items-center bg-[#0d0d0d] dot-grid text-[#e8e4d9] pt-32 sm:pt-36 pb-16 overflow-hidden border-b-[2.5px] border-[#1e1e1e]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">

          {/* Badge — fade + rise, keyed to slide so it re-animates on change */}
          <motion.div
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2"
          >
            <span className="font-handwritten text-xl sm:text-2xl text-[#c8ff6b] font-bold">
              {slide.emoji} {slide.badge}
            </span>
          </motion.div>

          {/* Headline — springy scale/opacity swap per slide */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
            className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-[#e8e4d9] uppercase"
          >
            {slide.title}
            <span className="text-[#c8ff6b] wavy-underline block mt-2">
              {slide.keyword}
            </span>
          </motion.h1>

          {/* Description — word-by-word reveal */}
          <motion.p
            key={`desc-${slide.id}`}
            variants={textContainer}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-[#666] leading-relaxed max-w-xl font-medium flex flex-wrap"
          >
            {words.map((word, i) => (
              <motion.span key={i} variants={textWord} className="mr-[0.3em]">
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* CTAs — magnetic hover/tap */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.div variants={buttonTap} initial="rest" whileHover="hover" whileTap="tap">
              <Link
                href={slide.primaryCta.href}
                className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center px-8 py-4 rounded-full border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] flex items-center justify-center gap-2"
              >
                <span>{slide.primaryCta.text}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
              </Link>
            </motion.div>

            <motion.div variants={buttonTap} initial="rest" whileHover="hover" whileTap="tap">
              <Link
                href={slide.secondaryCta.href}
                className="bg-transparent text-[#e8e4d9] font-bold uppercase text-center px-8 py-4 rounded-full border-[2.5px] border-[#2a2a2a] flex items-center justify-center gap-2"
              >
                {slide.secondaryCta.text}
              </Link>
            </motion.div>
          </div>

          {/* Carousel dots — spring width morph */}
          <div className="flex items-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border-[2px] border-[#2a2a2a] bg-[#161616] text-[#e8e4d9] flex items-center justify-center"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
            </motion.button>

            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="h-3 rounded-full border-[2px] border-[#2a2a2a] bg-[#1e1e1e]"
                  animate={{
                    width: idx === currentSlide ? 28 : 12,
                    backgroundColor: idx === currentSlide ? "#c8ff6b" : "#1e1e1e",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="w-11 h-11 rounded-full border-[2px] border-[#2a2a2a] bg-[#161616] text-[#e8e4d9] flex items-center justify-center"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
            </motion.button>
          </div>
        </div>

        {/* Right column — dashboard mockup with floating cards */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
            className="w-full max-w-[420px] bg-[#111] border-[2.5px] border-[#2a2a2a] rounded-2xl p-6 shadow-[8px_8px_0px_0px_#0a0a0a] relative min-h-[440px] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b-[2px] border-[#1e1e1e] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5c47] border border-[#2a2a2a]" />
                <div className="w-3 h-3 rounded-full bg-[#ffd166] border border-[#2a2a2a]" />
                <div className="w-3 h-3 rounded-full bg-[#c8ff6b] border border-[#2a2a2a]" />
              </div>
              <span className="font-bold text-[10px] tracking-wider uppercase text-[#333]">wisdom ledger v1.0</span>
              <GooglyEyes className="h-4 w-8" />
            </div>

            <div className="flex-1 flex flex-col justify-start py-2 space-y-4">
              {[
                { label: "mindset pivot", emoji: "⚡", accent: "#c8ff6b", text: `"The best way to predict the future is to document your past decision-making matrix."`, bg: "#1e1e1e", border: "#2a2a2a", rotate: -1.5 },
                { label: "career lesson", emoji: "🔑", accent: "#c8ff6b", text: "Left my high-paying corporate tech job to pursue independent builder paths. Score: 10/10.", bg: "#161b12", border: "#c8ff6b33", rotate: 1.5 },
                { label: "daily axiom", emoji: "💡", accent: "#ffd166", text: `"Never make long-term decisions on temporary, short-term emotions."`, bg: "#1e1e1e", border: "#ffd16633", rotate: -1 },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: card.rotate }}
                  transition={{ delay: 0.4 + i * 0.15, type: "spring", stiffness: 150, damping: 16 }}
                  whileHover={{ rotate: 0, scale: 1.02 }}
                  style={{ background: card.bg, borderColor: card.border }}
                  className="border-[2px] rounded-xl p-4 shadow-[3px_3px_0px_0px_#0a0a0a] transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[10px] uppercase tracking-wider" style={{ color: card.accent }}>
                      {card.label}
                    </span>
                    <span className="text-xs">{card.emoji}</span>
                  </div>
                  <p className="text-xs font-medium leading-relaxed text-[#888]">{card.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t-[2px] border-[#1e1e1e] flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase text-[#333]">system integrity</span>
              <motion.span
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-black text-[10px] text-[#c8ff6b]"
              >
                100% OPERATIONAL
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}