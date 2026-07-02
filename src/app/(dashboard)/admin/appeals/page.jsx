"use client";

import { CheckCircle, XCircle, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function AdminAppealsPage() {
    const [appeals, setAppeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [confirmAction, setConfirmAction] = useState(null);

    useEffect(() => {
        const fetchAppeals = async () => {
            try {
                const tokenRes = await authClient.token();
                const jwt = tokenRes?.data?.token;
                setToken(jwt);

                if (jwt) {
                                        const res = await fetch(`/api/backend/admin/appeals`, {
                        headers: { "Authorization": `Bearer ${jwt}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setAppeals(data.data || []);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch appeals:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppeals();
    }, []);

    const handleAppealAction = (appealId, status) => {
        setConfirmAction({ appealId, status });
    };

    const executeAction = async () => {
        if (!confirmAction) return;
        const { appealId, status } = confirmAction;

        try {
                        const res = await fetch(`/api/backend/admin/appeals/${appealId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });

            if (res.ok) {
                toast.success(`Appeal ${status} successfully.`);
                setAppeals(appeals.map(a => a._id === appealId ? { ...a, status } : a));
            } else {
                toast.error("Failed to process appeal.");
            }
        } catch (error) {
            console.error("Appeal action error:", error);
            toast.error("An error occurred processing the appeal.");
        } finally {
            setConfirmAction(null);
        }
    };

    const pendingAppeals = appeals.filter(a => a.status === 'pending');
    const resolvedAppeals = appeals.filter(a => a.status !== 'pending');

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none font-sans">
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">
                
                <header className="border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-xs font-black tracking-widest text-[#1C1611] uppercase block mb-1">
                        Admin Control Center
                    </span>
                    <h1 className="text-3xl font-black text-[#1C1611] tracking-tight uppercase">
                        Ban Appeals
                    </h1>
                    <p className="text-sm text-[#1C1611]/80 font-bold mt-1.5">
                        Review requests from suspended users and determine if their accounts should be reinstated.
                    </p>
                </header>

                <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden">
                    <div className="border-b-[3.5px] border-[#1C1611] bg-[#FCD34D] p-5">
                        <h2 className="text-lg font-black uppercase text-[#1C1611] tracking-tight flex items-center gap-2">
                            <FileText className="w-5 h-5 stroke-[2.5px]" /> Pending Appeals ({pendingAppeals.length})
                        </h2>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full border-collapse min-w-[600px] lg:min-w-0">
                            <thead>
                                <tr className="border-b-[3.5px] border-[#1C1611] text-[11px] font-black tracking-widest text-[#1C1611]/50 uppercase bg-black/5">
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">User Identity</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20 w-1/2">Appeal Reason</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Date Submitted</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[2.5px] divide-[#1C1611]/10 text-sm font-bold">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-[#1C1611]/50 uppercase tracking-wider font-black text-xs">Loading appeals...</td>
                                    </tr>
                                ) : pendingAppeals.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="p-8 text-center text-[#1C1611]/50 uppercase tracking-wider font-black text-xs">No pending appeals found.</td>
                                    </tr>
                                ) : pendingAppeals.map((appeal) => (
                                    <tr key={appeal._id} className="hover:bg-[#F6F0DD]/50 transition-colors group">
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                            <div className="font-black text-[#1C1611] uppercase">{appeal.user?.name || 'Unknown User'}</div>
                                            <div className="text-xs text-[#1C1611]/60 mt-1">{appeal.user?.email}</div>
                                        </td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]">
                                            <p className="whitespace-pre-wrap">{appeal.reason}</p>
                                        </td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]/70">
                                            {new Date(appeal.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-4">
                                                <button 
                                                    onClick={() => handleAppealAction(appeal._id, 'approved')}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#4DD0B1] text-[#1C1611] border-[2px] border-[#1C1611] font-black uppercase text-[10px] rounded-lg shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                                                >
                                                    <CheckCircle className="w-3.5 h-3.5 stroke-[2.5px]" /> Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleAppealAction(appeal._id, 'rejected')}
                                                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FF4A3A] text-white border-[2px] border-[#1C1611] font-black uppercase text-[10px] rounded-lg shadow-[2px_2px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                                                >
                                                    <XCircle className="w-3.5 h-3.5 stroke-[2.5px]" /> Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {resolvedAppeals.length > 0 && (
                    <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden opacity-70">
                        <div className="border-b-[3.5px] border-[#1C1611] bg-[#1C1611]/10 p-5">
                            <h2 className="text-lg font-black uppercase text-[#1C1611] tracking-tight">Resolved Appeals History</h2>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="table w-full border-collapse min-w-[600px] lg:min-w-0">
                                <thead>
                                    <tr className="border-b-[3.5px] border-[#1C1611] text-[11px] font-black tracking-widest text-[#1C1611]/50 uppercase bg-black/5">
                                        <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">User Identity</th>
                                        <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Decision</th>
                                        <th className="p-5 text-left">Date Resolved</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-[2.5px] divide-[#1C1611]/10 text-sm font-bold">
                                    {resolvedAppeals.map((appeal) => (
                                        <tr key={appeal._id}>
                                            <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                                <div className="font-black text-[#1C1611] uppercase">{appeal.user?.name || 'Unknown User'}</div>
                                            </td>
                                            <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                                <span className={`inline-block px-3 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] ${appeal.status === 'approved' ? 'bg-[#4DD0B1]' : 'bg-[#FF4A3A] text-white'}`}>
                                                    {appeal.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-[#1C1611]/70">
                                                {appeal.resolvedAt ? new Date(appeal.resolvedAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {confirmAction && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col p-6">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] ${confirmAction.status === 'rejected' ? 'bg-[#FF4A3A] text-white' : 'bg-[#4DD0B1] text-[#1C1611]'}`}>
                                {confirmAction.status === 'rejected' ? <XCircle className="w-6 h-6 stroke-[2.5px]" /> : <CheckCircle className="w-6 h-6 stroke-[2.5px]" />}
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">Confirm Action</h3>
                                <p className="text-sm font-bold text-[#1C1611]/70 mt-2">
                                    Are you sure you want to {confirmAction.status} this appeal?
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
                                className={`flex-1 text-white border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all ${confirmAction.status === 'rejected' ? 'bg-[#FF4A3A]' : 'bg-[#1C1611]'}`}
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