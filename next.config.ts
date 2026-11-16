import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   experimental: {
      agentFeedback: true,
   },
   cacheComponents: true,
   partialPrefetching: true,
   allowedDevOrigins: ["192.168.0.144"],
   images: { remotePatterns: [{ protocol: "https", hostname: "drive.google.com", port: "" }] },
   turbopack: {
      rules: {
         "*.css": {
            loaders: ["@tailwindcss/turbopack"],
            as: "*.css",
         },
      },
   },
};

export default nextConfig;
