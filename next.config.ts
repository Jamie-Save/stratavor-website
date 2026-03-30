import type { NextConfig } from "next";

const lanOrigins =
  process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",")
    .map((s) => s.trim())
    .filter(Boolean) ?? [];

const cwdNormalized = process.cwd().replace(/\\/g, "/").toLowerCase();
const isOneDriveProject = cwdNormalized.includes("/onedrive/");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(lanOrigins.length > 0 ? { allowedDevOrigins: lanOrigins } : {}),
  // Avoids Next 15 devtools segment-explorer RSC errors (GET / 404 or 500) on some Windows/OneDrive setups.
  experimental: {
    devtoolSegmentExplorer: false,
  },
  // OneDrive sync + default file watchers often yield stale / partial client chunks → "not in React Client Manifest" and GET / 404 in dev.
  webpack: (config, { dev }) => {
    if (dev && isOneDriveProject) {
      // Do not pass absolute Windows paths to `ignored` — Watchpack turns them into regex and
      // backslashes break parsing (e.g. \Users, \savea), crashing dev before "Ready".
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1500,
        aggregateTimeout: 500,
      };
    }
    return config;
  },
};

export default nextConfig;
