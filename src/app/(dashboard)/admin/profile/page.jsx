import { Shield, Mail, Key, Activity, Calendar } from "lucide-react";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Profile",
};

export default async function AdminProfilePage() {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });

    if (!session || session.user.role !== 'admin') {
        redirect("/home");
    }

    const user = session.user;
    const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A';

    return (
        <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">

                {/* Header Block */}
                <header className="border-b-[3.5px] border-[#1C1611] pb-6">
                    <span className="text-[10px] font-black tracking-widest text-[#1C1611]/70 uppercase block mb-1">
                        Identity Card
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611]">
                        Admin Profile
                    </h1>
                </header>

                {/* Profile Card Hero Component */}
                <div className="w-full bg-white border-[3px] border-[#1C1611] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-[4px_4px_0px_0px_#1C1611]">
                    {/* Avatar Container */}
                    <div className="w-24 h-24 rounded-2xl border-[3px] border-[#1C1611] relative overflow-hidden bg-[#4DD0B1] shrink-0 shadow-[3px_3px_0px_0px_#1C1611] flex items-center justify-center">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={`${user.name} Profile Avatar`}
                                fill
                                sizes="96px"
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#1C1611] font-black text-3xl uppercase">
                                {user.name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>

                    {/* Info Elements */}
                    <div className="flex-grow text-center sm:text-left flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start">
                            <h2 className="text-2xl font-black uppercase text-[#1C1611] tracking-tight">{user.name}</h2>
                            <span className="inline-flex items-center justify-center gap-1.5 bg-[#FFD338] border-[2.5px] border-[#1C1611] text-xs font-black uppercase text-[#1C1611] px-3 py-1 rounded-xl w-max mx-auto sm:mx-0 shadow-[2px_2px_0px_0px_#1C1611]">
                                <Shield className="w-3.5 h-3.5 stroke-[3px]" /> {user.isPremium ? 'Premium Admin' : 'Admin'}
                            </span>
                        </div>
                        <p className="text-xs text-[#1C1611]/80 font-bold uppercase mt-1 flex items-center justify-center sm:justify-start gap-2">
                            <Mail className="w-4 h-4 stroke-[2.5px]" /> {user.email}
                        </p>
                        <p className="text-[10px] text-[#1C1611]/60 font-black uppercase mt-1 flex items-center justify-center sm:justify-start gap-2">
                            <Calendar className="w-4 h-4 stroke-[2.5px]" /> Member since: {joinDate}
                        </p>
                    </div>
                </div>

                {/* Security / System Logs Section Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Account Details Block */}
                    <div className="md:col-span-2 bg-white border-[3px] border-[#1C1611] rounded-2xl p-6 flex flex-col gap-6 shadow-[4px_4px_0px_0px_#1C1611]">
                        <h3 className="text-lg font-black uppercase text-[#1C1611] flex items-center gap-2">
                            <Activity className="w-5 h-5 stroke-[2.5px]" /> Account Details
                        </h3>

                        <div className="flex flex-col gap-0 w-full divide-y-[3px] divide-[#1C1611]">
                            {[
                                { label: "User ID", value: user.id },
                                { label: "Role", value: user.role?.toUpperCase() || 'ADMIN' },
                                { label: "Tier", value: user.isPremium ? 'PREMIUM' : 'FREE' },
                                { label: "Email Verified", value: user.emailVerified ? 'Yes' : 'No' },
                            ].map((item) => (
                                <div key={item.label} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 gap-4">
                                    <span className="text-[#1C1611]/70 font-black uppercase text-[10px] tracking-widest">{item.label}</span>
                                    <span className="text-[#1C1611] font-bold text-sm text-right truncate max-w-[200px]">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Direct Security Token Box Controls */}
                    <div className="bg-[#FFB3A7] border-[3px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] rounded-2xl p-6 flex flex-col justify-between min-h-[180px]">
                        <div>
                            <h3 className="text-lg font-black uppercase text-[#1C1611] flex items-center gap-2">
                                <Key className="w-5 h-5 stroke-[2.5px]" /> Security
                            </h3>
                            <p className="text-xs text-[#1C1611]/80 font-bold uppercase mt-3">
                                Session is managed by Better-Auth with JWT tokens.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mt-6">
                            <div className="flex items-center gap-2 bg-white border-[2.5px] border-[#1C1611] px-3 py-2 rounded-xl shadow-[2px_2px_0px_0px_#1C1611] w-max">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#4DD0B1] animate-pulse border-[1.5px] border-[#1C1611]" />
                                <span className="text-[10px] font-black uppercase text-[#1C1611]">Session Active</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}