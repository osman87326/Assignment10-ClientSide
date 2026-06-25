import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F6F0DD] flex items-center justify-center px-4 pt-24">
      <div className="max-w-lg w-full bg-[#4DD0B1] border-[3.5px] border-[#1C1611] rounded-3xl p-10 text-center shadow-[6px_6px_0px_0px_#1C1611]">
        <h1 className="text-3xl font-black uppercase mb-3">Payment Successful</h1>
        <p className="text-sm font-bold mb-8">
          Welcome to Premium! Your lifetime access is being activated.
        </p>
        <Link href="/dashboard" className="inline-flex bg-[#FF4A3A] text-white font-black uppercase px-6 py-3 rounded-xl border-2 border-[#1C1611]">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
