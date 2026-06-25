"use client";

import { useEffect, useRef, useState } from "react";

export default function MouseGlow() {
  const glowRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timer = setTimeout(() => {
      setIsTouch(isTouchDevice);
      setReducedMotion(prefersReduced);
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth interpolation
      currentPos.current.x +=
        (mousePos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y +=
        (mousePos.current.y - currentPos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentPos.current.x - 200}px, ${currentPos.current.y - 200}px)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isTouch, reducedMotion]);

  if (!mounted || isTouch || reducedMotion) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-[400px] h-[400px] rounded-full will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(195, 192, 255, 0.06) 0%, rgba(195, 192, 255, 0.02) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}