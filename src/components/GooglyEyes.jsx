"use client";

import React, { useEffect, useRef } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

export default function GooglyEyes({ className = "h-8 w-16" }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const svgRef = useRef(null);
  const pupilRef = useRef(null);

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
    if (prefersReducedMotion) return;

    const animState = animStateRef.current;

    const updatePosition = () => {
      const lerp = 0.15;
      animState.currentX += (animState.targetX - animState.currentX) * lerp;
      animState.currentY += (animState.targetY - animState.currentY) * lerp;

      if (pupilRef.current) {
        pupilRef.current.style.transform = `translate3d(${animState.currentX}px, ${animState.currentY}px, 0)`;
      }

      const diffX = Math.abs(animState.targetX - animState.currentX);
      const diffY = Math.abs(animState.targetY - animState.currentY);

      if (diffX > 0.02 || diffY > 0.02) {
        animState.rafId = requestAnimationFrame(updatePosition);
      } else {
        animState.currentX = animState.targetX;
        animState.currentY = animState.targetY;
        if (pupilRef.current) {
          pupilRef.current.style.transform = `translate3d(${animState.currentX}px, ${animState.currentY}px, 0)`;
        }
        animState.rafId = null;
      }
    };

    const wakeLoop = () => {
      if (!animState.rafId) {
        animState.rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleMouseMove = (e) => {
      if (!svgRef.current) return;

      animState.lastMoveTime = Date.now();
      animState.isIdle = false;

      const rect = svgRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dX = e.clientX - centerX;
      const dY = e.clientY - centerY;
      const dist = Math.sqrt(dX * dX + dY * dY);
      const angle = Math.atan2(dY, dX);

      // Convert distance to SVG units (viewBox width is 100)
      const scale = rect.width / 100;
      const distSVG = dist / scale;

      // Max travel of pupil in SVG space: Sclera radius (22) - Pupil radius (9) - margin (2) = 11
      const maxTravelSVG = 11.0;
      const sensitivity = 0.08;
      const travelSVG = Math.min(distSVG * sensitivity, maxTravelSVG);

      animState.targetX = travelSVG * Math.cos(angle);
      animState.targetY = travelSVG * Math.sin(angle);

      wakeLoop();
    };

    const resetPosition = () => {
      animState.targetX = 0;
      animState.targetY = 0;
      animState.isIdle = true;
      wakeLoop();
    };

    const idleCheckInterval = setInterval(() => {
      if (!animState.isIdle && Date.now() - animState.lastMoveTime > 3000) {
        resetPosition();
      }
    }, 1000);

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
  }, [prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 50"
      className={`${className} inline-block overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left Eye Outer */}
      <circle cx="25" cy="25" r="22" fill="white" stroke="#1C1611" strokeWidth="4" />
      {/* Right Eye Outer */}
      <circle cx="75" cy="25" r="22" fill="white" stroke="#1C1611" strokeWidth="4" />

      {/* Dynamic Pupils (wrapped in a group for synchronous translation) */}
      <g
        ref={pupilRef}
        style={{
          willChange: "transform",
          transform: "translate3d(0px, 0px, 0)",
        }}
      >
        {/* Left Pupil */}
        <circle cx="25" cy="25" r="9" fill="#1C1611" />
        <circle cx="21" cy="21" r="3" fill="white" />

        {/* Right Pupil */}
        <circle cx="75" cy="25" r="9" fill="#1C1611" />
        <circle cx="71" cy="21" r="3" fill="white" />
      </g>
    </svg>
  );
}