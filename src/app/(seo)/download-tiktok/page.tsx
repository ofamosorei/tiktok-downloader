import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/download-tiktok";

export const metadata: Metadata = {
  title: "Download TikTok Video Without Watermark | Free Web Tool",
  description: "Download TikTok videos without watermark instantly. High-quality MP4 download, no app required. Copy link and download TikTok right now.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "Download TikTok Video Without Watermark | Free Web Tool",
    description: "Download TikTok videos without watermark instantly. High-quality MP4 download, no app required. Copy link and download TikTok right now.",
    url: urlPath,
  },
};

export default async function DownloadTiktokPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "Download TikTok Video";
    seoMessages.hero.subtitle = "Save any TikTok video without watermark in high quality";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
