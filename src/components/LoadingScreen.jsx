"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * LoadingScreen — Full-viewport Neo-Brutalist loading overlay featuring
 * an animated pen mascot with a multi-phase timeline:
 *   1. Entrance (elastic drop-in)
 *   2. Wink (playful micro-interaction)
 *   3. Writing (tilt + wavy line draw + rotating micro-copy)
 *   4. Exit (sweep-out + overlay fade)
 *
 * Props:
 *   - isLoading: boolean — controls visibility; when false, triggers exit
 *   - minDuration: number — minimum ms to show (prevents flash on fast loads)
 *   - onComplete: () => void — called after exit animation finishes
 */

const LOADING_MESSAGES = [
  "sharpening pencils...",
  "drawing your feed...",
  "inking the margins...",
  "composing wisdom...",
  "polishing insights...",
  "sketching your journey...",
];

// Total animation timeline: entrance(600) + settle(200) + wink(400) + pause(200) + tilt-to-write(400) = ~1800ms before writing loop
const MIN_SHOW_DURATION = 2400;

export default function LoadingScreen({
  isLoading = true,
  minDuration = MIN_SHOW_DURATION,
  onComplete,
}) {
  const [visible, setVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const mountTimeRef = useRef(0);
  const hasMetMinDuration = useRef(false);

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // Rotate loading messages
  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [visible]);

  // Handle exit timing — respect minDuration
  useEffect(() => {
    if (isLoading) return;

    const elapsed = Date.now() - mountTimeRef.current;
    const remaining = Math.max(0, minDuration - elapsed);

    const timeout = setTimeout(() => {
      hasMetMinDuration.current = true;
      setVisible(false);
    }, remaining);

    return () => clearTimeout(timeout);
  }, [isLoading, minDuration]);

  const handleExitComplete = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F6F0DD] select-none"
          style={{ willChange: "opacity" }}
        >
          {/* Dot-matrix blueprint background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(#1C1611 1.5px, transparent 1.5px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />

          {/* Inline keyframes for the full SVG animation timeline */}
          <style>{`
            /* ============================================= */
            /* Phase 1: Entrance — elastic drop from above   */
            /* ============================================= */
            @keyframes penEntrance {
              0% {
                transform: translate3d(0, -120vh, 0) rotate(-8deg);
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              70% {
                transform: translate3d(0, 12px, 0) rotate(2deg);
              }
              85% {
                transform: translate3d(0, -4px, 0) rotate(-0.5deg);
              }
              100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
            }

            /* ============================================= */
            /* Phase 2: Wink — left eye squash & restore     */
            /* ============================================= */
            @keyframes leftEyeWink {
              0%, 28%, 42%, 100% {
                transform: scaleY(1);
              }
              33%, 38% {
                transform: scaleY(0.08);
              }
            }

            /* Eyelid arc that appears during wink */
            @keyframes winkLid {
              0%, 28%, 42%, 100% {
                opacity: 0;
              }
              33%, 38% {
                opacity: 1;
              }
            }

            /* ============================================= */
            /* Phase 3: Writing posture tilt                  */
            /* ============================================= */
            @keyframes penWritingTilt {
              0%, 30% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
              45%, 90% {
                transform: translate3d(8px, 10px, 0) rotate(22deg);
              }
              100% {
                transform: translate3d(0, 0, 0) rotate(0deg);
              }
            }

            /* ============================================= */
            /* Phase 3b: Wavy writing line draw               */
            /* ============================================= */
            @keyframes wavyLineDraw {
              0%, 30% {
                stroke-dashoffset: 320;
                opacity: 0;
              }
              35% {
                opacity: 1;
              }
              85% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
              95%, 100% {
                stroke-dashoffset: 0;
                opacity: 0;
              }
            }

            /* ============================================= */
            /* Ink drops from nib during writing               */
            /* ============================================= */
            @keyframes inkDrop {
              0%, 30% {
                transform: translate3d(0, 0, 0) scale(0);
                opacity: 0;
              }
              40% {
                transform: translate3d(0, 0, 0) scale(1);
                opacity: 0.8;
              }
              80% {
                transform: translate3d(2px, 18px, 0) scale(0.6);
                opacity: 0.6;
              }
              100% {
                transform: translate3d(4px, 30px, 0) scale(0);
                opacity: 0;
              }
            }

            /* ============================================= */
            /* Floating sparkle pulses                         */
            /* ============================================= */
            @keyframes sparkleFloat {
              0%, 100% {
                transform: translateY(0) scale(0.8);
                opacity: 0.4;
              }
              50% {
                transform: translateY(-8px) scale(1.15);
                opacity: 1;
              }
            }

            /* ============================================= */
            /* Message fade cycle                              */
            /* ============================================= */
            @keyframes messageFade {
              0%, 10% { opacity: 0; transform: translate3d(0, 6px, 0); }
              20%, 80% { opacity: 1; transform: translate3d(0, 0, 0); }
              90%, 100% { opacity: 0; transform: translate3d(0, -4px, 0); }
            }

            /* ============================================= */
            /* Progress bar shimmer                           */
            /* ============================================= */
            @keyframes progressShimmer {
              0% { transform: translate3d(-100%, 0, 0); }
              100% { transform: translate3d(200%, 0, 0); }
            }

            /* ============================================= */
            /* Composite class assignments                    */
            /* ============================================= */
            .pen-stage {
              animation: penEntrance 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
              will-change: transform, opacity;
            }

            .pen-writing-loop {
              animation: penWritingTilt 3.6s cubic-bezier(0.4, 0, 0.2, 1) 1.8s infinite;
              will-change: transform;
            }

            .sclera-wink-left {
              transform-origin: 48px 87.5px;
              animation: leftEyeWink 3.6s ease-in-out 1.0s infinite;
              will-change: transform;
            }

            .wink-lid-line {
              animation: winkLid 3.6s ease-in-out 1.0s infinite;
              will-change: opacity;
            }

            .wavy-writing-line {
              animation: wavyLineDraw 3.6s ease-in-out 1.8s infinite;
              will-change: stroke-dashoffset, opacity;
            }

            .ink-drop-1 {
              animation: inkDrop 3.6s ease-in-out 2.0s infinite;
              will-change: transform, opacity;
            }

            .ink-drop-2 {
              animation: inkDrop 3.6s ease-in-out 2.5s infinite;
              will-change: transform, opacity;
            }

            .sparkle-anim-1 {
              animation: sparkleFloat 2.2s ease-in-out infinite;
            }

            .sparkle-anim-2 {
              animation: sparkleFloat 2.6s ease-in-out 0.5s infinite;
            }

            .sparkle-anim-3 {
              animation: sparkleFloat 1.8s ease-in-out 1.0s infinite;
            }

            .loading-message {
              animation: messageFade 1.8s ease-in-out infinite;
              will-change: opacity, transform;
            }
          `}</style>

          {/* ======================== */}
          {/* Animated Pen Mascot SVG  */}
          {/* ======================== */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Floating sparkles around the pen */}
            <div className="absolute -top-4 -left-6 sm:-left-10 text-[#FCD34D] sparkle-anim-1 w-4 h-4 sm:w-5 sm:h-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
            </div>
            <div className="absolute -top-2 -right-8 sm:-right-12 text-[#FF4A3A] sparkle-anim-2 w-3 h-3 sm:w-4 sm:h-4">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
            </div>
            <div className="absolute bottom-20 -right-6 sm:-right-10 text-[#4DD0B1] sparkle-anim-3 w-3.5 h-3.5 sm:w-5 sm:h-5">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
              </svg>
            </div>

            {/* The pen container with entrance + writing loop */}
            <div className="pen-stage">
              <div className="pen-writing-loop">
                <svg
                  viewBox="0 0 120 240"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-48 sm:w-32 sm:h-64 drop-shadow-[5px_5px_0px_#1C1611] overflow-visible"
                >
                  {/* Pocket Clip */}
                  <path
                    d="M 35 25 H 18 V 65 C 18 69, 24 69, 24 65 V 33 H 35 V 25 Z"
                    fill="#1C1611"
                    stroke="#1C1611"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />

                  {/* Pen Barrel (Body) */}
                  <rect
                    x="35" y="45" width="50" height="85"
                    fill="var(--color-accent-teal, #4DD0B1)"
                    stroke="#1C1611" strokeWidth="4"
                    strokeLinejoin="round" rx="4"
                  />

                  {/* Decorative branding stripe */}
                  <rect x="35" y="112" width="50" height="8" fill="#1C1611" />

                  {/* Cap (Top Section) */}
                  <path
                    d="M 35 45 H 85 V 20 C 85 10, 35 10, 35 20 Z"
                    fill="var(--color-accent-yellow, #FCD34D)"
                    stroke="#1C1611" strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Grip Section */}
                  <path
                    d="M 43 130 H 77 L 74 162 H 46 Z"
                    fill="var(--color-accent-pink, #FFB3A7)"
                    stroke="#1C1611" strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Fountain Pen Nib (Tip) */}
                  <path
                    d="M 46 162 C 43 177, 47 192, 60 206 C 73 192, 77 177, 74 162 Z"
                    fill="#FFFFFF"
                    stroke="#1C1611" strokeWidth="4"
                    strokeLinejoin="round"
                  />

                  {/* Nib slit & breather hole */}
                  <line x1="60" y1="206" x2="60" y2="178" stroke="#1C1611" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="60" cy="178" r="3" fill="#1C1611" />

                  {/* ——— LEFT EYE (winking eye) ——— */}
                  {/* Left Sclera — squashes on wink */}
                  <circle
                    cx="48" cy="87.5" r="12"
                    fill="#FFFFFF"
                    stroke="#1C1611" strokeWidth="4.5"
                    className="sclera-wink-left"
                  />
                  {/* Wink lid arc — visible only during wink */}
                  <path
                    d="M 36 87.5 Q 42 82 48 87.5 Q 54 82 60 87.5"
                    stroke="#1C1611" strokeWidth="4"
                    strokeLinecap="round" fill="none"
                    opacity="0"
                    className="wink-lid-line"
                  />

                  {/* Right Sclera — never winks */}
                  <circle cx="72" cy="87.5" r="12" fill="#FFFFFF" stroke="#1C1611" strokeWidth="4.5" />

                  {/* Pupils (both eyes) */}
                  <g>
                    {/* Left Pupil */}
                    <circle cx="48" cy="87.5" r="7" fill="#1C1611" className="sclera-wink-left" />
                    <circle cx="45.5" cy="85" r="2.2" fill="#FFFFFF" className="sclera-wink-left" />
                    {/* Right Pupil */}
                    <circle cx="72" cy="87.5" r="7" fill="#1C1611" />
                    <circle cx="69.5" cy="85" r="2.2" fill="#FFFFFF" />
                  </g>

                  {/* Cheek blush */}
                  <ellipse cx="37.5" cy="98" rx="3.5" ry="1.8" fill="var(--color-accent-pink, #FFB3A7)" />
                  <ellipse cx="82.5" cy="98" rx="3.5" ry="1.8" fill="var(--color-accent-pink, #FFB3A7)" />

                  {/* Smile */}
                  <path d="M 53 108 Q 60 114 67 108" stroke="#1C1611" strokeWidth="3.5" strokeLinecap="round" fill="none" />

                  {/* Ink drops from nib tip */}
                  <circle cx="60" cy="208" r="2.5" fill="#1C1611" className="ink-drop-1" />
                  <circle cx="58" cy="210" r="1.8" fill="#1C1611" className="ink-drop-2" />

                  {/* Wavy writing line below the pen */}
                  <path
                    d="M 10 224 Q 25 216 40 224 T 70 224 T 100 224 T 130 224"
                    fill="none"
                    stroke="#1C1611"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="320"
                    strokeDashoffset="320"
                    className="wavy-writing-line"
                  />
                </svg>
              </div>
            </div>

            {/* Loading text message */}
            <div className="mt-6 sm:mt-8 flex flex-col items-center gap-3 sm:gap-4">
              {/* Rotating micro-copy in handwritten font */}
              <p
                key={messageIndex}
                className="loading-message text-sm sm:text-base text-[#1C1611]/80 lowercase italic"
                style={{ fontFamily: "var(--font-handwritten, 'Gochi Hand', 'Caveat', cursive)" }}
              >
                {LOADING_MESSAGES[messageIndex]}
              </p>

              {/* Neo-Brutalist progress bar */}
              <div className="w-40 sm:w-52 h-3 sm:h-3.5 bg-white border-[2.5px] border-[#1C1611] rounded-full overflow-hidden shadow-[2px_2px_0px_0px_#1C1611] relative">
                <div
                  className="absolute inset-0 bg-[#FF4A3A] rounded-full"
                  style={{
                    animation: "progressShimmer 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                    width: "40%",
                  }}
                />
              </div>

              {/* Brand watermark */}
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-[#1C1611]/40 font-black uppercase mt-1 select-none">
                Digital Life Lessons
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}