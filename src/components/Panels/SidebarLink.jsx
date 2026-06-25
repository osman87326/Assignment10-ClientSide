"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, FileEdit, Bookmark, BarChart3, Settings,
  LayoutDashboard, Users2, Library, Flag, UserCog
} from "lucide-react";

const COMPREHENSIVE_ICON_MAP = {
  // User Scope Nodes
  book: BookOpen,
  edit: FileEdit,
  bookmark: Bookmark,
  chart: BarChart3,
  settings: Settings,

  // Admin Scope Nodes
  command: LayoutDashboard,
  users: Users2,
  content: Library,
  flag: Flag,
  profile: UserCog,
};

export default function SidebarLink({ item, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  const Icon = COMPREHENSIVE_ICON_MAP[item.iconName] || BookOpen;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`relative w-full h-11 rounded-xl flex items-center gap-3.5 px-4 font-black uppercase text-xs transition-all duration-100 select-none ${
        isActive
          ? "bg-[#FF4A3A] text-white border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]"
          : "text-[#1C1611]/80 hover:text-[#1C1611] hover:bg-[#1C1611]/5 border-2 border-transparent"
      }`}
    >
      <Icon className="w-4 h-4 shrink-0 stroke-[2.5px]" />
      <span>{item.name}</span>
    </Link>
  );
}