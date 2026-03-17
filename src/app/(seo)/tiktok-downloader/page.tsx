import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/tiktok-downloader";

export const metadata: Metadata = {
  title: "TikTok Downloader - Download TikTok Videos Without Watermark",
  description: "Fast and free tool to download TikTok videos without watermark. Paste the link and instantly download high-quality MP4 videos.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "TikTok Downloader - Download TikTok Videos Without Watermark",
    description: "Fast and free tool to download TikTok videos without watermark. Paste the link and instantly download high-quality MP4 videos.",
    url: urlPath,
  },
};

export default async function TiktokDownloaderPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "TikTok Downloader";
    seoMessages.hero.subtitle = "Download TikTok videos without watermark instantly";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
