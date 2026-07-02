import Link from "next/link";
import { XCircle, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Payment Canceled - Life Lessons",
};

export default function CanceledPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F6F0DD] px-gutter w-full">
      <div className="max-w-md w-full bg-[#FFB3A7] border-[3.5px] border-[#1C1611] rounded-2xl shadow-[8px_8px_0px_0px_#1C1611] p-8 md:p-12 text-center flex flex-col items-center">
        
        {/* Error/Cancel Icon */}
        <div className="w-20 h-20 bg-[#F6F0DD] rounded-full border-[3px] border-[#1C1611] flex items-center justify-center mb-6 shadow-[3px_3px_0px_0px_#1C1611]">
          <XCircle className="w-10 h-10 text-[#FF4A3A] stroke-[2.5px]" />
        </div>

        {/* Text content */}
        <h1 className="text-3xl font-black uppercase text-[#1C1611] tracking-tight mb-4">
          Checkout Canceled
        </h1>
        <p className="text-[#1C1611]/85 font-medium mb-8">
          Your payment process was safely aborted. You have not been charged.
          Whenever you are ready, you can always upgrade your account from the pricing page.
        </p>

        {/* Call to action */}
        <div className="flex flex-col gap-3 w-full">
          <Link
            href="/pricing"
            className="w-full h-14 bg-[#FCD34D] text-[#1C1611] border-[3px] border-[#1C1611] font-black uppercase text-sm tracking-wider rounded-xl shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center"
          >
            Try Again
          </Link>
          
          <Link
            href="/home"
            className="w-full h-14 bg-[#F6F0DD] text-[#1C1611] border-[3px] border-[#1C1611] font-black uppercase text-sm tracking-wider rounded-xl shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            <span>Return to Home</span>
          </Link>
        </div>
        
      </div>
    </div>
  );
}