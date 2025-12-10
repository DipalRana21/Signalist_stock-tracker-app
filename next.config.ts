import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore: 'eslint' type definition might be missing in older types
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;