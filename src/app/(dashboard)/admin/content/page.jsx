"use client";

import { Eye, ArrowUpRight, FileText, Trash2, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

export default function SystemContentPage() {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const tokenRes = await authClient.token();
                const jwt = tokenRes?.data?.token;
                setToken(jwt);

                if (jwt) {
                    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100';
                    const res = await fetch(`${serverUrl}/api/admin/lessons`, {
                        headers: { "Authorization": `Bearer ${jwt}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setLessons(data.data || []);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch lessons:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLessons();
    }, []);

    const handleFeatureToggle = async (lessonId, currentStatus) => {
        try {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100';
            const res = await fetch(`${serverUrl}/api/admin/lessons/${lessonId}/feature`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ isFeatured: !currentStatus })
            });

            if (res.ok) {
                toast.success(!currentStatus ? "Lesson Featured" : "Lesson Un-featured");
                setLessons(lessons.map(l => l._id === lessonId ? { ...l, isFeatured: !currentStatus } : l));
            } else {
                toast.error("Failed to update feature status");
            }
        } catch (error) {
            console.error("Feature toggle error:", error);
            toast.error("An error occurred");
        }
    };

    const handleDeleteLesson = (lessonId) => {
        setConfirmDelete(lessonId);
    };

    const executeDelete = async () => {
        if (!confirmDelete) return;
        const lessonId = confirmDelete;

        try {
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3100';
            const res = await fetch(`${serverUrl}/api/admin/lessons/${lessonId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                toast.success("Lesson deleted successfully");
                setLessons(lessons.filter(l => l._id !== lessonId));
            } else {
                toast.error("Failed to delete lesson");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred");
        } finally {
            setConfirmDelete(null);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none font-sans">
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-xs font-black tracking-widest text-[#1C1611] uppercase block mb-1">
                        Global Index
                    </span>
                    <h1 className="text-3xl font-black text-[#1C1611] tracking-tight uppercase">
                        System Content
                    </h1>
                    <p className="text-sm text-[#1C1611]/80 font-bold mt-1.5">
                        Audit public asset distributions, observe engagement metrics, and enforce global editorial policies.
                    </p>
                </header>

                {/* Mini Aggregate Grid */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                    {[
                        { label: "Total Indexed Lessons", count: loading ? "..." : lessons.length, sub: "Across the platform", style: "bg-[#4DD0B1]" },
                        { label: "Accumulated Likes", count: loading ? "..." : lessons.reduce((acc, curr) => acc + (curr.likesCount || 0), 0), sub: "Total engagement", style: "bg-[#FCD34D]" },
                        { label: "Private Draft Pools", count: loading ? "..." : lessons.filter(l => l.visibility === "Private").length, sub: "Unpublished raw data modules", style: "bg-[#FFB3A7]" },
                    ].map((stat, i) => (
                        <div key={i} className={`border-[3.5px] border-[#1C1611] rounded-2xl shadow-[6px_6px_0px_0px_#1C1611] p-5 flex flex-col justify-between min-h-[125px] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#1C1611] text-[#1C1611] ${stat.style}`}>
                            <span className="text-[10px] font-black tracking-widest uppercase opacity-80">{stat.label}</span>
                            <h3 className="text-4xl font-black tracking-tight leading-none mt-2">{stat.count}</h3>
                            <p className="text-xs font-bold mt-4 opacity-90">{stat.sub}</p>
                        </div>
                    ))}
                </section>

                {/* Global Asset Table */}
                <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden mt-2">
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full border-collapse min-w-[600px] lg:min-w-0">
                            <thead>
                                <tr className="border-b-[3.5px] border-[#1C1611] bg-[#4DD0B1] text-[11px] font-black tracking-widest text-[#1C1611] uppercase">
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Document Title</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Author Profile</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Total Views</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Visibility state</th>
                                    <th className="p-5 text-center">Review</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[2.5px] divide-[#1C1611]/10 text-sm font-bold">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-[#1C1611]/50 uppercase tracking-wider font-black text-xs">Loading lessons...</td>
                                    </tr>
                                ) : lessons.map((lesson) => (
                                    <tr key={lesson._id} className="hover:bg-[#F6F0DD]/50 transition-colors group">
                                        <td className="p-5 flex items-center gap-3 border-r-[2.5px] border-[#1C1611]/10">
                                            <FileText className="w-5 h-5 text-[#1C1611]/50 shrink-0 stroke-[2.5px]" />
                                            <span className="font-black text-[#1C1611] uppercase truncate group-hover:text-[#4DD0B1] transition-colors">{lesson.title}</span>
                                        </td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]/80">{lesson.creator?.name || "Unknown"}</td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]/80">{lesson.likesCount || 0} Likes</td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                            <span className="text-[10px] uppercase font-black tracking-widest text-[#1C1611]/60">• {lesson.visibility || "Public"}</span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <div className="flex items-center justify-center gap-4 text-[#1C1611]/50">
                                                <button onClick={() => handleFeatureToggle(lesson._id, lesson.isFeatured)} className={`${lesson.isFeatured ? "text-[#FCD34D]" : "hover:text-[#FCD34D]"} transition-colors cursor-pointer`} title={lesson.isFeatured ? "Un-feature" : "Feature Lesson"}>
                                                    <Star className={`w-5 h-5 stroke-[2.5px] ${lesson.isFeatured ? "fill-[#FCD34D] stroke-[#FCD34D]" : ""}`} />
                                                </button>
                                                <Link href={`/lessons/${lesson._id}`} className="hover:text-[#4DD0B1] transition-colors cursor-pointer" title="Inspect full lesson text">
                                                    <ArrowUpRight className="w-5 h-5 stroke-[2.5px]" />
                                                </Link>
                                                <button onClick={() => handleDeleteLesson(lesson._id)} className="hover:text-[#FF4A3A] transition-colors cursor-pointer" title="Permanently Delete">
                                                    <Trash2 className="w-5 h-5 stroke-[2.5px]" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Confirmation Modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1C1611]/60 backdrop-blur-sm">
                    <div className="w-full max-w-sm bg-[#F6F0DD] border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden flex flex-col p-6">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border-[3px] border-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] bg-[#FF4A3A] text-white">
                                <Trash2 className="w-6 h-6 stroke-[2.5px]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black uppercase text-[#1C1611] tracking-tight">Confirm Delete</h3>
                                <p className="text-sm font-bold text-[#1C1611]/70 mt-2">
                                    Are you sure you want to permanently delete this lesson? This action cannot be undone.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button 
                                onClick={() => setConfirmDelete(null)} 
                                className="flex-1 bg-white text-[#1C1611] border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={executeDelete} 
                                className="flex-1 bg-[#FF4A3A] text-white border-[2.5px] border-[#1C1611] font-black uppercase text-xs py-2.5 rounded-xl shadow-[2.5px_2.5px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1.5px_1.5px_0px_0px_#1C1611] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}