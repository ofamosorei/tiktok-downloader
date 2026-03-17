import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/save-tiktok-video";

export const metadata: Metadata = {
  title: "Save TikTok Video Without Watermark | Fast MP4 Download",
  description: "Save TikTok videos to your phone or computer easily. Our downloader removes the watermark automatically so you can watch offline.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "Save TikTok Video Without Watermark | Fast MP4 Download",
    description: "Save TikTok videos to your phone or computer easily. Our downloader removes the watermark automatically so you can watch offline.",
    url: urlPath,
  },
};

export default async function SaveTiktokVideoPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "Save TikTok Video";
    seoMessages.hero.subtitle = "Remove the watermark and save TikTok videos to your device";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
