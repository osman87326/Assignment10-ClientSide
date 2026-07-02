"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import GooglyEyes from "./GooglyEyes";

const HERO_SLIDES = [
  {
    id: 1,
    badge: "premium wisdom edition",
    emoji: "🎯",
    title: "preserve your",
    keyword: "wisdom",
    description: "Your experiences are the blueprints for the next generation. Document, reflect, and share the lessons that truly matter in a space designed for depth.",
    primaryCta:   { text: "start writing",    href: "/add-lesson" },
    secondaryCta: { text: "explore archives", href: "/lessons"    },
  },
  {
    id: 2,
    badge: "secure digital archives",
    emoji: "📁",
    title: "curate your own",
    keyword: "legacy",
    description: "Build an organized collection of insights and personal milestones. Securely store your life's most valuable lessons in a digital vault.",
    primaryCta:   { text: "create vault",   href: "/add-lesson" },
    secondaryCta: { text: "view showcase",  href: "/lessons"    },
  },
  {
    id: 3,
    badge: "collaborative insights",
    emoji: "🤝",
    title: "pass down key",
    keyword: "lessons",
    description: "Connect with readers looking for depth over noise. Identify patterns in your decision-making and accelerate your personal evolution.",
    primaryCta:   { text: "join circle",  href: "/add-lesson" },
    secondaryCta: { text: "read letters", href: "/lessons"    },
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [typedKeyword, setTypedKeyword] = useState("");

  const slide = HERO_SLIDES[currentSlide];

  useEffect(() => {
    let active = true;
    let currentText = "";
    let i = 0;
    const target = slide.keyword;
    const t = setTimeout(() => {
      if (!active) return;
      setTypedKeyword("");
      const typeChar = () => {
        if (!active) return;
        if (i < target.length) {
          currentText += target[i];
          setTypedKeyword(currentText);
          i++;
          setTimeout(typeChar, 65 + Math.random() * 75);
        }
      };
      typeChar();
    }, 150);
    return () => { active = false; clearTimeout(t); };
  }, [slide.keyword]);

  const handleNext = () => setCurrentSlide((p) => (p + 1) % HERO_SLIDES.length);
  const handlePrev = () => setCurrentSlide((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative min-h-screen w-full flex items-center bg-[#0d0d0d] dot-grid text-[#e8e4d9] pt-32 sm:pt-36 pb-16 overflow-hidden border-b-[2.5px] border-[#1e1e1e]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Left column */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <div className="flex items-center gap-2">
            <span className="font-handwritten text-xl sm:text-2xl text-[#c8ff6b] font-bold">
              {slide.emoji} {slide.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-[#e8e4d9] uppercase">
            {slide.title}
            <span className="text-[#c8ff6b] wavy-underline block mt-2">
              {typedKeyword}
              <span className="inline-block animate-pulse ml-1 text-[#c8ff6b]">|</span>
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#666] leading-relaxed max-w-xl font-medium">
            {slide.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={slide.primaryCta.href}
              className="bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center px-8 py-4 rounded-full border-[2.5px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#0a0a0a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all duration-100 flex items-center justify-center gap-2"
            >
              <span>{slide.primaryCta.text}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="bg-transparent text-[#e8e4d9] font-bold uppercase text-center px-8 py-4 rounded-full border-[2.5px] border-[#2a2a2a] hover:bg-[#161616] hover:border-[#444] transition-all duration-100 flex items-center justify-center gap-2"
            >
              {slide.secondaryCta.text}
            </Link>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-4 pt-4">
            <button onClick={handlePrev}
              className="w-11 h-11 rounded-full border-[2px] border-[#2a2a2a] bg-[#161616] text-[#e8e4d9] hover:bg-[#1e1e1e] hover:border-[#444] flex items-center justify-center transition-all duration-100"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`rounded-full border-[2px] border-[#2a2a2a] transition-all duration-150 ${
                    idx === currentSlide
                      ? "bg-[#c8ff6b] w-4 h-4"
                      : "bg-[#1e1e1e] w-3 h-3"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button onClick={handleNext}
              className="w-11 h-11 rounded-full border-[2px] border-[#2a2a2a] bg-[#161616] text-[#e8e4d9] hover:bg-[#1e1e1e] hover:border-[#444] flex items-center justify-center transition-all duration-100"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          </div>
        </div>

        {/* Right column — dashboard mockup */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          <div className="w-full max-w-[420px] bg-[#111] border-[2.5px] border-[#2a2a2a] rounded-2xl p-6 shadow-[8px_8px_0px_0px_#0a0a0a] relative min-h-[440px] flex flex-col justify-between overflow-visible">

            {/* Header */}
            <div className="flex items-center justify-between border-b-[2px] border-[#1e1e1e] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5c47] border border-[#2a2a2a]" />
                <div className="w-3 h-3 rounded-full bg-[#ffd166] border border-[#2a2a2a]" />
                <div className="w-3 h-3 rounded-full bg-[#c8ff6b] border border-[#2a2a2a]" />
              </div>
              <span className="font-bold text-[10px] tracking-wider uppercase text-[#333]">wisdom ledger v1.0</span>
              <GooglyEyes className="h-4 w-8" />
            </div>

            {/* Cards */}
            <div className="flex-1 flex flex-col justify-start py-2 space-y-4">
              <div className="bg-[#1e1e1e] border-[2px] border-[#2a2a2a] rounded-xl p-4 shadow-[3px_3px_0px_0px_#0a0a0a] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[10px] uppercase text-[#c8ff6b] tracking-wider">mindset pivot</span>
                  <span className="text-xs">⚡</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-[#888]">
                  &ldquo;The best way to predict the future is to document your past decision-making matrix.&rdquo;
                </p>
              </div>

              <div className="bg-[#161b12] border-[2px] border-[#c8ff6b33] rounded-xl p-4 shadow-[3px_3px_0px_0px_#0a0a0a] rotate-[1.5deg] hover:rotate-0 transition-transform duration-200 translate-x-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[10px] uppercase text-[#c8ff6b] tracking-wider">career lesson</span>
                  <span className="text-xs">🔑</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-[#888]">
                  Left my high-paying corporate tech job to pursue independent builder paths. Score: 10/10.
                </p>
              </div>

              <div className="bg-[#1e1e1e] border-[2px] border-[#ffd16633] rounded-xl p-4 shadow-[3px_3px_0px_0px_#0a0a0a] rotate-[-1deg] hover:rotate-0 transition-transform duration-200 -translate-x-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[10px] uppercase text-[#ffd166] tracking-wider">daily axiom</span>
                  <span className="text-xs">💡</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-[#888]">
                  &ldquo;Never make long-term decisions on temporary, short-term emotions.&rdquo;
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t-[2px] border-[#1e1e1e] flex items-center justify-between">
              <span className="font-bold text-[10px] uppercase text-[#333]">system integrity</span>
              <span className="font-black text-[10px] text-[#c8ff6b] animate-pulse">100% OPERATIONAL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}