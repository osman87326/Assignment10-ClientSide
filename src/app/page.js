import HeroSection from "@/components/HeroSection";
import FeaturedLessons from "@/components/FeaturedLessons";
import ReflectionFeatures from "@/components/ReflectionFeatures";
import TopContributors from "@/components/TopContributors";
import MostSavedLessons from "@/components/MostSavedLessons";
import CallToAction from "@/components/CallToAction";
import StatsSection from "@/components/StatsSection";
import SectionDivider from "@/components/SectionDivider";


export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main className="pt-16">
      <HeroSection />
      <StatsSection />
      <SectionDivider />
      <FeaturedLessons />
      <SectionDivider />
      <ReflectionFeatures />
      <SectionDivider />
      <TopContributors />
      <SectionDivider />
      <MostSavedLessons />
      <SectionDivider />
      <CallToAction />
    </main>
  );
}