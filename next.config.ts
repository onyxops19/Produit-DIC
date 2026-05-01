import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "produits-idc.com",
      },
    ],
  },
};

export default nextConfig;
