"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, ChevronDown, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function LessonsSearchFilters({
  variant = "dashboard",
  placeholder = "Search your notebook...",
  availableCategories = [],
  availableTones = [],
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All Categories",
  );
  const [tone, setTone] = useState(searchParams.get("emotionalTone") || "Any Tone");
  const [activeFilter, setActiveFilter] = useState("All Lessons");
  const [activeSort, setActiveSort] = useState("Newest First");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");

    if (category && category !== "All Categories") params.set("category", category);
    else params.delete("category");

    if (tone && tone !== "Any Tone") params.set("emotionalTone", tone);
    else params.delete("emotionalTone");

    params.set("page", "1");

    const timer = setTimeout(() => {
      if (params.toString() !== searchParams.toString()) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, category, tone, pathname, router, searchParams]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("All Categories");
    setTone("Any Tone");
    router.push(pathname, { scroll: false });
  };

  if (variant === "dashboard") {
    return (
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#1C1611]">
            <Search className="w-4 h-4 stroke-[2.5px]" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-10 pl-10 pr-4 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] text-[#1C1611] text-xs font-black uppercase rounded-xl focus:outline-none placeholder:text-[#1C1611]/50 shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setActiveFilter("All Lessons")}
            className="h-10 px-4 bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-xl text-[#1C1611] font-black uppercase text-xs hover:bg-[#FF4A3A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#1C1611]"
          >
            <span>{activeFilter}</span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5px]" />
          </button>
          <button
            onClick={() => setActiveSort("Newest First")}
            className="h-10 px-4 bg-[#FFB3A7] border-[2.5px] border-[#1C1611] rounded-xl text-[#1C1611] font-black uppercase text-xs hover:bg-[#FF4A3A] transition-colors flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_0px_#1C1611]"
          >
            <span>{activeSort}</span>
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5px]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl p-4 border-[3px] border-[#1C1611] bg-[#4DD0B1] flex flex-col md:flex-row md:items-center justify-between gap-4 mx-auto max-w-7xl shadow-[4px_4px_0px_0px_#1C1611]">
      <div className="flex flex-wrap items-center gap-3 flex-grow max-w-4xl">
        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#1C1611]">
            <Search className="w-4 h-4 stroke-[2.5px]" />
          </span>
          <input
            type="text"
            id="lessons-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full h-11 pl-10 pr-4 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] text-[#1C1611] text-xs font-black uppercase rounded-xl focus:outline-none placeholder:text-[#1C1611]/50 shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          />
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            id="lessons-category-filter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] text-[#1C1611] font-black uppercase text-xs rounded-xl focus:outline-none pr-10 pl-4 w-full sm:w-48 appearance-none cursor-pointer shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          >
            <option value="All Categories">All Categories</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1C1611]">
            <ChevronDown className="w-4 h-4 stroke-[2.5px]" />
          </span>
        </div>

        <div className="relative w-full sm:w-auto">
          <select
            id="lessons-tone-filter"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="h-11 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] text-[#1C1611] font-black uppercase text-xs rounded-xl focus:outline-none pr-10 pl-4 w-full sm:w-44 appearance-none cursor-pointer shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          >
            <option value="Any Tone">Any Tone</option>
            {availableTones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1C1611]">
            <SlidersHorizontal className="w-3.5 h-3.5 stroke-[2.5px]" />
          </span>
        </div>
      </div>

      <button
        id="lessons-clear-filters"
        onClick={handleClearFilters}
        className="h-11 text-xs font-black uppercase tracking-wider text-[#1C1611] bg-[#FFB3A7] border-[2.5px] border-[#1C1611] rounded-xl px-4 gap-2 transition-all duration-100 flex items-center justify-center shadow-[2px_2px_0px_0px_#1C1611] hover:bg-[#FF4A3A] active:translate-y-0.5 cursor-pointer self-end md:self-auto"
      >
        <RotateCcw className="w-3.5 h-3.5 stroke-[2.5px]" />
        Clear Filters
      </button>
    </div>
  );
}
