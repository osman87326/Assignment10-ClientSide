"use client";

import { Shield, UserMinus, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function ManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
        }, 300);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const tokenRes = await authClient.token();
                const jwt = tokenRes?.data?.token;
                setToken(jwt);

                if (jwt) {
                                        const res = await fetch(`/api/backend/admin/users?search=${encodeURIComponent(debouncedSearch)}`, {
                        headers: { "Authorization": `Bearer ${jwt}` }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        setUsers(data.data || []);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [debouncedSearch]);

    const handleRoleChange = async (userId, currentRole) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';
        try {
                        const res = await fetch(`/api/backend/admin/users/${userId}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ role: newRole })
            });

            if (res.ok) {
                toast.success(`User role updated to ${newRole}`);
                setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
            } else {
                toast.error("Failed to update role");
            }
        } catch (error) {
            console.error("Role update error:", error);
            toast.error("An error occurred");
        }
    };

    const handleBanUser = async (userId, currentBanStatus) => {
        const newBanStatus = !currentBanStatus;
        try {
                        const res = await fetch(`/api/backend/admin/users/${userId}/ban`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ banned: newBanStatus })
            });

            if (res.ok) {
                toast.success(newBanStatus ? "User has been suspended" : "User ban lifted");
                setUsers(users.map(u => u._id === userId ? { ...u, isBanned: newBanStatus } : u));
            } else {
                toast.error("Failed to update ban status");
            }
        } catch (error) {
            console.error("Ban update error:", error);
            toast.error("An error occurred");
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none font-sans">
            <div className="max-w-6xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-xs font-black tracking-widest text-[#1C1611] uppercase block mb-1">
                        Control Panel
                    </span>
                    <h1 className="text-3xl font-black text-[#1C1611] tracking-tight uppercase">
                        Manage Users
                    </h1>
                    <p className="text-sm text-[#1C1611]/80 font-bold mt-1.5">
                        Administer global user access levels, modify credential parameters, and control suspensions.
                    </p>
                </header>

                {/* Search Strip */}
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:max-w-md">
                        <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#1C1611]/50">
                            <Search className="w-4 h-4 stroke-[2.5px]" />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users by name or email..."
                            className="w-full h-12 pl-11 pr-4 bg-white border-[2.5px] border-[#1C1611] text-[#1C1611] text-sm font-bold rounded-xl focus:outline-none shadow-[3px_3px_0px_0px_#1C1611]"
                        />
                    </div>
                    <button className="h-12 px-5 bg-[#FCD34D] border-[2.5px] border-[#1C1611] rounded-xl text-xs font-black uppercase tracking-wider text-[#1C1611] shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] flex items-center gap-2 self-end sm:self-auto transition-all cursor-pointer">
                        <Filter className="w-4 h-4 stroke-[2.5px]" /> Filter Roles
                    </button>
                </div>

                {/* Datatable Frame */}
                <div className="w-full bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] overflow-hidden">
                    <div className="w-full overflow-x-auto">
                        <table className="table w-full border-collapse min-w-[600px] lg:min-w-0">
                            <thead>
                                <tr className="border-b-[3.5px] border-[#1C1611] bg-[#FFB3A7] text-[11px] font-black tracking-widest text-[#1C1611] uppercase">
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">User Identity</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">System Role</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Registration</th>
                                    <th className="p-5 text-left border-r-[2.5px] border-[#1C1611]/20">Account Status</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-[2.5px] divide-[#1C1611]/10 text-sm font-bold">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-[#1C1611]/50 uppercase tracking-wider font-black text-xs">Loading users...</td>
                                    </tr>
                                ) : users.map((user) => (
                                    <tr key={user._id} className="hover:bg-[#F6F0DD]/50 transition-colors group">
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                            <div className="font-black text-[#1C1611] uppercase">{user.name}</div>
                                            <div className="text-xs text-[#1C1611]/60 mt-1">{user.email}</div>
                                        </td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]">
                                            <span className={`inline-block px-3 py-1 rounded-xl text-[10px] uppercase font-black tracking-widest border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] ${user.role === 'admin' ? 'bg-[#4DD0B1]' : 'bg-white'}`}>
                                                {user.role || 'user'}
                                            </span>
                                        </td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10 text-[#1C1611]/70">{new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-5 border-r-[2.5px] border-[#1C1611]/10">
                                            <span className={`inline-block text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl border-2 border-[#1C1611] shadow-[2px_2px_0px_0px_#1C1611] ${!user.isBanned ? "bg-[#FCD34D]" : "bg-[#FF4A3A] text-white"
                                                }`}>
                                                {!user.isBanned ? 'Active' : 'Suspended'}
                                            </span>
                                        </td>
                                        <td className="p-5">
                                            <div className="flex items-center justify-center gap-4 text-[#1C1611]/50">
                                                <button onClick={() => handleRoleChange(user._id, user.role || 'user')} className="hover:text-[#4DD0B1] transition-colors cursor-pointer" title="Toggle Admin Role"><Shield className="w-5 h-5 stroke-[2.5px] group-hover:stroke-[#1C1611]" /></button>
                                                <button onClick={() => handleBanUser(user._id, user.isBanned)} className="hover:text-[#FF4A3A] transition-colors cursor-pointer" title={user.isBanned ? "Lift Suspension" : "Suspend User"}><UserMinus className="w-5 h-5 stroke-[2.5px] group-hover:stroke-[#1C1611]" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}