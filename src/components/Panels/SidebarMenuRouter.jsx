"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SidebarLink from "./SidebarLink";
import UpgradePlanCard from "@/components/lessons/UpgradePlanCard";

export default function SidebarMenuRouter({ userMenu, adminMenu, isMobileMenuOpen, onClose }) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  // Dynamically determine context by checking if the path contains '/admin'
  const isAdmin = pathname?.startsWith("/admin");
  const activeMenuGroups = isAdmin ? adminMenu : userMenu;

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const handleLinkClick = (href) => {
    if (pathname !== href) {
      setIsNavigating(true);
    }
    onClose();
  };

  return (
    <>
      {/* Global Navigation Overlay */}
      {isNavigating && (
        <div className="fixed inset-0 z-[100] bg-[#F6F0DD]/80 backdrop-blur-sm flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-[#1C1611] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#1C1611]/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 h-screen bg-[#F6F0DD] border-r-[3.5px] border-[#1C1611] flex flex-col justify-between py-8 px-4 select-none shrink-0 transition-transform duration-300 ease-in-out
        md:sticky md:top-0 md:w-64 md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0 shadow-[8px_0_0_0_#1C1611]" : "-translate-x-full"}
      `}>
      
      {/* Blueprint Dot Matrix texture (very subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#1C1611 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8 relative z-10">
        {/* Mobile Close Button */}
        <div className="md:hidden flex items-center justify-between px-3 -mt-4 mb-2">
          <div className="font-black uppercase tracking-widest text-[#1C1611]">Menu</div>
          <button 
            onClick={onClose}
            className="p-1 border-[2.5px] border-[#1C1611] rounded-lg bg-[#FFB3A7] active:translate-y-[2px] active:translate-x-[2px] shadow-[2px_2px_0px_0px_#1C1611] active:shadow-none transition-all"
          >
            <X className="w-5 h-5 stroke-[3px] text-[#1C1611]" />
          </button>
        </div>

        {activeMenuGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-3">
            <h4 className="text-[10px] font-black tracking-widest text-[#1C1611]/70 uppercase px-3">
              {group.title}
            </h4>

            <nav className="flex flex-col gap-1.5 w-full">
              {group.items.map((item, iIdx) => (
                <SidebarLink key={iIdx} item={item} onClick={() => handleLinkClick(item.href)} />
              ))}
            </nav>

            {gIdx === 0 && (
              <div className="h-[2.5px] w-full bg-[#1C1611] my-2" />
            )}
          </div>
        ))}
      </div>

      {/* Context-aware footer widget */}
      <div className="relative z-10 w-full mt-auto">
        {isAdmin ? (
          <div className="w-full bg-[#4DD0B1] border-2 border-[#1C1611] rounded-xl p-3.5 shadow-[2px_2px_0px_0px_#1C1611]">
            <div className="flex items-center gap-2 text-xs font-black text-[#1C1611] uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A3A] border border-[#1C1611] animate-pulse" />
              <span>System: Stable</span>
            </div>
            <p className="text-[10px] text-[#1C1611]/75 font-black uppercase mt-1">v2.4.0 Editorial-Pulse</p>
          </div>
        ) : (
          <UpgradePlanCard />
        )}
      </div>

    </aside>
    </>
  );
}