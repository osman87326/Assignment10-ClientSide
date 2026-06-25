"use client";

import { useState } from "react";
import { ShieldAlert, Send } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function BannedScreen({ appealStatus: initialAppealStatus }) {
    const [appealStatus, setAppealStatus] = useState(initialAppealStatus);
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAppeal = async (e) => {
        e.preventDefault();
        if (!reason.trim()) {
            toast.error("Please provide a reason for your appeal.");
            return;
        }

        setIsSubmitting(true);
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;

                        const res = await fetch(`/api/backend/users/appeal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ reason })
            });

            const data = await res.json();
            if (res.ok && data.success) {
                toast.success("Appeal submitted successfully.");
                setAppealStatus("pending");
            } else {
                toast.error(data.message || "Failed to submit appeal.");
            }
        } catch (error) {
            console.error("Appeal error:", error);
            toast.error("An error occurred while submitting the appeal.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/";
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white border-[3.5px] border-[#1C1611] rounded-3xl p-8 sm:p-10 shadow-[12px_12px_0px_0px_#1C1611] flex flex-col items-center text-center">
                
                <div className="w-20 h-20 bg-[#FF4A3A] border-[3.5px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] rounded-2xl flex items-center justify-center mb-6">
                    <ShieldAlert className="w-10 h-10 text-white stroke-[2.5px]" />
                </div>
                
                <h1 className="text-3xl font-black uppercase text-[#1C1611] tracking-tight mb-3">
                    Account Suspended
                </h1>
                
                <p className="text-sm font-bold text-[#1C1611]/70 mb-8 max-w-sm">
                    Your account has been suspended due to violations of our community guidelines. You cannot access your dashboard or create new content.
                </p>

                {appealStatus === "pending" ? (
                    <div className="w-full bg-[#FCD34D] border-[3.5px] border-[#1C1611] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1C1611] mb-8">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] tracking-tight mb-2">Appeal Under Review</h3>
                        <p className="text-xs font-bold text-[#1C1611]/80">
                            Your appeal is currently being reviewed by our moderation team. We will notify you once a decision has been made.
                        </p>
                    </div>
                ) : appealStatus === "rejected" ? (
                    <div className="w-full bg-[#FF4A3A]/20 border-[3.5px] border-[#1C1611] rounded-2xl p-6 shadow-[6px_6px_0px_0px_#1C1611] mb-8">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] tracking-tight mb-2">Appeal Rejected</h3>
                        <p className="text-xs font-bold text-[#1C1611]/80">
                            Your previous appeal was reviewed and rejected. The suspension remains active.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleAppeal} className="w-full text-left mb-8">
                        <label className="block text-xs font-black uppercase text-[#1C1611] mb-2 tracking-widest">
                            Submit an Appeal
                        </label>
                        <textarea 
                            className="w-full h-32 p-4 bg-[#F6F0DD] border-[2.5px] border-[#1C1611] rounded-2xl font-bold text-sm text-[#1C1611] focus:outline-none focus:bg-white shadow-[4px_4px_0px_0px_#1C1611] transition-all resize-none mb-4"
                            placeholder="Explain why you believe this suspension is a mistake..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            disabled={isSubmitting}
                        ></textarea>
                        
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-[#1C1611] text-white border-[2.5px] border-[#1C1611] rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#FF4A3A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#FF4A3A] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0px_0px_0px_0px_#FF4A3A] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4 stroke-[2.5px]" /> 
                            {isSubmitting ? "Submitting..." : "Send Appeal"}
                        </button>
                    </form>
                )}

                <button 
                    onClick={handleLogout}
                    className="text-xs font-black uppercase text-[#1C1611]/60 hover:text-[#FF4A3A] transition-colors underline underline-offset-4"
                >
                    Sign out of this account
                </button>
            </div>
        </div>
    );
}