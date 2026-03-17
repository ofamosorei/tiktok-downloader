import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/tiktok-without-watermark";

export const metadata: Metadata = {
  title: "Download TikTok Without Watermark | Free Video Saver HD",
  description: "Save videos from TikTok without the app watermark. Our downloader gives you high quality MP4s for free, with no signup needed.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "Download TikTok Without Watermark | Free Video Saver HD",
    description: "Save videos from TikTok without the app watermark. Our downloader gives you high quality MP4s for free, with no signup needed.",
    url: urlPath,
  },
};

export default async function TiktokWithoutWatermarkPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "TikTok Without Watermark";
    seoMessages.hero.subtitle = "Get clean, watermark-free TikTok videos in HD";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
