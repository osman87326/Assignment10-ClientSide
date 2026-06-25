import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import SuccessClient from "./SuccessClient";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Payment Successful - Life Lessons",
};

export default async function SuccessPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  const dashboardHref = session?.user?.role === "admin" ? "/admin/dashboard" : "/performance";

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F6F0DD] px-gutter w-full">
      <div className="max-w-md w-full bg-[#4DD0B1] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[8px_8px_0px_0px_#1C1611] p-8 md:p-12 text-center flex flex-col items-center">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-[#F6F0DD] rounded-full border-[3px] border-[#1C1611] flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#1C1611]">
          <CheckCircle2 className="w-10 h-10 text-[#1C1611] stroke-[2.5px]" />
        </div>

        {/* Text content */}
        <h1 className="text-3xl font-black uppercase text-[#1C1611] tracking-tight mb-4">
          Payment Successful!
        </h1>
        <p className="text-[#1C1611]/85 font-medium mb-8">
          Welcome to <span className="font-bold text-[#1C1611]">Life Lessons Mastery</span>. Your account has been securely upgraded and premium features are now unlocked.
        </p>

        {/* Call to action */}
        <Link
          href={dashboardHref}
          className="w-full h-14 bg-[#FCD34D] text-[#1C1611] border-[3px] border-[#1C1611] font-black uppercase text-sm tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
        </Link>
        
        
        <SuccessClient />
      </div>
    </div>
  );
}