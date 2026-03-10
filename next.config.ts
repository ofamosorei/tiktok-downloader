import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/tiktok-downloader", destination: "/" },
      { source: "/download-tiktok", destination: "/" },
      { source: "/tiktok-without-watermark", destination: "/" },
      { source: "/free-tiktok-downloader", destination: "/" },
      { source: "/download-tiktok-video", destination: "/" },
      { source: "/save-tiktok-video", destination: "/" },
    ];
  },
};

export default nextConfig;
