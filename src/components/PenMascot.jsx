"use client";

import React, { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/**
 * PenMascot - An interactive, animated "Pen Mascot" component with a mouse-tracking eye.
 * Designed in a premium Neo-Brutalist / comic-book illustration style.
 * 
 * Props:
 * - variant: 'default' | 'logo' | 'hero' | 'loader'
 * - color: 'teal' | 'yellow' | 'red' | 'pink' | 'custom'
 * - interactive: boolean (whether the eye tracks mouse movement)
 * - floating: boolean (adds floating movement)
 * - className: custom class names
 */
export default function PenMascot({
  variant = "default",
  color = "teal",
  interactive = true,
  floating = true,
  className = "",
}) {
  const scleraRef = useRef(null);
  const pupilRef = useRef(null);
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // State to manage loading or drawing state for loader variant
  const [isDrawing, setIsDrawing] = useState(false);

  // Colors mapping to project design tokens
  const colors = {
    teal: {
      body: "var(--color-accent-teal, #4DD0B1)",
      cap: "var(--color-accent-yellow, #FCD34D)",
      grip: "var(--color-accent-pink, #FFB3A7)",
    },
    yellow: {
      body: "var(--color-accent-yellow, #FCD34D)",
      cap: "var(--color-accent-red, #FF4A3A)",
      grip: "var(--color-accent-teal, #4DD0B1)",
    },
    red: {
      body: "var(--color-accent-red, #FF4A3A)",
      cap: "var(--color-accent-teal, #4DD0B1)",
      grip: "var(--color-accent-yellow, #FCD34D)",
    },
    pink: {
      body: "var(--color-accent-pink, #FFB3A7)",
      cap: "var(--color-accent-yellow, #FCD34D)",
      grip: "var(--color-accent-teal, #4DD0B1)",
    },
  };

  const selectedColor = colors[color] || colors.teal;

  // Animation values stored in refs to bypass React state updates (prevent re-renders)
  const animStateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    rafId: null,
    isIdle: true,
    lastMoveTime: 0,
  });

  useEffect(() => {
    if (!interactive || prefersReducedMotion) return;

    const animState = animStateRef.current;
    
    // Animation loop (lerp to target coordinates)
    const updatePosition = () => {
      // Lerp coefficient for smooth elastic tracking
      const lerp = 0.15;
      
      animState.currentX += (animState.targetX - animState.currentX) * lerp;
      animState.currentY += (animState.targetY - animState.currentY) * lerp;

      // Apply style directly to DOM elements to avoid layout thrashing
      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate3d(${animState.currentX}px, ${animState.currentY}px, 0)`;
      }

      // Check if we are close enough to stop animation loop
      const diffX = Math.abs(animState.targetX - animState.currentX);
      const diffY = Math.abs(animState.targetY - animState.currentY);

      if (diffX > 0.02 || diffY > 0.02) {
        animState.rafId = requestAnimationFrame(updatePosition);
      } else {
        // Snap to target and halt loop
        animState.currentX = animState.targetX;
        animState.currentY = animState.targetY;
        if (pupilRef.current) {
          pupilRef.current.style.transform = `translate3d(${animState.currentX}px, ${animState.currentY}px, 0)`;
        }
        animState.rafId = null;
      }
    };

    // Trigger loop execution
    const wakeLoop = () => {
      if (!animState.rafId) {
        animState.rafId = requestAnimationFrame(updatePosition);
      }
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      if (!scleraRef.current) return;

      animState.lastMoveTime = Date.now();
      animState.isIdle = false;

      // Get bounding box of left sclera to calculate coordinates dynamically
      const rect = scleraRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      // The midpoint between the two eyes (x=60 in SVG space) is the right edge of the left eye (x=60)
      const faceCenterX = rect.left + rect.width;
      const faceCenterY = rect.top + rect.height / 2;

      // Calculate vector from face center to cursor
      const dX = e.clientX - faceCenterX;
      const dY = e.clientY - faceCenterY;
      const dist = Math.sqrt(dX * dX + dY * dY);

      // Angle of tracking
      const angle = Math.atan2(dY, dX);

      // Convert screen pixels to SVG viewBox coordinate units
      // Sclera radius is 12 SVG units.
      // Scale factor (pixels per SVG unit) = rect.width / (2 * 12) = rect.width / 24
      const scale = rect.width / 24;
      const distSVG = dist / scale;

      // Calculate maximum pupil offset limit in SVG units to prevent clipping/overflow.
      // Sclera radius is 12, Pupil radius is 7.
      // With PupilRadius = 7, and a safety margin of 1, maxTravelSVG = 12 - 7 - 1 = 4 SVG units.
      const maxTravelSVG = 4.0;

      // Map distance in SVG units to relative travel using sensitivity coefficient
      const sensitivity = 0.08;
      const travelSVG = Math.min(distSVG * sensitivity, maxTravelSVG);

      // Calculate target translation coordinates in SVG units
      animState.targetX = travelSVG * Math.cos(angle);
      animState.targetY = travelSVG * Math.sin(angle);

      wakeLoop();
    };

    // Smoothly return pupil to center
    const resetPosition = () => {
      animState.targetX = 0;
      animState.targetY = 0;
      animState.isIdle = true;
      wakeLoop();
    };

    // Check for user inactivity
    const idleCheckInterval = setInterval(() => {
      if (!animState.isIdle && Date.now() - animState.lastMoveTime > 3000) {
        resetPosition();
      }
    }, 1000);

    // Register event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", resetPosition);
    window.addEventListener("scroll", resetPosition, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", resetPosition);
      window.removeEventListener("scroll", resetPosition);
      clearInterval(idleCheckInterval);
      if (animState.rafId) {
        cancelAnimationFrame(animState.rafId);
      }
    };
  }, [interactive, prefersReducedMotion]);

  // Effect for drawing animation of the loader variant
  useEffect(() => {
    if (variant !== "loader") return;

    const interval = setInterval(() => {
      setIsDrawing((prev) => !prev);
    }, 1200);

    return () => clearInterval(interval);
  }, [variant]);

  // Handle CSS class configurations based on props
  const sizeClasses = {
    logo: "w-10 h-20 sm:w-12 sm:h-24",
    default: "w-32 h-64 sm:w-40 sm:h-80",
    hero: "w-48 h-96 sm:w-60 sm:h-[480px]",
    loader: "w-24 h-48",
    crying: "w-28 h-56",
  };

  const selectedSize = sizeClasses[variant] || sizeClasses.default;
  const isFloating = floating && variant !== "logo" && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center select-none ${selectedSize} ${
        isFloating ? "animate-[bounce_3s_infinite_ease-in-out]" : ""
      } ${className}`}
      style={{
        // Custom bouncing parameters for Neo-Brutalist heavy comic feel
        animation: isFloating ? "neoFloat 3.5s infinite ease-in-out" : undefined,
      }}
    >
      {/* Floating Sparkles for Hero variant */}
      {variant === "hero" && (
        <>
          {/* Sparkle 1 */}
          <div className="absolute top-2 left-0 text-[#FCD34D] animate-[pulse_2s_infinite_ease-in-out_0.2s] w-6 h-6">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </div>
          {/* Sparkle 2 */}
          <div className="absolute bottom-16 right-0 text-[#FF4A3A] animate-[pulse_2.5s_infinite_ease-in-out_0.7s] w-8 h-8">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
            </svg>
          </div>
          {/* Circular badge background accent for premium layout */}
          <div className="absolute -z-10 w-[110%] h-[80%] rounded-full bg-[#1C1611]/5 border-[2px] border-dashed border-[#1C1611]/25 rotate-6" />
        </>
      )}

      {/* Styled vector Pen SVG */}
      <svg
        viewBox="0 0 120 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[5px_5px_0px_#1C1611] overflow-visible"
      >
        {/* Style definitions for custom animation keyframes */}
        <style>{`
          @keyframes neoFloat {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(2deg); }
          }
          @keyframes neoDraw {
            0%, 100% { stroke-dashoffset: 200; }
            50% { stroke-dashoffset: 0; }
          }
          @keyframes neoTear {
            0% {
              transform: translateY(0) scale(0);
              opacity: 0;
            }
            15% {
              transform: translateY(2px) scale(1);
              opacity: 1;
            }
            80% {
              transform: translateY(20px) scale(0.9);
              opacity: 1;
            }
            100% {
              transform: translateY(24px) scale(0.2);
              opacity: 0;
            }
          }
        `}</style>

        {/* Pocket Clip */}
        <path
          d="M 35 25 H 18 V 65 C 18 69, 24 69, 24 65 V 33 H 35 V 25 Z"
          fill="var(--color-canvas-dark, #1C1611)"
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Pen Barrel (Body) */}
        <rect
          x="35"
          y="45"
          width="50"
          height="85"
          fill={selectedColor.body}
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4"
          strokeLinejoin="round"
          rx="4"
        />

        {/* Decorative branding stripe on body */}
        <rect
          x="35"
          y="112"
          width="50"
          height="8"
          fill="var(--color-canvas-dark, #1C1611)"
        />

        {/* Cap (Top Section) */}
        <path
          d="M 35 45 H 85 V 20 C 85 10, 35 10, 35 20 Z"
          fill={selectedColor.cap}
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Cap Top Nib-Ring */}
        <ellipse
          cx="60"
          y="20"
          rx="12"
          ry="3"
          fill="var(--color-canvas-dark, #1C1611)"
          className="hidden"
        />

        {/* Grip Section */}
        <path
          d="M 43 130 H 77 L 74 162 H 46 Z"
          fill={selectedColor.grip}
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Fountain Pen Nib (Tip) */}
        <path
          d="M 46 162 C 43 177, 47 192, 60 206 C 73 192, 77 177, 74 162 Z"
          fill="#FFFFFF"
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Nib Details: Slit and Breather Hole */}
        <line
          x1="60"
          y1="206"
          x2="60"
          y2="178"
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle
          cx="60"
          cy="178"
          r="3"
          fill="var(--color-canvas-dark, #1C1611)"
        />

        {/* Embedded Cartoon Eyes (Two Eyes) */}
        {/* Left Sclera */}
        <circle
          ref={scleraRef}
          cx="48"
          cy="87.5"
          r="12"
          fill="#FFFFFF"
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4.5"
        />
        {/* Right Sclera */}
        <circle
          cx="72"
          cy="87.5"
          r="12"
          fill="#FFFFFF"
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="4.5"
        />

        {/* Dynamic Pupils & Highlights (wrapped in a single group for synchronous translation) */}
        <g
          ref={pupilRef}
          style={{
            willChange: "transform",
            transform: "translate3d(0px, 0px, 0)",
          }}
        >
          {/* Left Pupil (radius 7 represents ~34% of sclera area) */}
          <circle cx="48" cy="87.5" r="7" fill="var(--color-canvas-dark, #1C1611)" />
          {/* Left Pupil Highlight */}
          <circle cx="45.5" cy="85" r="2.2" fill="#FFFFFF" />

          {/* Right Pupil (radius 7 represents ~34% of sclera area) */}
          <circle cx="72" cy="87.5" r="7" fill="var(--color-canvas-dark, #1C1611)" />
          {/* Right Pupil Highlight */}
          <circle cx="69.5" cy="85" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Crying Eyebrows (sad wobbly look) */}
        {variant === "crying" && (
          <>
            <path
              d="M 37 75 Q 43 65 49 68"
              stroke="var(--color-canvas-dark, #1C1611)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 83 75 Q 77 65 71 68"
              stroke="var(--color-canvas-dark, #1C1611)"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </>
        )}

        {/* Animated Tears for crying variant */}
        {variant === "crying" && (
          <>
            {/* Left Tear */}
            <path
              d="M 45 99 Q 48 103 51 99 Q 51 96 48 94 Q 45 96 45 99 Z"
              fill="#38BDF8"
              stroke="var(--color-canvas-dark, #1C1611)"
              strokeWidth="2.5"
              style={{
                transformOrigin: "48px 99px",
                animation: "neoTear 1.8s infinite ease-in-out",
              }}
            />
            {/* Right Tear */}
            <path
              d="M 69 99 Q 72 103 75 99 Q 75 96 72 96 Q 69 96 69 99 Z"
              fill="#38BDF8"
              stroke="var(--color-canvas-dark, #1C1611)"
              strokeWidth="2.5"
              style={{
                transformOrigin: "72px 99px",
                animation: "neoTear 1.8s infinite ease-in-out 0.9s",
              }}
            />
          </>
        )}

        {/* Tiny Cheek blushes below the eye for mascot character expression */}
        <ellipse cx="37.5" cy="98" rx="3.5" ry="1.8" fill="var(--color-accent-pink, #FFB3A7)" />
        <ellipse cx="82.5" cy="98" rx="3.5" ry="1.8" fill="var(--color-accent-pink, #FFB3A7)" />

        {/* Character Smile / Sad Frown */}
        <path
          d={variant === "crying" ? "M 54 112 Q 60 106 66 112" : "M 53 108 Q 60 114 67 108"}
          stroke="var(--color-canvas-dark, #1C1611)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Drawing Line for Loader variant */}
      {variant === "loader" && (
        <div className="absolute -bottom-6 w-20 h-4 flex items-center justify-center">
          <svg viewBox="0 0 100 20" className="w-full h-full overflow-visible">
            <path
              d="M 10 10 Q 30 18 50 10 T 90 10"
              fill="none"
              stroke="var(--color-canvas-dark, #1C1611)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="200"
              style={{
                animation: "neoDraw 1.2s infinite ease-in-out",
              }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}