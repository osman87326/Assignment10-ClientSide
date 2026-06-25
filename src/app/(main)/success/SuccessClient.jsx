"use client";

import { useEffect, useState, Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

function SuccessClientInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    const verifyAndRefresh = async () => {
      try {
        if (sessionId) {
          // 1. Verify the Stripe session synchronously with the backend
          const tokenRes = await authClient.token();
          const token = tokenRes?.data?.token;
          
          if (token) {
            const res = await fetch(`/api/backend/verify-checkout-session?session_id=${sessionId}`, {
              headers: {
                "Authorization": `Bearer ${token}`
              }
            });
            const data = await res.json();
            
            if (data.success && data.isPremium) {
              console.log("Stripe session verified synchronously!");
            }
          }
        }

        // 2. Force Better-Auth to re-sign the JWT cookie with latest DB data 
        const { data: session } = await authClient.getSession();
        if (session?.user) {
          await authClient.updateUser({ name: session.user.name });
          console.log("JWT Session successfully refreshed with Premium status!");
          
          // Force a hard navigation so layouts re-read the new cookie
          window.location.href = "/home";
        }
      } catch (err) {
        console.error("Failed to verify/refresh JWT", err);
      } finally {
        setIsRefreshing(false);
      }
    };
    verifyAndRefresh();
  }, [sessionId]);

  if (isRefreshing) {
    return <p className="text-sm font-bold mt-4 animate-pulse text-[#1C1611]/70">Upgrading your account...</p>;
  }
  return null;
}

export default function SuccessClient() {
  return (
    <Suspense fallback={<p className="text-sm font-bold mt-4 animate-pulse text-[#1C1611]/70">Upgrading your account...</p>}>
      <SuccessClientInner />
    </Suspense>
  );
}