import type { Metadata } from "next";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://downloadnowatermark.com";
const ogImage = `${siteUrl}/og.png`;

const localeToOgLocale: Record<Locale, string> = {
  pt: "pt_BR",
  en: "en_US",
  es: "es_ES",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = (["pt", "en", "es"] as const).includes(locale as Locale)
    ? (locale as Locale)
    : "pt";
  const messages = await getMessages(validLocale);
  const title = messages.meta?.title ?? messages.hero?.title ?? "TikTok Downloader";
  const description = messages.meta?.description ?? "";
  const keywords = messages.meta?.keywords ?? "";

  const path = validLocale === "pt" ? "" : `/${validLocale}`;
  const canonicalUrl = `${siteUrl}${path}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: path || "/",
      languages: {
        "pt-BR": "/",
        en: "/en",
        es: "/es",
      },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      locale: localeToOgLocale[validLocale],
      url: canonicalUrl,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      siteName: "TikTok Video Downloader",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
}

import { Geist, Geist_Mono } from "next/font/google";
import { LocaleLang } from "@/components/LocaleLang";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocales = ["pt", "en", "es"];
  const lang = validLocales.includes(locale) ? locale : "pt";

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LocaleLang />
        {children}
      </body>
    </html>
  );
}
