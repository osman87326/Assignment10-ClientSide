import { LessonsPageHeader, LessonsSearchFilters, LessonsGrid } from "@/components/lessons";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

// Move fetch outside or keep inside, but call it here

export const metadata = {
  title: "Lessons",
};

async function getLessons(searchParams) {
  const headersList = await headers();
  
  // Try to retrieve the user's JWT token on the server
  let token = "";
  try {
    const cookie = headersList.get('cookie') || '';
    const tokenRes = await fetch(`${process.env.BETTER_AUTH_URL}/api/auth/token`, {
      headers: cookie ? { cookie } : {},
      cache: 'no-store'
    });
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      token = tokenData?.token || "";
    }
  } catch (err) {
    console.error("Error fetching token on server:", err);
  }

  const baseUrl = `${process.env.SERVER_URL || 'http://localhost:3100'}/api/lessons`;
  const params = new URLSearchParams({
    search: searchParams.search || '',
    category: searchParams.category || '',
    emotionalTone: searchParams.emotionalTone || '',
    sortBy: searchParams.sortBy || 'newest',
    page: searchParams.page || '1',
    limit: searchParams.limit || '6',
  });

  const fetchHeaders = {};
  if (token) {
    fetchHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${baseUrl}?${params.toString()}`, { 
    headers: fetchHeaders,
    cache: 'no-store' 
  });
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return res.json();
}

async function getFilters() {
  try {
    const res = await fetch(`${process.env.SERVER_URL || 'http://localhost:3100'}/api/lessons/filters`, { cache: 'no-store' });
    if (!res.ok) return { categories: [], tones: [] };
    const data = await res.json();
    return { categories: data.categories || [], tones: data.tones || [] };
  } catch (error) {
    console.error("Failed to fetch filters", error);
    return { categories: [], tones: [] };
  }
}

export default async function LessonsPage({ searchParams }) {
  // Await searchParams since it's a Promise in Next.js 15+
  const resolvedSearchParams = await searchParams;
  
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList
  });

  if (!session) {
    redirect("/login");
  }

  // Fetch the data in parallel
  const [lessons, filters] = await Promise.all([
    getLessons(resolvedSearchParams),
    getFilters()
  ]);

  return (
    <main className="bg-[#F6F0DD] min-h-screen">
      <LessonsPageHeader />
      <div className="bg-[#F6F0DD] px-gutter py-8">
        <LessonsSearchFilters 
          variant="public" 
          placeholder="Search lessons..." 
          availableCategories={filters.categories}
          availableTones={filters.tones}
        />
      </div>
      {/* Pass the data to your grid */}
      <LessonsGrid lessons={lessons} />
    </main>
  );
}