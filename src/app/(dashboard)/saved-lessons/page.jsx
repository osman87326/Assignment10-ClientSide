import { Bookmark } from "lucide-react";
import { LessonCard } from "@/components/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Saved Lessons",
  description: "Your bookmarked collection of lessons from the community.",
};

async function getSavedLessons(userId, headersList) {
  try {
    const cookie = headersList.get('cookie') || '';
    const tokenRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
      headers: cookie ? { cookie } : {},
      cache: 'no-store'
    });
    let token = "";
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      token = tokenData?.token || "";
    }
    if (!token) return [];

    const serverUrl = process.env.SERVER_URL || 'http://localhost:3100';
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/users/${userId}/favorites`, {
      headers: { "Authorization": `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.success) return [];
    // The aggregation returns objects with a nested lessonDetails field
    return (data.data || []).map(fav => {
      const details = fav.lessonDetails || {};
      const creator = details.creator || {};
      
      return {
        ...details,
        authorName: creator.name || "Unknown",
        authorImage: creator.image || creator.photoURL || null,
        savedAt: fav.savedAt,
        favoriteId: fav._id,
      };
    });
  } catch (err) {
    console.error("Error fetching saved lessons:", err);
    return [];
  }
}

export default async function SavedLessonsPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/login");
  }

  const savedLessons = await getSavedLessons(session.user.id, headersList);

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* Page Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3.5px] border-[#1C1611] pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] mb-1.5 flex items-center gap-3">
              <Bookmark className="w-8 h-8 stroke-[2.5px]" />
              Saved Lessons
            </h1>
            <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase">
              Your bookmarked collection of lessons from the community.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#4DD0B1] border-2 border-[#1C1611] rounded-xl px-4 h-10 shadow-[2px_2px_0px_0px_#1C1611]">
            <span className="text-xs font-black uppercase text-[#1C1611]">
              {savedLessons.length} Saved
            </span>
          </div>
        </header>

        {/* Main Content — Card Grid */}
        <main className="w-full min-w-0">
          {savedLessons.length === 0 ? (
            <div className="w-full bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] p-12 text-center">
              <Bookmark className="w-10 h-10 stroke-[2px] text-[#1C1611]/30 mx-auto mb-3" />
              <p className="text-sm font-black uppercase text-[#1C1611]/60">
                No saved lessons yet. Explore the community and bookmark lessons you love!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedLessons.map((lesson) => (
                <LessonCard
                  key={lesson._id}
                  lesson={lesson}
                  isSaved={true}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
