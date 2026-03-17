import { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const urlPath = "/free-tiktok-downloader";

export const metadata: Metadata = {
  title: "Free TikTok Downloader | Save Videos Without Watermark",
  description: "Use our free TikTok downloader to save your favorite videos without watermarks. Fast, secure, and completely free online tool.",
  alternates: {
    canonical: urlPath,
  },
  openGraph: {
    title: "Free TikTok Downloader | Save Videos Without Watermark",
    description: "Use our free TikTok downloader to save your favorite videos without watermarks. Fast, secure, and completely free online tool.",
    url: urlPath,
  },
};

export default async function FreeTiktokDownloaderPage() {
  const messages = await getMessages("en");
  
  // Clone messages to safely mutate for SEO
  const seoMessages = JSON.parse(JSON.stringify(messages)) as typeof messages;
  
  if (seoMessages.meta) {
    seoMessages.meta.title = metadata.title as string;
    seoMessages.meta.description = metadata.description as string;
  }
  
  if (seoMessages.hero) {
    seoMessages.hero.title = "Free TikTok Downloader";
    seoMessages.hero.subtitle = "Download videos without watermark completely for free";
  }

  return <HomePage locale="en" messages={seoMessages} />;
}
