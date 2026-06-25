"use client";

import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => setUsers(d.users || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateRole = async (userId, role) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    if (res.ok) {
      toast.success("Role updated");
      loadUsers();
    } else {
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F0DD] text-[#1C1611] p-4 sm:p-6 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="border-b-[3.5px] border-[#1C1611] pb-6">
          <h1 className="text-3xl font-black uppercase">Manage Users</h1>
        </header>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-[3px] border-[#1C1611] border-t-[#FF4A3A] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="border-[3px] border-[#1C1611] rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_#1C1611]">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-[#FFB3A7] border-b-[3px] border-[#1C1611]">
                  {["Name", "Email", "Role", "Lessons", "Actions"].map((h) => (
                    <th key={h} className="p-4 text-left text-xs font-black uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b-2 border-[#1C1611]/15">
                    <td className="p-4 font-black">{user.name}</td>
                    <td className="p-4 text-sm font-bold">{user.email}</td>
                    <td className="p-4 text-sm font-black uppercase">{user.role}</td>
                    <td className="p-4 text-sm font-bold">{user.lessonCount}</td>
                    <td className="p-4">
                      <button
                        onClick={() => updateRole(user.id, user.role === "admin" ? "user" : "admin")}
                        className="inline-flex items-center gap-1 text-xs font-black uppercase hover:text-[#FF4A3A]"
                      >
                        <Shield className="w-4 h-4" />
                        Toggle Admin
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
