import { notFound } from "next/navigation";
import { getMessages } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import { HomePage } from "@/components/HomePage";

const validLocales = ["pt", "en", "es"] as const;

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!validLocales.includes(locale as Locale)) {
    notFound();
  }
  const messages = await getMessages(locale as Locale);
  return <HomePage locale={locale as Locale} messages={messages} />;
}
