import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Direct CDN edge delivery: zero serverless lambda latency, instant HTTP/2 multiplexing
  images: {
    unoptimized: true,
  },
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
