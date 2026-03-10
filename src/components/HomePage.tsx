"use client";

import { useState } from "react";
import Link from "next/link";
import type { Messages } from "@/lib/i18n";
import { createTranslations } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

type DownloadResult = {
  success: true;
  videoUrl: string;
  title: string;
  author: string;
  duration: number;
  cover?: string;
};

function getFaqSchema(messages: Messages) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: messages.faq.q1, acceptedAnswer: { "@type": "Answer", text: messages.faq.a1 } },
      { "@type": "Question", name: messages.faq.q2, acceptedAnswer: { "@type": "Answer", text: messages.faq.a2 } },
      { "@type": "Question", name: messages.faq.q3, acceptedAnswer: { "@type": "Answer", text: messages.faq.a3 } },
      { "@type": "Question", name: messages.faq.q4, acceptedAnswer: { "@type": "Answer", text: messages.faq.a4 } },
    ],
  };
}

function getWebAppSchema(messages: Messages, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": messages.meta?.title || "TikTok Downloader",
    "description": messages.meta?.description || "Download TikTok videos without watermark",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "All",
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
}

export function HomePage({ locale, messages }: { locale: Locale; messages: Messages }) {
  const t = createTranslations(messages);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!url.trim()) {
      setError(t("errors.emptyUrl"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? t("errors.downloadFailed"));
        return;
      }
      if (data.success && data.videoUrl) {
        setResult({
          success: true,
          videoUrl: data.videoUrl,
          title: data.title ?? t("video.defaultTitle"),
          author: data.author ?? t("video.unknownAuthor"),
          duration: data.duration ?? 0,
          cover: data.cover,
        });
      } else {
        setError(data?.error ?? t("errors.videoUnavailable"));
      }
    } catch {
      setError(t("errors.network"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebAppSchema(messages, process.env.NEXT_PUBLIC_SITE_URL || "https://downloadnowatermark.com")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(messages)) }}
      />

      <main className="flex flex-1 flex-col items-center px-4 py-12 sm:py-16 md:py-20">
        <div className="mx-auto w-full max-w-2xl">
          {/* Language switcher */}
          <nav className="mb-8 flex justify-center gap-2" aria-label="Language options">
            <Link
              href="/"
              aria-current={locale === "pt" ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${locale === "pt" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            >
              PT
            </Link>
            <Link
              href="/en"
              aria-current={locale === "en" ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${locale === "en" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            >
              EN
            </Link>
            <Link
              href="/es"
              aria-current={locale === "es" ? "page" : undefined}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${locale === "es" ? "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            >
              ES
            </Link>
          </nav>

          <header className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200/60 backdrop-blur dark:bg-slate-800/80 dark:text-slate-400 dark:ring-slate-700/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {t("hero.badge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 sm:text-xl">
              {t("hero.subtitle")}
            </p>
          </header>

          <section aria-label={t("downloader.ariaLabel")} className="mt-10 sm:mt-12">
            <form onSubmit={handleSubmit}>
              <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-slate-700/50 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-3">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={t("downloader.placeholder")}
                    className="min-h-[52px] flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-5 py-3.5 text-base text-slate-900 placeholder-slate-400 transition focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-500 dark:focus:border-emerald-500 dark:focus:bg-slate-800 dark:focus:ring-emerald-500/20"
                    disabled={loading}
                    aria-label={t("downloader.inputAriaLabel")}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-h-[52px] flex-shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/25 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg dark:bg-white dark:text-slate-900 dark:shadow-slate-950/30 dark:hover:bg-slate-100 dark:hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {t("downloader.processing")}
                      </>
                    ) : (
                      <>
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        {t("downloader.download")}
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                  {t("downloader.linkHint")}
                </p>
              </div>
            </form>
          </section>

          {error && (
            <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 shadow-sm dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
              {error}
            </div>
          )}

          {result && (
            <article className="mt-8 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-slate-700/50 sm:p-8">
              <div className="mb-4">
                <h2 className="sr-only">{t("video.downloaded")}</h2>
                <p className="line-clamp-2 text-sm font-medium text-slate-700 dark:text-slate-300">{result.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">@{result.author}</p>
              </div>
              <div className="overflow-hidden rounded-xl bg-slate-900 shadow-inner ring-1 ring-slate-800 dark:ring-slate-700">
                <video src={result.videoUrl} controls className="aspect-[9/16] max-h-[70vh] w-full object-contain" preload="metadata" poster={result.cover}>
                  {t("video.noSupport")}
                </video>
              </div>
              <a
                href={result.videoUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-900/25 transition hover:bg-emerald-700 hover:shadow-xl dark:shadow-emerald-950/30"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {t("video.saveVideo")}
              </a>
            </article>
          )}

          <section className="mt-16 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-slate-700/50 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("instructions.title")}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{t("instructions.intro")}</p>
            <ol className="mt-6 list-inside list-decimal space-y-3 text-slate-700 dark:text-slate-300">
              <li>{t("instructions.step1")}</li>
              <li>{t("instructions.step2")}</li>
              <li>{t("instructions.step3")}</li>
              <li>{t("instructions.step4")}</li>
            </ol>
          </section>

          <section className="mt-10 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-slate-700/50 sm:p-8" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-bold text-slate-900 dark:text-white">
              {t("faq.title")}
            </h2>
            <dl className="mt-6 space-y-6">
              <div>
                <dt className="text-base font-semibold text-slate-900 dark:text-white">{t("faq.q1")}</dt>
                <dd className="mt-2 text-slate-600 dark:text-slate-400">{t("faq.a1")}</dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-slate-900 dark:text-white">{t("faq.q2")}</dt>
                <dd className="mt-2 text-slate-600 dark:text-slate-400">{t("faq.a2")}</dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-slate-900 dark:text-white">{t("faq.q3")}</dt>
                <dd className="mt-2 text-slate-600 dark:text-slate-400">{t("faq.a3")}</dd>
              </div>
              <div>
                <dt className="text-base font-semibold text-slate-900 dark:text-white">{t("faq.q4")}</dt>
                <dd className="mt-2 text-slate-600 dark:text-slate-400">{t("faq.a4")}</dd>
              </div>
            </dl>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white/50 py-6 dark:border-slate-800 dark:bg-slate-900/30">
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">{t("footer")}</p>
      </footer>
    </div>
  );
}
