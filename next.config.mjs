import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  turbopack: {
    root: __dirname,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${process.env.SERVER_URL || "http://localhost:3100"}/api/:path*`,
      },
      {
        source: "/users",
        destination: `${process.env.SERVER_URL || "http://localhost:3100"}/users`,
      },
    ];
  },
};

export default nextConfig;