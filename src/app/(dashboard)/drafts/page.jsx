import { FileText } from "lucide-react";
import { LessonsTable } from "@/components/lessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Drafts",
  description: "Your private, unpublished lessons and works in progress.",
};

async function getMyDrafts(userId, headersList) {
  try {
    const tokenRes = await fetch("http://localhost:3000/api/auth/token", {
      headers: headersList,
      cache: "no-store",
    });
    let token = "";
    if (tokenRes.ok) {
      const tokenData = await tokenRes.json();
      token = tokenData?.token || "";
    }
    if (!token) return [];

    const serverUrl = process.env.SERVER_URL || "http://localhost:3100";
    const res = await fetch(`${serverUrl}/api/users/${userId}/drafts`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch (err) {
    console.error("Error fetching drafts:", err);
    return [];
  }
}

export default async function DraftsPage() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect("/login");
  }

  const drafts = await getMyDrafts(session.user.id, headersList);

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3.5px] border-[#1C1611] pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] mb-1.5 flex items-center gap-3">
              <FileText className="w-8 h-8 stroke-[2.5px]" />
              My Drafts
            </h1>
            <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase">
              Your private, unpublished lessons and works in progress.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-[#FCD34D] border-2 border-[#1C1611] rounded-xl px-4 h-10 shadow-[2px_2px_0px_0px_#1C1611]">
            <span className="text-xs font-black uppercase text-[#1C1611]">
              {drafts.length} Draft{drafts.length !== 1 ? "s" : ""}
            </span>
          </div>
        </header>

        <main className="w-full flex flex-col gap-6 min-w-0">
          <LessonsTable lessons={drafts} />
        </main>
      </div>
    </div>
  );
}
