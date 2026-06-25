import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#F6F0DD] flex items-center justify-center px-4 pt-24">
      <div className="max-w-lg w-full bg-[#FFB3A7] border-[3.5px] border-[#1C1611] rounded-3xl p-10 text-center shadow-[6px_6px_0px_0px_#1C1611]">
        <h1 className="text-3xl font-black uppercase mb-3">Payment Canceled</h1>
        <p className="text-sm font-bold mb-8">
          No charges were made. You can upgrade anytime from the pricing page.
        </p>
        <Link href="/pricing" className="inline-flex bg-[#FF4A3A] text-white font-black uppercase px-6 py-3 rounded-xl border-2 border-[#1C1611]">
          Back to Pricing
        </Link>
      </div>
    </div>
  );
}
