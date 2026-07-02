"use client";

import { useRef, useState, useCallback } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

export default function useTiltCard(maxTilt = 6) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current || prefersReducedMotion) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setStyle({
        transform: `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) translateZ(0)`,
        transition: "transform 0.08s linear",
      });
    },
    [maxTilt, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    });
  }, [prefersReducedMotion]);

  return { ref, style, handleMouseMove, handleMouseLeave };
}