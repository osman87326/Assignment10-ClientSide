import { Check, Star } from "lucide-react";
import UpgradeButton from "./UpgradeButton";

export default function PricingSection() {
  return (
    <section className="w-full text-[#1C1611] pt-32 pb-16 px-6 flex flex-col justify-center items-center select-none bg-[#F6F0DD]">
      {/* Blueprint Dot Matrix texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(#1C1611 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px"
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Top Minimal Membership Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-full px-4 py-1.5 text-xs font-black uppercase text-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611]">
            <span className="w-2 h-2 rounded-full bg-[#FF4A3A]" />
            Current Plan: Free Member
          </div>
        </div>

        {/* Editorial Heading Structure */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1C1611] mb-4">
            Invest in Your Growth.
          </h1>
          <p className="text-sm md:text-base text-[#1C1611]/80 font-bold leading-relaxed max-w-md mx-auto uppercase">
            Unlock the full breadth of editorial insights and advanced productivity tools with a lifetime membership.
          </p>
        </div>

        {/* Two-Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mx-auto">

          {/* Tier 1: Free Tier */}
          <div className="bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#1C1611] transition-all duration-100 group">
            <div>
              <h3 className="text-2xl font-black uppercase text-[#1C1611] mb-2">
                Free Tier
              </h3>
              <p className="text-xs text-[#1C1611]/70 font-black uppercase mb-8">
                For curious minds exploring the essentials.
              </p>

              <div className="flex items-baseline text-[#1C1611] mb-8">
                <span className="text-4xl md:text-5xl font-black tracking-tight">৳0</span>
                <span className="text-xs text-[#1C1611]/70 font-black uppercase ml-2">/forever</span>
              </div>

              <ul className="space-y-4 text-sm text-[#1C1611] font-bold">
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1C1611] text-[#1C1611] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#1C1611]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>3 Lessons per month</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1C1611] text-[#1C1611] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#1C1611]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>Standard Community Feed</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full bg-[#1C1611]/10 border-[2.5px] border-[#1C1611] text-[#1C1611]/45 py-4 rounded-xl mt-12 font-black uppercase tracking-wider text-xs pointer-events-none"
            >
              Current Selection
            </button>
          </div>

          {/* Tier 2: Lifetime Pass */}
          <div className="relative bg-[#4DD0B1] border-[3.5px] border-[#1C1611] rounded-3xl p-8 md:p-10 flex flex-col justify-between shadow-[6px_6px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[5px_5px_0px_0px_#1C1611] transition-all duration-100 group">
            <div className="absolute top-6 right-6">
              <span className="inline-flex items-center gap-1.5 bg-[#FF4A3A] border-2 border-[#1C1611] text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-[2px_2px_0px_0px_#1C1611]">
                Premium
                <Star className="w-2.5 h-2.5 fill-white stroke-none" />
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-black uppercase text-[#1C1611] mb-2">
                Lifetime Pass
              </h3>
              <p className="text-xs text-[#1C1611]/70 font-black uppercase mb-8">
                Bridging insight with maximum productivity.
              </p>

              <div className="flex items-baseline text-[#1C1611] mb-6">
                <span className="text-4xl md:text-5xl font-black tracking-tight">৳1,500</span>
                <span className="text-xs text-[#1C1611]/70 font-black uppercase ml-2">/one-time</span>
              </div>

              {/* Special Launch offer badge */}
              <div className="w-full bg-[#FCD34D] border-2 border-[#1C1611] rounded-xl p-3 flex items-center gap-2.5 mb-8 text-[#1C1611] text-xs font-black uppercase shadow-[2px_2px_0px_0px_#1C1611]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4A3A]" />
                <span>Special Launch Offer</span>
              </div>

              <ul className="space-y-4 text-sm text-[#1C1611] font-bold">
                {["Unlimited Lesson Creation", "Exclusive Editorial Content", "Ad-free Reading Experience", "Priority Profile Listing"].map((feat, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white border-2 border-[#1C1611] text-[#1C1611] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_0px_#1C1611]">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <UpgradeButton />
          </div>

        </div>
      </div>
    </section>
  );
}