import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/download-tiktok-video";

export const metadata: Metadata = {
  title: "Download TikTok Video Free | HD No Watermark Downloader",
  description: "The best tool to download TikTok video online. Save TikTok videos in MP4 HD without watermark directly to your device for free.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "Download TikTok Video Free | HD No Watermark Downloader",
    description: "The best tool to download TikTok video online. Save TikTok videos in MP4 HD without watermark directly to your device for free.",
    url: urlPath,
  },
};

export default async function DownloadTiktokVideoPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "Download TikTok Video";
    seoMessages.hero.subtitle = "Fast, free, and no watermark TikTok video downloader";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
