"use client";

import Sidebar from "@/components/Panels/Sidebar";
import BannedScreen from "@/components/Panels/BannedScreen";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [bannedData, setBannedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const tokenRes = await authClient.token();
        const token = tokenRes?.data?.token;
        if (!token) {
          setIsLoading(false);
          return;
        }

                const res = await fetch(`/api/backend/users/me/status`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data.isBanned) {
            setBannedData(data.data);
          }
        }
      } catch (error) {
        console.error("Status check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkStatus();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-[#F6F0DD] flex items-center justify-center"><div className="w-12 h-12 border-4 border-[#1C1611] border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (bannedData) {
    return <div className="min-h-screen bg-[#F6F0DD]"><BannedScreen appealStatus={bannedData.appealStatus} /></div>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-[#F6F0DD] overflow-x-hidden text-[#1C1611]">
      
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#F6F0DD] border-b-[3.5px] border-[#1C1611] sticky top-0 z-30">
        <div className="font-black uppercase text-lg tracking-tight">Dashboard</div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="p-1.5 border-[2.5px] border-[#1C1611] bg-[#4DD0B1] rounded-lg shadow-[2px_2px_0px_0px_#1C1611] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all"
        >
          <Menu className="w-6 h-6 stroke-[3px]" />
        </button>
      </div>

      {/* Sidebar: Handles both desktop sticky and mobile slide-over */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />

      {/* Right Column: Dynamic Screen Space */}
      <main className="flex-grow min-w-0 flex flex-col relative bg-[#F6F0DD]">
        {children}
      </main>
    </div>
  );
}