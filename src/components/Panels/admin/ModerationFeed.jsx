"use client";

import { Eye, ShieldAlert, Trash2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ModerationFeed({ reports }) {
    const queueData = reports || [];
    const [selectedReport, setSelectedReport] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null);

    const executeAction = async () => {
        if (!confirmAction) return;
        
        try {
            const tokenRes = await authClient.token();
            const token = tokenRes?.data?.token;
            if (!token) return;

                        
            if (confirmAction.type === 'remove') {
                const res = await fetch(`/api/backend/admin/lessons/${confirmAction.report.lessonId}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    toast.success("Lesson and associated reports deleted.");
                } else {
                    toast.error(data.message || "Failed to delete lesson.");
                    return;
                }
            } else if (confirmAction.type === 'dismiss') {
                const res = await fetch(`/api/backend/admin/reports/${confirmAction.report._id}`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });
                const data = await res.json();
                if (data.success) {
                    toast.success("Report dismissed.");
                } else {
                    toast.error(data.message || "Failed to dismiss report.");
                    return;
                }
            }
            
            setConfirmAction(null);
            setSelectedReport(null);
            window.location.reload();
        } catch (err) {
            console.error("Error executing action:", err);
            toast.error("An error occurred while executing the action.");
            setConfirmAction(null);
        }
    };

    const handleRemovePost = (report) => {
        setConfirmAction({ type: 'remove', report });
    };

    const handleDismissReport = (report) => {
        setConfirmAction({ type: 'dismiss', report });
    };

    return (
        <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#1C1611] flex flex-col justify-between">
            <div>
                <div className="flex items-center justify-between gap-4 mb-6 border-b-[3.5px] border-[#1C1611] pb-4">
                    <h3 className="text-xl font-black text-[#1C1611] uppercase tracking-tight">Urgent Moderation Feed</h3>
                    <Link href="/admin/queue" className="text-xs text-[#1C1611] hover:underline font-bold font-sans uppercase flex items-center gap-1">View All Queue</Link>
                </div>

                <div className="w-full overflow-x-auto min-w-0">
                    <table className="table w-full border-collapse min-w-[500px] lg:min-w-0">
                        <thead>
                            <tr className="border-b-[2.5px] border-[#1C1611]/20 text-[10px] font-sans font-black tracking-widest text-[#1C1611]/50 uppercase">
                                <th className="pb-3 text-left w-[55%]">Report Reason</th>
                                <th className="pb-3 text-left w-[20%]">Reporter</th>
                                <th className="pb-3 text-left w-[15%]">Status</th>
                                <th className="pb-3 text-center w-[10%]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-[2.5px] divide-[#1C1611]/10">
                            {queueData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-[#1C1611]/40 font-bold text-xs uppercase">
                                        No pending reports.
                                    </td>
                                </tr>
                            ) : queueData.slice(0, 5).map((row) => (
                                <tr key={row._id} className="group">
                                    <td className="py-4 pr-3 min-w-0">
                                        <h4 className="text-sm font-sans font-black text-[#1C1611] truncate group-hover:text-[#FF4A3A] transition-colors">{row.reason || "Flagged Lesson"}</h4>
                                        <p className="text-[11px] font-sans font-bold text-[#1C1611]/60 mt-0.5 whitespace-nowrap uppercase">Reported Content • {new Date(row.timestamp || Date.now()).toLocaleDateString()}</p>
                                    </td>
                                    <td className="py-4 text-xs font-sans font-bold text-[#1C1611]/70 whitespace-nowrap">{row.reporterId?.substring(0, 8) || "Anonymous"}</td>
                                    <td className="py-4 whitespace-nowrap">
                                        <span className="inline-block text-[10px] font-black uppercase tracking-wider bg-[#FFB3A7] border-2 border-[#1C1611] text-[#1C1611] px-2 py-0.5 rounded-lg shadow-[2px_2px_0px_0px_#1C1611]">
                                            Needs Review
                                        </span>
                                    </td>
                                    <td className="py-4 text-center whitespace-nowrap">
                                        <button onClick={() => setSelectedReport(row)} className="inline-block text-[#1C1611]/50 hover:text-[#1C1611] transition-colors cursor-pointer" aria-label="Review flagged item">
                                            <Eye className="w-5 h-5 mx-auto stroke-[2.5px]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {selectedReport && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col">
                        <div className="bg-[#FFB3A7] border-b-[3.5px] border-[#1C1611] p-5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShieldAlert className="w-6 h-6 text-[#FF4A3A] stroke-[2.5px]" />
                                <h2 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">Report Details</h2>
                            </div>
                            <button onClick={() => setSelectedReport(null)} className="text-[#1C1611] font-black hover:text-[#FF4A3A]">X</button>
                        </div>
                        <div className="p-6 flex flex-col gap-4 text-sm font-bold text-[#1C1611]">
                            <div>
                                <span className="block text-[10px] text-[#1C1611]/60 font-black uppercase tracking-widest mb-1">Reason</span>
                                <p className="text-lg uppercase">{selectedReport.reason}</p>
                            </div>
                            <div>
                                <span className="block text-[10px] text-[#1C1611]/60 font-black uppercase tracking-widest mb-1">Reporter</span>
                                <p>{selectedReport.reporterId || "Anonymous"}</p>
                            </div>
                            <div>
                                <span className="block text-[10px] text-[#1C1611]/60 font-black uppercase tracking-widest mb-1">Date</span>
                                <p>{new Date(selectedReport.timestamp || Date.now()).toLocaleString()}</p>
                            </div>
                            
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t-[2.5px] border-[#1C1611]/10">
                                <Link 
                                    href={`/lessons/${selectedReport.lessonId}`} 
                                    className="w-full flex items-center justify-center gap-2 bg-[#4DD0B1] text-[#1C1611] border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                                >
                                    <Eye className="w-4 h-4 stroke-[2.5px]" /> View Lesson
                                </Link>

                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleRemovePost(selectedReport)} 
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#FF4A3A] text-white border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                                    >
                                        <Trash2 className="w-4 h-4 stroke-[2.5px]" /> Remove Post
                                    </button>
                                    <button 
                                        onClick={() => handleDismissReport(selectedReport)} 
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#FCD34D] text-[#1C1611] border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                                    >
                                        <CheckCircle className="w-4 h-4 stroke-[2.5px]" /> Keep Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col p-6">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] ${confirmAction.type === 'remove' ? 'bg-[#FF4A3A] text-white' : 'bg-[#FCD34D] text-[#1C1611]'}`}>
                                <ShieldAlert className="w-6 h-6 stroke-[2.5px]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">Confirm Action</h3>
                                <p className="text-sm font-bold text-[#1C1611]/70 mt-2">
                                    {confirmAction.type === 'remove' 
                                        ? "Are you sure you want to permanently delete this lesson and all its reports?" 
                                        : "Are you sure you want to dismiss this report? The post will be kept."}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={() => setConfirmAction(null)} 
                                className="flex-1 bg-white text-[#1C1611] border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={executeAction} 
                                className={`flex-1 text-white border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all ${confirmAction.type === 'remove' ? 'bg-[#FF4A3A]' : 'bg-[#1C1611]'}`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}