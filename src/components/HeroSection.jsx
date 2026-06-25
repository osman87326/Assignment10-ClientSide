"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import GooglyEyes from "./GooglyEyes";
import PenMascot from "./PenMascot";

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
  const [mounted, setMounted] = useState(false);
  const [typedKeyword, setTypedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  // Typewriter effect for slide keyword
  useEffect(() => {
    let active = true;
    let currentText = "";
    let i = 0;
    const targetText = slide.keyword;

    const startTimeout = setTimeout(() => {
      if (!active) return;
      setTypedKeyword("");

      const typeChar = () => {
        if (!active) return;
        if (i < targetText.length) {
          currentText += targetText[i];
          setTypedKeyword(currentText);
          i++;
          setTimeout(typeChar, 60 + Math.random() * 80);
        }
      };

      typeChar();
    }, 150);

    return () => {
      active = false;
      clearTimeout(startTimeout);
    };
  }, [slide.keyword]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  return (
    <section className="relative min-h-screen w-full flex items-center bg-[#F6F0DD] dot-grid text-[#1C1611] pt-32 sm:pt-36 pb-16 overflow-hidden border-b-[3.5px] border-[#1C1611]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column - Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
          
          {/* Badge Tagline with Emoji context */}
          <div className="flex items-center gap-2">
            <span className="font-handwritten text-xl sm:text-2xl text-[#FF4A3A] font-bold">
              {slide.emoji} {slide.badge}
            </span>
          </div>

          {/* Heading with Wavy Underline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-[#1C1611] uppercase">
            {slide.title}
            <span className="text-[#FF4A3A] wavy-underline block mt-2">
              {typedKeyword}
              <span className="inline-block animate-[pulse_1s_infinite] ml-1 text-[#FF4A3A]">|</span>
            </span>
          </h1>

          {/* Body Text */}
          <p className="text-base sm:text-lg md:text-xl text-[#1C1611] leading-relaxed max-w-xl font-medium">
            {slide.description}
          </p>

          {/* Action Button CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Primary Action Button */}
            <Link
              href={slide.primaryCta.href}
              className="bg-[#FF4A3A] text-[#1C1611] font-black uppercase text-center px-8 py-4 rounded-full border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[2.5px_2.5px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2"
            >
              <span>{slide.primaryCta.text}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
            </Link>

            {/* Secondary Action Button */}
            <Link
              href={slide.secondaryCta.href}
              className="bg-transparent text-[#1C1611] font-extrabold uppercase text-center px-8 py-4 rounded-full border-[3px] border-[#1C1611] hover:bg-[#1C1611]/5 active:translate-y-[1px] transition-all duration-100 flex items-center justify-center gap-2"
            >
              <span>{slide.secondaryCta.text}</span>
            </Link>
          </div>

          {/* Slides Carousel Controls */}
          <div className="flex items-center gap-4 pt-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border-[3px] border-[#1C1611] bg-white text-[#1C1611] hover:bg-[#FFB3A7] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1C1611] flex items-center justify-center transition-all duration-100"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5px]" />
            </button>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#1C1611] transition-all duration-150 ${
                    idx === currentSlide ? "bg-[#FF4A3A] scale-110" : "bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border-[3px] border-[#1C1611] bg-white text-[#1C1611] hover:bg-[#FFB3A7] hover:translate-x-[1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_0px_#1C1611] flex items-center justify-center transition-all duration-100"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5px]" />
            </button>
          </div>
        </div>

        {/* Right Column - Visual Product Simulation Dashboard Stack */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          {/* Large Interactive Pen Mascot floating next to the dashboard */}
          <div className="absolute -left-16 -bottom-12 z-30 hidden xl:block">
            <PenMascot variant="default" color="yellow" className="scale-90" />
          </div>

          {/* Main Simulated Dashboard Container */}
          <div className="w-full max-w-[420px] bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1C1611] relative min-h-[440px] flex flex-col justify-between overflow-visible">
            
            {/* Header bar of Dashboard Simulation */}
            <div className="flex items-center justify-between border-b-[3px] border-[#1C1611] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF4A3A] border-2 border-[#1C1611]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FCD34D] border-2 border-[#1C1611]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#4DD0B1] border-2 border-[#1C1611]" />
              </div>
              <span className="font-extrabold text-xs tracking-wider uppercase text-[#1C1611]/60">
                wisdom ledger v1.0
              </span>
              <PenMascot variant="logo" color="red" className="scale-[0.5] origin-right -my-6 -mr-1" />
            </div>

            {/* Stack of cards using masking tape styling */}
            <div className="flex-1 flex flex-col justify-start relative py-4 space-y-6">
              
              {/* Card 1 - Yellow Mint */}
              <div className="bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-xl p-4 shadow-[4px_4px_0px_0px_#1C1611] rotate-[-2deg] relative z-10 transition-transform hover:rotate-0 duration-200">
                {/* Masking tape top-left */}
                <div className="bg-[#FFFFE0]/80 border-[1.5px] border-[#1C1611] w-12 h-4 absolute -top-2 left-6 -rotate-12 select-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs uppercase text-[#1C1611]">mindset pivot</span>
                  <span className="text-xs">⚡ active</span>
                </div>
                <p className="text-xs font-bold leading-relaxed text-[#1C1611]">
                  &ldquo;The best way to predict the future is to document your past decision-making matrix.&rdquo;
                </p>
              </div>

              {/* Card 2 - Teal Card */}
              <div className="bg-[#4DD0B1] border-[2.5px] border-[#1C1611] rounded-xl p-4 shadow-[4px_4px_0px_0px_#1C1611] rotate-[2.5deg] relative z-20 transition-transform hover:rotate-0 duration-200 translate-x-2">
                {/* Masking tape top-right */}
                <div className="bg-[#FFFFE0]/80 border-[1.5px] border-[#1C1611] w-12 h-4 absolute -top-2 right-6 rotate-12 select-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs uppercase text-[#1C1611]">career lesson</span>
                  <span className="text-xs">🔑 verified</span>
                </div>
                <p className="text-xs font-bold leading-relaxed text-[#1C1611]">
                  Left my high-paying corporate tech job to pursue independent builder paths. Score: 10/10.
                </p>
              </div>

              {/* Card 3 - Pink Card */}
              <div className="bg-[#FFB3A7] border-[2.5px] border-[#1C1611] rounded-xl p-4 shadow-[4px_4px_0px_0px_#1C1611] rotate-[-1deg] relative z-10 transition-transform hover:rotate-0 duration-200 -translate-x-1">
                {/* Masking tape bottom-left */}
                <div className="bg-[#FFFFE0]/80 border-[1.5px] border-[#1C1611] w-12 h-4 absolute -bottom-2 left-10 rotate-6 select-none" />
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-xs uppercase text-[#1C1611]">daily axiom</span>
                  <span className="text-xs">💡 quote</span>
                </div>
                <p className="text-xs font-bold leading-relaxed text-[#1C1611]">
                  &ldquo;Never make long-term decisions on temporary, short-term emotions.&rdquo;
                </p>
              </div>

            </div>

            {/* Bottom active state indicator */}
            <div className="mt-4 pt-3 border-t-[2.5px] border-[#1C1611] flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase text-[#1C1611]">system integrity</span>
              <span className="font-black text-xs text-[#FF4A3A] animate-pulse">100% OPERATIONAL</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}