"use client";

import React, { useState, useEffect, useRef } from "react";
import PenMascot from "@/components/PenMascot";

export default function MascotPlayground() {
  const [activeColor, setActiveColor] = useState("teal");
  const [isInteractive, setIsInteractive] = useState(true);
  const [isFloating, setIsFloating] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scleraCenter, setScleraCenter] = useState({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState({
    angleRad: 0,
    angleDeg: 0,
    distance: 0,
    pupilX: 0,
    pupilY: 0,
  });

  const centerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (!centerRef.current) return;
      const rect = centerRef.current.getBoundingClientRect();
      const cX = rect.left + rect.width / 2;
      const cY = rect.top + rect.height / 2;

      setScleraCenter({ x: Math.round(cX), y: Math.round(cY) });

      const dX = e.clientX - cX;
      const dY = e.clientY - cY;
      const dist = Math.sqrt(dX * dX + dY * dY);
      const angle = Math.atan2(dY, dX);

      // Estimate the single sclera width as roughly 20% of the container width to match PenMascot scale
      const estimatedScleraWidth = rect.width * 0.20;
      const scale = Math.max(1, estimatedScleraWidth / 24);
      const distSVG = dist / scale;

      // Max travel of pupil in SVG space is 4.0
      const maxTravelSVG = 4.0;
      const travelSVG = Math.min(distSVG * 0.08, maxTravelSVG);

      setTelemetry({
        angleRad: angle,
        angleDeg: Math.round((angle * 180) / Math.PI),
        distance: Math.round(dist),
        pupilX: Number((travelSVG * Math.cos(angle)).toFixed(2)),
        pupilY: Number((travelSVG * Math.sin(angle)).toFixed(2)),
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F0DD] dot-grid text-[#1C1611] pt-24 sm:pt-32 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-handwritten text-2xl text-[#FF4A3A] font-bold block mb-2">
            ✒️ Interactive Mascot Spec
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
            Meet the <span className="text-[#FF4A3A] wavy-underline">Pen Mascot</span>
          </h1>
          <p className="text-base sm:text-lg font-bold text-[#1C1611]/80 max-w-xl mx-auto">
            A highly optimized, vector-drawn, mouse-tracking interface element built for the brand blueprint. Zero layout thrashing, 60fps tracking.
          </p>
        </div>

        {/* Main Grid: Interactive Demo & Schematic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Interactive Sandbox & Controls */}
          <div className="lg:col-span-8 bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1C1611]">
            <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
              
              {/* Dynamic Mascot Viewport */}
              <div 
                ref={centerRef}
                className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white/40 border-[3px] border-dashed border-[#1C1611]/20 rounded-2xl min-h-[350px] relative overflow-hidden"
              >
                <PenMascot 
                  variant="default"
                  color={activeColor}
                  interactive={isInteractive}
                  floating={isFloating}
                  className="scale-110"
                />
                
                {/* Floating telemetry lines */}
                {isInteractive && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    {/* Horizontal Reference Line */}
                    <div className="absolute w-full h-[1px] border-t border-dashed border-[#1C1611]/15" />
                    {/* Vertical Reference Line */}
                    <div className="absolute h-full w-[1px] border-l border-dashed border-[#1C1611]/15" />
                  </div>
                )}
              </div>

              {/* Control Panel */}
              <div className="w-full md:w-1/2 flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-black uppercase mb-1">Mascot Configuration</h3>
                  <p className="text-xs font-bold text-[#1C1611]/60">Customize rendering styles & features</p>
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#1C1611]/70">Pen Colorway</span>
                  <div className="flex gap-2">
                    {["teal", "yellow", "red", "pink"].map((colorName) => (
                      <button
                        key={colorName}
                        onClick={() => setActiveColor(colorName)}
                        className={`px-4 py-2 text-xs font-black uppercase rounded-lg border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all ${
                          activeColor === colorName
                            ? "bg-[#FF4A3A] text-white"
                            : "bg-[#F6F0DD] text-[#1C1611]"
                        }`}
                      >
                        {colorName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Buttons */}
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isInteractive}
                      onChange={(e) => setIsInteractive(e.target.checked)}
                      className="w-5 h-5 accent-[#FF4A3A] rounded border-[2.5px] border-[#1C1611] focus:ring-0"
                    />
                    <span className="text-sm font-bold uppercase">Mouse Tracking Active</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFloating}
                      onChange={(e) => setIsFloating(e.target.checked)}
                      className="w-5 h-5 accent-[#FF4A3A] rounded border-[2.5px] border-[#1C1611] focus:ring-0"
                    />
                    <span className="text-sm font-bold uppercase">Floating Animation Active</span>
                  </label>
                </div>

                {/* Integration Details Info Box */}
                <div className="p-4 bg-[#FFB3A7] border-[2.5px] border-[#1C1611] rounded-xl shadow-[3px_3px_0px_0px_#1C1611]">
                  <h4 className="text-xs font-black uppercase mb-1">Integration Code Snippet</h4>
                  <pre className="text-[10px] font-mono bg-[#1C1611] text-white p-2.5 rounded-lg overflow-x-auto select-all">
{`<PenMascot
  variant="default"
  color="${activeColor}"
  interactive={${isInteractive}}
  floating={${isFloating}}
/>`}
                  </pre>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Real-time Telemetry Schematic */}
          <div className="lg:col-span-4 bg-[#1C1611] text-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1611] min-h-[440px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#F6F0DD]/20 pb-4 mb-6">
                <span className="font-extrabold text-xs tracking-wider uppercase text-[#FCD34D]">
                  telemetry system v1.2
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#4DD0B1] animate-ping" />
              </div>

              <h3 className="text-xl font-black uppercase text-white mb-4">Tracking Geometry</h3>

              <div className="space-y-4 font-mono text-xs">
                {/* Mouse X/Y */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">cursor.coord</span>
                  <span className="font-bold text-[#FCD34D]">
                    X: {mousePos.x}px | Y: {mousePos.y}px
                  </span>
                </div>

                {/* Center Coord */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">sclera.center</span>
                  <span className="font-bold">
                    {scleraCenter.x && scleraCenter.y
                      ? `${scleraCenter.x}px | ${scleraCenter.y}px`
                      : "calculating..."}
                  </span>
                </div>

                {/* Angle Rad */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">vector.angle_rad</span>
                  <span className="font-bold text-[#4DD0B1]">
                    {telemetry.angleRad.toFixed(4)} rad
                  </span>
                </div>

                {/* Angle Deg */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">vector.angle_deg</span>
                  <span className="font-bold text-[#4DD0B1]">
                    {telemetry.angleDeg}°
                  </span>
                </div>

                {/* Distance */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">vector.distance</span>
                  <span className="font-bold text-[#FFB3A7]">
                    {telemetry.distance}px
                  </span>
                </div>

                {/* Pupil Delta */}
                <div className="flex justify-between border-b border-[#F6F0DD]/10 pb-2">
                  <span className="text-[#F6F0DD]/50">pupil.translation</span>
                  <span className="font-bold text-white">
                    dx: {telemetry.pupilX}px | dy: {telemetry.pupilY}px
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F6F0DD]/20 flex items-center justify-between text-[10px] text-[#F6F0DD]/50 uppercase">
              <span>status</span>
              <span className="text-[#4DD0B1] font-bold">tracking live</span>
            </div>
          </div>
        </div>

        {/* Modular Use-Cases Showcase */}
        <div>
          <h2 className="text-3xl font-black uppercase text-center mb-12">Modular Placement Specs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Spec 1: Hero Floating */}
            <div className="bg-[#FCD34D] border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#1C1611] flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#1C1611] text-white rounded">
                  01. HERO COMPONENT
                </span>
                <h4 className="text-xl font-black uppercase mt-4 mb-2">Interactive Hero Mascot</h4>
                <p className="text-xs font-bold text-[#1C1611]/80 leading-relaxed mb-6">
                  Perfect for drawing visual interest above the fold. Includes floating keyframe physics, background accent plates, and particle burst details.
                </p>
              </div>
              <div className="h-44 bg-white/40 border-[2.5px] border-[#1C1611] rounded-xl flex items-center justify-center overflow-hidden">
                <PenMascot variant="hero" color="red" className="scale-75" />
              </div>
            </div>

            {/* Spec 2: Loading State */}
            <div className="bg-[#4DD0B1] border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#1C1611] flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#1C1611] text-white rounded">
                  02. LOADING INDICATOR
                </span>
                <h4 className="text-xl font-black uppercase mt-4 mb-2">Drawing Loader</h4>
                <p className="text-xs font-bold text-[#1C1611]/80 leading-relaxed mb-6">
                  Perfect for page transitions or form submissions. Displays the mascot drawing a repeating, self-animating vector path beneath the nib tip.
                </p>
              </div>
              <div className="h-44 bg-white/40 border-[2.5px] border-[#1C1611] rounded-xl flex items-center justify-center overflow-hidden">
                <PenMascot variant="loader" color="teal" className="scale-[0.85] pt-4" />
              </div>
            </div>

            {/* Spec 3: Logo Branding */}
            <div className="bg-[#FFB3A7] border-[3px] border-[#1C1611] rounded-2xl p-6 shadow-[5px_5px_0px_0px_#1C1611] flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-[#1C1611] text-white rounded">
                  03. BRAND ICON / LOGO
                </span>
                <h4 className="text-xl font-black uppercase mt-4 mb-2">Compact Logo Sign</h4>
                <p className="text-xs font-bold text-[#1C1611]/80 leading-relaxed mb-6">
                  Fits within text flow or header layout grids. Statically anchored while maintaining the tracking eye logic for visual feedback.
                </p>
              </div>
              <div className="h-44 bg-white/40 border-[2.5px] border-[#1C1611] rounded-xl flex items-center justify-center overflow-hidden">
                <div className="flex items-center gap-3 bg-[#F6F0DD] border-[2px] border-[#1C1611] px-5 py-3 rounded-full shadow-[3px_3px_0px_0px_#1C1611]">
                  <PenMascot variant="logo" color="teal" className="scale-90" />
                  <span className="font-extrabold text-lg tracking-tight lowercase">
                    wise.pen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}