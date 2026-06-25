import CallToAction from "@/components/CallToAction";
import FeaturedLessons from "@/components/FeaturedLessons";
import HeroSection from "@/components/HeroSection";
import MostSavedLessons from "@/components/MostSavedLessons";
import ReflectionFeatures from "@/components/ReflectionFeatures";
import TopContributors from "@/components/TopContributors";
import StatsSection from "@/components/StatsSection";
import SectionDivider from "@/components/SectionDivider";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const metadata = {
  title: "Home",
};

async function getFeaturedLessons() {
  try {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/lessons/featured`, { cache: 'no-store' });
    const data = await res.json();
    return data?.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching featured lessons:", err);
    return [];
  }
}

async function getTopContributors() {
  try {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/users/top-contributors`, { cache: 'no-store' });
    const data = await res.json();
    return data?.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching top contributors:", err);
    return [];
  }
}

async function getMostSavedLessons() {
  try {
    const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/lessons/most-saved`, { cache: 'no-store' });
    const data = await res.json();
    return data?.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching most saved lessons:", err);
    return [];
  }
}

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  const [featuredLessons, topContributors, mostSavedLessons] = await Promise.all([
    getFeaturedLessons(),
    getTopContributors(),
    getMostSavedLessons()
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <SectionDivider />
      <FeaturedLessons lessons={featuredLessons} />
      <SectionDivider />
      <ReflectionFeatures />
      <SectionDivider />
      <TopContributors contributors={topContributors} />
      <SectionDivider />
      <MostSavedLessons lessons={mostSavedLessons} />
      <SectionDivider />
      <CallToAction />
    </>
  );
}