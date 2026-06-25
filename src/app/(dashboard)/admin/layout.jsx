import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata = {
  title: "Admin",
};

export default async function AdminLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Not signed in -> go to login
  if (!session?.user) {
    return redirect("/login");
  }

  // Not an admin -> unauthorized page
  if (session.user.role !== "admin") {
    return redirect("/unauthorized");
  }

  return <>{children}</>;
}