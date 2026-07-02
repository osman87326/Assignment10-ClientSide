import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.VERCEL) {
    if (process.env.NEXT_PUBLIC_BASE_URL && !process.env.NEXT_PUBLIC_BASE_URL.includes("localhost")) {
      return process.env.NEXT_PUBLIC_BASE_URL;
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
  }
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
};

// NEXT_PUBLIC_BASE_URL = the Next.js app URL (e.g. https://your-app.vercel.app)
// DO NOT use NEXT_PUBLIC_APP_URL here — that was pointing to the backend server
// which caused CORS errors in production.
export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [jwtClient()],
});

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
  return data;
};