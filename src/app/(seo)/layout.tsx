import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleLang } from "@/components/LocaleLang";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://downloadnowatermark.com";
const ogImage = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TikTok Video Downloader",
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImage],
  },
  appleWebApp: {
    title: "TikTok Downloader",
    statusBarStyle: "black-translucent",
    capable: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "3hzRVvv1piw1svxfI6bgsDmXt7jZ4Stwn5LRdM1qMzQ",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function SeoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleLang />
        {children}
      </body>
    </html>
  );
}
