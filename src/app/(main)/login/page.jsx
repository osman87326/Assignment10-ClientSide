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
      const { data, error: authError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/home",
      });
      if (authError) {
        setError(authError.message || "Failed to sign in.");
      } else {
        router.push("/home");
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
      await authClient.signIn.social({ provider, callbackURL: "/home" });
    } catch (err) {
      setError(`Failed to sign in with ${provider}.`);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0d0d] flex flex-col items-center justify-center pt-32 sm:pt-40 pb-12 px-4 sm:px-6 font-sans text-[#e8e4d9] relative">

      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#c8ff6b 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />

      {/* Brand header */}
      <div className="text-center mb-8 relative z-10">
        <GooglyEyes className="h-6 w-12 mx-auto mb-3" />
        <h2 className="font-black text-xl tracking-tight text-[#e8e4d9] uppercase">
          Digital Life Lessons
        </h2>
        <div className="h-[3px] w-12 bg-[#c8ff6b] mx-auto mt-2 rounded-full" />
      </div>

      {/* Main login card */}
      <div className="w-full max-w-[440px] bg-[#111] border-[2.5px] border-[#2a2a2a] rounded-3xl shadow-[8px_8px_0px_0px_#0a0a0a] p-8 sm:p-10 relative z-10 text-left">

        {/* Heading */}
        <div className="mb-7">
          <h1 className="font-black text-3xl uppercase tracking-tight text-[#e8e4d9]">
            Welcome Back
          </h1>
          <div className="h-[5px] w-20 bg-[#c8ff6b] mt-2 rounded-sm shadow-[1px_1px_0px_0px_#0a0a0a]" />
          <p className="text-xs sm:text-sm font-medium text-[#555] mt-3">
            Continue your journey of reflection.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Error banner */}
          {error && (
            <div className="p-3 bg-[#ff5c4711] border-[2px] border-[#ff5c47] rounded-xl text-xs font-black text-[#ff5c47] uppercase">
              ⚠️ {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black uppercase tracking-wider text-[#555]">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#333]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-3 text-sm font-medium rounded-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#555]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[11px] font-black uppercase tracking-wider text-[#333] hover:text-[#c8ff6b] transition-colors underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#333]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 text-sm font-medium rounded-xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#333] hover:text-[#c8ff6b] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c8ff6b] text-[#1a2200] font-black uppercase text-center py-3.5 rounded-xl border-[2px] border-[#2a2a2a] shadow-[4px_4px_0px_0px_#0a0a0a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            <span>{loading ? "Signing In..." : "Sign In"}</span>
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-[#1e1e1e]" />
          <span className="flex-shrink mx-3 text-[10px] font-black uppercase tracking-wider text-[#333]">Or</span>
          <div className="flex-grow border-t border-[#1e1e1e]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center gap-2.5 py-3 bg-[#161616] border-[2px] border-[#2a2a2a] rounded-xl hover:bg-[#1e1e1e] hover:border-[#444] active:bg-[#2a2a2a] transition-all font-black text-xs uppercase shadow-[2px_2px_0px_0px_#0a0a0a] text-[#e8e4d9] cursor-pointer"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.486 0-6.31-2.825-6.31-6.31s2.824-6.31 6.31-6.31c1.529 0 2.923.548 4.01 1.458l3.11-3.11C18.96 2.27 15.82 1 12.24 1 5.866 1 .69 6.176.69 12.55s5.176 11.55 11.55 11.55c6.31 0 11.378-5.068 11.378-11.378 0-.82-.072-1.614-.207-2.385H12.24z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Dashed divider */}
        <div className="border-t border-dashed border-[#1e1e1e] my-6" />

        {/* Sign up link */}
        <div className="text-center text-xs font-bold flex items-center justify-center gap-2 text-[#555]">
          No account?
          <Link
            href="/signup"
            className="bg-[#c8ff6b22] border-[1.5px] border-[#c8ff6b44] text-[#c8ff6b] px-3 py-1 rounded-lg shadow-[1.5px_1.5px_0px_0px_#0a0a0a] hover:translate-x-[0.5px] hover:translate-y-[0.5px] hover:shadow-[1px_1px_0px_0px_#0a0a0a] active:shadow-none transition-all font-black uppercase text-[10px]"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Footer row */}
      <div className="max-w-[440px] w-full flex items-center justify-between mt-6 text-xs font-bold px-2 relative z-10">
        {/* Status pill */}
        <div className="flex items-center gap-1.5 bg-[#c8ff6b11] border-[1.5px] border-[#c8ff6b33] px-3 py-1 rounded-full font-black text-[10px] uppercase text-[#c8ff6b] shadow-[1.5px_1.5px_0px_0px_#0a0a0a]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff6b] inline-block animate-pulse" />
          Online
        </div>
        {/* Footer links */}
        <div className="flex gap-4 text-[#333]">
          {["Privacy", "Terms", "Help"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="hover:text-[#c8ff6b] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}