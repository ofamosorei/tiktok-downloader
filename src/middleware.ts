import { NextRequest, NextResponse } from "next/server";

const locales = ["pt", "en", "es"];

// List of Spanish-speaking countries (ISO 3166-1 alpha-2)
const spanishCountries = [
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "SV", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PY", "PE", "PR", "ES", "UY", "VE"
];

// List of Portuguese-speaking countries
const portugueseCountries = ["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only apply language detection on the root path
  if (pathname === "/") {
    // 1. Check if hosting provider (like Vercel) provides the country code
    const country = request.headers.get("x-vercel-ip-country");

    let targetLocale = "en"; // Default fallback (US/World)

    if (country) {
      if (portugueseCountries.includes(country)) {
        targetLocale = "pt";
      } else if (spanishCountries.includes(country)) {
        targetLocale = "es";
      }
    } else {
      // 2. Fallback to Accept-Language header if country is not available
      const acceptLang = request.headers.get("accept-language");
      if (acceptLang) {
        if (acceptLang.startsWith("pt") || acceptLang.includes("pt-BR") || acceptLang.includes("pt-PT")) {
          targetLocale = "pt";
        } else if (acceptLang.startsWith("es")) {
          targetLocale = "es";
        }
      }
    }

    return NextResponse.rewrite(new URL(`/${targetLocale}`, request.url));
  }

  // Allow only valid locale segments at root level
  const segment = pathname.split("/")[1];
  if (locales.includes(segment)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/en", "/es"],
};
