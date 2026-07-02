"use client";

import { useEffect, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/**
 * Lightweight floating decorative elements using pure CSS animations
 * instead of 14 simultaneous Framer Motion JS-driven infinite loops.
 * Reduced from 14 particles to 6 for performance.
 */

const PARTICLES = [
  { type: "circle", size: 6, x: "15%", y: "20%", delay: "0s", duration: "7s", opacity: 0.25 },
  { type: "circle", size: 4, x: "80%", y: "30%", delay: "1.5s", duration: "9s", opacity: 0.15 },
  { type: "star", size: 3, x: "25%", y: "15%", delay: "0.5s", duration: "6s", opacity: 0.3 },
  { type: "star", size: 2, x: "70%", y: "55%", delay: "2s", duration: "8s", opacity: 0.2 },
  { type: "orb", size: 50, x: "10%", y: "40%", delay: "0s", duration: "14s", opacity: 0.04 },
  { type: "orb", size: 60, x: "75%", y: "50%", delay: "3s", duration: "16s", opacity: 0.03 },
];

function StarShape({ size }) {
  return (
    <svg
      width={size * 4}
      height={size * 4}
      viewBox="0 0 16 16"
      fill="currentColor"
      className="text-primary"
    >
      <path d="M8 0l1.5 5.5L16 8l-6.5 2.5L8 16l-1.5-5.5L0 8l6.5-2.5z" />
    </svg>
  );
}

export default function FloatingElements() {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute floating-particle"
          style={{
            left: p.x,
            top: p.y,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0,
          }}
        >
          {p.type === "circle" && (
            <div
              className="rounded-full bg-primary"
              style={{
                width: p.size,
                height: p.size,
                boxShadow: `0 0 ${p.size * 2}px ${p.size / 2}px rgba(195, 192, 255, 0.1)`,
                opacity: p.opacity,
              }}
            />
          )}
          {p.type === "star" && (
            <div style={{ opacity: p.opacity }}>
              <StarShape size={p.size} />
            </div>
          )}
          {p.type === "orb" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: "radial-gradient(circle, rgba(195, 192, 255, 0.2), transparent 70%)",
                opacity: p.opacity,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}