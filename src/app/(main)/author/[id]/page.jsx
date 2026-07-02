"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { LessonCard } from "@/components/lessons";

export default function AuthorProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        setError("");

        // 1. Fetch Profile Info
        const profileRes = await fetch(`/api/backend/users/${id}/public-profile`);
        const profileData = await profileRes.json();

        if (!profileRes.ok || !profileData.success) {
          setError(profileData.message || "Author not found.");
          setLoading(false);
          return;
        }

        setProfile(profileData.data);

        // 2. Fetch Public Lessons
        const lessonsRes = await fetch(`/api/backend/users/${id}/public-lessons`);
        const lessonsData = await lessonsRes.json();

        if (lessonsRes.ok && lessonsData.success) {
          setLessons(lessonsData.data || []);
        }
      } catch (err) {
        console.error("Error fetching author data:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F6F0DD] flex flex-col items-center justify-center pt-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-[4px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin shadow-[2px_2px_0px_0px_#1C1611]" />
          <span className="text-xs font-black uppercase text-[#1C1611] tracking-wider animate-pulse">Loading Author...</span>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen w-full bg-[#F6F0DD] text-[#1C1611] pt-32 pb-16 px-4 flex flex-col items-center justify-center font-sans">
        <div className="w-full max-w-md bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] p-8 text-center">
          <h2 className="text-2xl font-black uppercase">Not Found</h2>
          <p className="text-sm font-bold text-[#1C1611]/70 mt-2">{error || "This author profile does not exist."}</p>
          <Link
            href="/lessons"
            className="mt-6 inline-flex items-center gap-2 bg-[#FCD34D] text-[#1C1611] font-black uppercase px-6 py-3 rounded-xl border-[2.5px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            Back to Feed
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 md:px-8 font-sans">
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-10">
        
        {/* Navigation Header */}
        <div className="flex items-center border-b-[3px] border-[#1C1611] pb-5">
          <Link
            href="/lessons"
            className="w-10 h-10 rounded-xl bg-white border-2 border-[#1C1611] flex items-center justify-center text-[#1C1611] shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 shrink-0 cursor-pointer"
            aria-label="Back to lessons"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3px]" />
          </Link>
          <span className="ml-4 font-black uppercase tracking-widest text-xs text-[#1C1611]/60">
            Author Profile
          </span>
        </div>

        {/* Profile Header */}
        <header className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden p-8 sm:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 relative">
          <div className="absolute top-0 left-0 w-full h-4 bg-[#FF4A3A] border-b-[3.5px] border-[#1C1611]" />
          
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full border-[4px] border-[#1C1611] shrink-0 bg-[#FCD34D] overflow-hidden shadow-[4px_4px_0px_0px_#1C1611] mt-4 md:mt-0">
            {profile.image || profile.photoURL ? (
              <Image 
                src={profile.image || profile.photoURL} 
                alt={profile.name || "Author"} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#1C1611]">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-grow mt-2 md:mt-6">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#1C1611] leading-none">
              {profile.name || "Anonymous Author"}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
              <div className="bg-[#4DD0B1] border-[2.5px] border-[#1C1611] rounded-xl px-5 py-3 shadow-[3px_3px_0px_0px_#1C1611] flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#1C1611] stroke-[2.5px]" />
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[10px] font-black uppercase tracking-widest">Public Lessons</span>
                  <span className="text-lg font-black">{profile.totalPublicLessons || 0}</span>
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-sm font-bold text-[#1C1611]/60 uppercase tracking-widest">
              Joined {new Date(profile.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
            </p>
          </div>
        </header>

        {/* Lessons Grid */}
        <section className="w-full flex flex-col gap-6 mt-4">
          <div className="flex items-center justify-between border-b-[3px] border-[#1C1611] pb-4">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1C1611]">
              Library
            </h2>
            <span className="text-xs font-black uppercase px-3 py-1 bg-[#1C1611] text-white rounded-lg">
              {lessons.length}
            </span>
          </div>
          
          {lessons.length === 0 ? (
            <div className="w-full bg-white border-[3.5px] border-dashed border-[#1C1611]/30 rounded-3xl py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="w-16 h-16 bg-[#F6F0DD] rounded-2xl border-2 border-[#1C1611]/30 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-[#1C1611]/40" />
              </div>
              <h3 className="text-xl font-black uppercase text-[#1C1611]/60">Empty Library</h3>
              <p className="text-sm font-bold text-[#1C1611]/40 mt-2">This author has not published any public lessons yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {lessons.map(lesson => (
                <LessonCard 
                  key={lesson._id} 
                  lesson={{
                    ...lesson,
                    authorName: profile.name,
                    authorImage: profile.image,
                    authorPhotoURL: profile.photoURL
                  }} 
                />
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}