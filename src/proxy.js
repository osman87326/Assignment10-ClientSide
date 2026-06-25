import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Make sure this path exactly matches your auth.js location

const ROUTE_PERMISSIONS = {
  "/admin/dashboard": ["admin"],
  "/dashboard/settings": ["admin", "editor"],
  "/dashboard": ["admin", "editor", "user"],
};

export async function proxy(request) {
  // 1. Fixed parameter name (singular 'request')
  const { pathname } = request.nextUrl;

  // Check if the current route is protected
  const isProtected = Object.keys(ROUTE_PERMISSIONS).some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // 2. FIXED: You must actually fetch the session from Better-Auth here!
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url)); // Now request.url works perfectly
  }

  // 3. Find the matching restriction rule
  const matchedRoute = Object.keys(ROUTE_PERMISSIONS).find((route) =>
    pathname.startsWith(route),
  );

  if (matchedRoute) {
    const allowedRoles = ROUTE_PERMISSIONS[matchedRoute];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};