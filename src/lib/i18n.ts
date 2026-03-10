import type pt from "@/messages/pt.json";

export type Locale = "pt" | "en" | "es";

export const locales: Locale[] = ["pt", "en", "es"];
export const defaultLocale: Locale = "pt";

export type Messages = typeof pt;

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/es")) return "es";
  return "pt";
}

export function getPathFromLocale(locale: Locale): string {
  if (locale === "pt") return "/";
  return `/${locale}`;
}

export async function getMessages(locale: Locale): Promise<Messages> {
  switch (locale) {
    case "en":
      return (await import("@/messages/en.json")).default;
    case "es":
      return (await import("@/messages/es.json")).default;
    default:
      return (await import("@/messages/pt.json")).default;
  }
}

function deepGet(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

export function createTranslations(messages: Messages) {
  return function t(key: string): string {
    return deepGet(messages as Record<string, unknown>, key) ?? key;
  };
}

export type Translations = ReturnType<typeof createTranslations>;
