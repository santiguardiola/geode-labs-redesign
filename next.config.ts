import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  turbopackFileSystemCacheForDev: false,
};

export default nextConfig;
