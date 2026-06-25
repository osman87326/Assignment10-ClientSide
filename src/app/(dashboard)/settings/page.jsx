"use client";

import { useEffect, useState } from "react";
import { Settings, User, Camera } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Image from "next/image";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState(session?.user?.name || "");
  const [photoURL, setPhotoURL] = useState(session?.user?.image || "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setPhotoURL(session.user.image || "");
    }
  }, [session?.user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!session?.user) return;

    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    try {
      setIsSaving(true);
      const tokenRes = await authClient.token();
      const token = tokenRes?.data?.token;
      if (!token) return;

      const res = await fetch(`/api/backend/users/${session.user.id}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          ...(photoURL.trim() ? { photoURL: photoURL.trim() } : {}),
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully! ✨");
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Error updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10 select-none">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1C1611] mb-1.5 flex items-center gap-3">
            <Settings className="w-8 h-8 stroke-[2.5px]" />
            Notebook Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#1C1611]/80 font-bold uppercase">
            Manage your profile and account preferences.
          </p>
        </header>

        <form onSubmit={handleSave} className="flex flex-col gap-8">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 rounded-2xl border-[3px] border-[#1C1611] overflow-hidden shadow-[3px_3px_0px_0px_#1C1611] bg-[#4DD0B1] flex items-center justify-center shrink-0">
              {photoURL ? (
                <Image
                  src={photoURL}
                  alt={name || "Profile photo"}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-[#1C1611] stroke-[2px]" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-black uppercase text-[#1C1611]">
                {session.user.name}
              </h2>
              <p className="text-xs font-bold text-[#1C1611]/60 uppercase">
                {session.user.email}
              </p>
              <p className="text-[10px] font-black text-[#1C1611]/40 uppercase mt-1">
                {session.user.isPremium ? "Premium Member" : "Free Member"} •{" "}
                {session.user.role || "user"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] px-4 text-sm font-black text-[#1C1611] placeholder-[#1C1611]/30 focus:outline-none rounded-xl shadow-[3px_3px_0px_0px_#1C1611] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_#1C1611] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1C1611]/70 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 stroke-[2.5px]" />
              Photo URL
            </label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/your-photo.jpg"
              className="w-full h-12 bg-[#F6F0DD] border-[3px] border-[#1C1611] px-4 text-sm font-bold text-[#1C1611] placeholder-[#1C1611]/30 focus:outline-none rounded-xl shadow-[3px_3px_0px_0px_#1C1611] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[2px_2px_0px_0px_#1C1611] transition-all"
            />
          </div>

          <div className="border-t-[3.5px] border-[#1C1611] pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="h-12 px-8 bg-[#FF4A3A] text-white border-[3px] border-[#1C1611] font-black uppercase text-sm rounded-xl shadow-[3px_3px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
