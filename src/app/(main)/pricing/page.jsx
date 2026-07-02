import FeatureBreakdown from "@/components/pricing/FeatureBreakdown";
import PricingSection from "@/components/pricing/PricingSection";


export const metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main className="w-full bg-[#F6F0DD] min-h-screen">
      <PricingSection />
      <FeatureBreakdown />
    </main>
  );
}