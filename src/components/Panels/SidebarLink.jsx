"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, FileEdit, Bookmark, BarChart3, Settings, LayoutDashboard, Users2, Library, Flag, UserCog } from "lucide-react";

const ICON_MAP = {
  book: BookOpen, edit: FileEdit, bookmark: Bookmark, chart: BarChart3, settings: Settings,
  command: LayoutDashboard, users: Users2, content: Library, flag: Flag, profile: UserCog,
};

export default function SidebarLink({ item }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = ICON_MAP[item.iconName] || BookOpen;

  return (
    <Link
      href={item.href}
      className={`relative w-full h-10 rounded-xl flex items-center gap-3 px-3 font-black uppercase text-[10px] tracking-wider transition-all duration-100 select-none ${
        isActive
          ? "bg-[#c8ff6b] text-[#1a2200] border-[2px] border-[#2a2a2a] shadow-[2px_2px_0px_0px_#0a0a0a]"
          : "text-[#444] hover:text-[#e8e4d9] hover:bg-[#1e1e1e] border-[2px] border-transparent"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0 stroke-[2.5px]" />
      <span>{item.name}</span>
    </Link>
  );
}