"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import GooglyEyes from "@/components/GooglyEyes";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (authError) {
        setError(authError.message || "Failed to sign in.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSocialLogin = async (provider) => {
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: "/dashboard",
        });
      } catch (err) {
        setError(`Failed to sign in with ${provider}.`);
        console.error(err);
      }
    };
  

  return (
    <div className="min-h-screen w-full bg-[#F6F0DD] flex flex-col items-center justify-center pt-32 sm:pt-40 pb-12 px-4 sm:px-6 font-sans text-[#1C1611]">

      {/* Brand Header above the card */}
      <div className="text-center mb-6">
        <GooglyEyes className="h-6 w-12 mx-auto mb-2" />
        <h2 className="font-serif italic font-extrabold text-2xl tracking-tight text-[#1C1611]">
          Digital Life Lessons
        </h2>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[440px] bg-white border-[3.5px] border-[#1C1611] rounded-3xl shadow-[8px_8px_0px_0px_#1C1611] p-8 sm:p-10 relative z-10 text-left">

        {/* Welcome Back & Yellow underline bar */}
        <div className="mb-6">
          <h1 className="font-black text-3xl uppercase tracking-tight text-[#1C1611]">
            Welcome Back
          </h1>
          <div className="h-[6px] w-20 bg-[#FCD34D] border-[1.5px] border-[#1C1611] mt-1.5 shadow-[1px_1px_0px_0px_#1C1611]" />
          <p className="text-xs sm:text-sm font-bold text-[#1C1611]/70 mt-3">
            Continue your journey of reflection.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-100 border-[2px] border-[#ba1a1a] rounded-xl text-xs font-black text-[#ba1a1a] uppercase">
              ⚠️ {error}
            </div>
          )}

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#1C1611]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1C1611]/50">
                <Mail className="w-4 h-4 gap-2" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#f7f9fb] border-[2.5px] border-[#1C1611] rounded-xl pl-10 pr-4 py-3 text-sm text-[#1C1611] font-bold placeholder-[#1C1611]/40 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#1C1611]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-black uppercase tracking-wider text-[#1C1611]/60 hover:text-[#1C1611] underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1C1611]/50">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#f7f9fb] border-[2.5px] border-[#1C1611] rounded-xl pl-10 pr-10 py-3 text-sm text-[#1C1611] font-bold placeholder-[#1C1611]/40 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#1C1611]/50 hover:text-[#1C1611]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF4A3A] text-white font-black uppercase text-center py-3.5 rounded-xl border-[2.5px] border-[#1C1611] shadow-[4px_4px_0px_0px_#1C1611] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#1C1611] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_0px_#1C1611] transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-6"
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
          </button>
        </form>

        {/* Social Options */}
        <div className="mt-6 space-y-4">
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t-2 border-[#1C1611]"></div>
            <span className="flex-shrink mx-3 text-[10px] font-black uppercase tracking-wider text-[#1C1611]/60">
              Or
            </span>
            <div className="flex-grow border-t-2 border-[#1C1611]"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 py-2.5 border-[2.5px] border-[#1C1611] rounded-xl hover:bg-[#F6F0DD]/20 active:bg-[#F6F0DD]/40 transition-all font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1C1611]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.486 0-6.31-2.825-6.31-6.31s2.824-6.31 6.31-6.31c1.529 0 2.923.548 4.01 1.458l3.11-3.11C18.96 2.27 15.82 1 12.24 1 5.866 1 .69 6.176.69 12.55s5.176 11.55 11.55 11.55c6.31 0 11.378-5.068 11.378-11.378 0-.82-.072-1.614-.207-2.385H12.24z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("apple")}
              className="flex items-center justify-center gap-2 py-2.5 border-[2.5px] border-[#1C1611] rounded-xl hover:bg-[#F6F0DD]/20 active:bg-[#F6F0DD]/40 transition-all font-black text-xs uppercase shadow-[2px_2px_0px_0px_#1C1611]"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.12.02.24.03.36.03.84 0 1.96-.54 2.45-1.36z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Dashed Line separating Sign Up option */}
        <div className="border-t-2 border-dashed border-[#1C1611]/30 my-6" />

        {/* Link to Sign Up */}
        <div className="text-center text-xs font-bold flex items-center justify-center">
          No account?
          <Link
            href="/signup"
            className="bg-[#FCD34D] border-[1.5px] border-[#1C1611] px-2.5 py-0.5 rounded shadow-[1.5px_1.5px_0px_0px_#1C1611] ml-1.5 hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_#1C1611] transition-all font-black uppercase text-[10px]"
          >
            Sign Up
          </Link>
        </div>

      </div>

      {/* Outside Footer Row */}
      <div className="max-w-[440px] w-full flex items-center justify-between mt-6 text-xs font-bold px-2 text-[#1C1611]/80">
        {/* Left Side Status */}
        <div className="flex items-center gap-1.5 bg-[#4DD0B1]/20 border-[1.5px] border-[#1C1611] px-2 py-0.5 rounded font-black text-[10px] uppercase shadow-[1.5px_1.5px_0px_0px_#1C1611]">
          <span className="w-2 h-2 rounded-full bg-[#4DD0B1] inline-block animate-pulse" />
          Online
        </div>
        {/* Right Side Links */}
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <Link href="/help" className="hover:underline">Help</Link>
        </div>
      </div>

    </div>
  );
}