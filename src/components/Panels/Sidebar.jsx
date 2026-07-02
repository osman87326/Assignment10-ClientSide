// src/components/Panels/SidebarMenuRouter.jsx
"use client";

import { usePathname } from "next/navigation";
import SidebarLink from "./SidebarLink";
import UpgradePlanCard from "@/components/lessons/UpgradePlanCard";

export default function SidebarMenuRouter({ userMenu, adminMenu }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const activeMenuGroups = isAdmin ? adminMenu : userMenu;

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#111] border-r-[2.5px] border-[#1e1e1e] flex flex-col justify-between py-8 px-4 select-none shrink-0 z-20">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: "radial-gradient(#c8ff6b 1px, transparent 1px)", backgroundSize: "16px 16px" }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-8 relative z-10">
        {activeMenuGroups.map((group, gIdx) => (
          <div key={gIdx} className="flex flex-col gap-2">
            <h4 className="text-[10px] font-black tracking-widest text-[#333] uppercase px-3">
              {group.title}
            </h4>
            <nav className="flex flex-col gap-1 w-full">
              {group.items.map((item, iIdx) => (
                <SidebarLink key={iIdx} item={item} />
              ))}
            </nav>
            {gIdx === 0 && <div className="h-[1.5px] w-full bg-[#1e1e1e] my-1" />}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full mt-auto">
        {isAdmin ? (
          <div className="w-full bg-[#161616] border-[2px] border-[#2a2a2a] rounded-xl p-3.5 shadow-[2px_2px_0px_0px_#0a0a0a]">
            <div className="flex items-center gap-2 text-xs font-black text-[#e8e4d9] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#c8ff6b] animate-pulse" />
              <span>System: Stable</span>
            </div>
            <p className="text-[10px] text-[#333] font-black uppercase mt-1">v2.4.0 Editorial-Pulse</p>
          </div>
        ) : (
          <UpgradePlanCard />
        )}
      </div>
    </aside>
  );
}