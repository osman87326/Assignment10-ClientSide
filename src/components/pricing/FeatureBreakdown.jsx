import { Star } from "lucide-react";

const BREAKDOWN_DATA = [
  { capability: "Creation Limits", free: "3 per month", premium: "Unlimited" },
  { capability: "Premium Content", free: "Restricted", premium: "Full Access" },
  { capability: "Reading Experience", free: "Ad-supported", premium: "Zero Ads" },
  { capability: "Profile Discovery", free: "Standard", premium: "Priority Placement" },
  { capability: "Editorial Notes", free: "None", premium: "Included" },
  { capability: "Support Speed", free: "48-72 hours", premium: "Instant Response" },
];

export default function FeatureBreakdown() {
  return (
    <section className="w-full text-[#1C1611] pb-24 px-6 flex flex-col items-center bg-[#F6F0DD]">
      <div className="container mx-auto max-w-4xl">

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1C1611]">
            Feature Breakdown
          </h2>
        </div>

        {/* Table Content Container Card */}
        <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#1C1611] mb-16">
          <div className="overflow-x-auto">
            <table className="table w-full border-collapse">
              <thead>
                <tr className="border-b-[3.5px] border-[#1C1611] bg-[#FFB3A7]">
                  <th className="text-xs font-black uppercase p-5 text-left border-r-[2.5px] border-[#1C1611] text-[#1C1611]">
                    Capability
                  </th>
                  <th className="text-xs font-black uppercase p-5 text-left border-r-[2.5px] border-[#1C1611] text-[#1C1611]">
                    Free
                  </th>
                  <th className="text-xs font-black uppercase p-5 text-left text-[#1C1611] flex items-center gap-1.5">
                    <span>Premium</span>
                    <Star className="w-4 h-4 fill-[#1C1611] stroke-[#1C1611] stroke-[2px]" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-[#1C1611]">
                {BREAKDOWN_DATA.map((row, index) => (
                  <tr key={index} className="hover:bg-[#1C1611]/5 transition-colors duration-100 bg-[#F6F0DD]">
                    <td className="p-5 text-sm font-black border-r-[2.5px] border-[#1C1611] text-[#1C1611]">
                      {row.capability}
                    </td>
                    <td className="p-5 text-sm font-bold border-r-[2.5px] border-[#1C1611] text-[#1C1611]/80 uppercase">
                      {row.free}
                    </td>
                    <td className="p-5 text-sm font-black text-[#FF4A3A] uppercase">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sub-Panel Bottom Banner Card */}
        <div className="w-full bg-[#FCD34D] border-[3.5px] border-[#1C1611] rounded-3xl p-10 md:p-14 text-center shadow-[6px_6px_0px_0px_#1C1611]">
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center">
            <h3 className="text-xl md:text-2xl font-black uppercase text-[#1C1611] mb-3 tracking-tight">
              Join the Elite Collective
            </h3>
            <p className="text-sm font-bold text-[#1C1611]/80 leading-relaxed uppercase">
              Thousands of creators are already using the Premium tools to shape their digital legacy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}