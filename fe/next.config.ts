import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the Turbopack root to this app. Without it Next walks up, finds the
  // monorepo root lockfile, and guesses the repo root instead of `fe/`.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
