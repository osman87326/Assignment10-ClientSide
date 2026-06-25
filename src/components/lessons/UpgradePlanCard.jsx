import { authClient } from "@/lib/auth-client";
import Link from "next/link";


export default function UpgradePlanCard() {
  const sessionData = authClient.useSession();

  // Destructure the properties from the object returned by the hook
  const { data: session, isPending } = sessionData;

  // 1. Handle loading state
  if (isPending) {
    return (
      <div className="w-full h-20 bg-gray-200 border-[2.5px] border-gray-300 rounded-lg animate-pulse" />
    );
  }

  // 2. Handle missing session
  if (!session) {
    return null;
  }

  // 3. Now it is safe to destructure the user
  const { user } = session;

  if (user?.isPremium) return null;
  return (
    <div className="w-full bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-xl p-4 flex flex-col gap-4 mt-auto shadow-[3px_3px_0px_0px_#1C1611]">
      <div>
        <h4 className="text-xs font-black uppercase text-[#1C1611] tracking-wide">
          Upgrade Plan
        </h4>
        <p className="text-[10px] font-bold text-[#1C1611]/70 leading-relaxed mt-1 uppercase">
          Unlock detailed editorial metrics and private collections.
        </p>
      </div>
      <Link
        href="/pricing"
        className="w-full h-9 bg-[#FF4A3A] text-[#1C1611] font-black uppercase text-xs rounded-lg flex items-center justify-center border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer"
      >
        Explore Pro
      </Link>
    </div>
  );
}