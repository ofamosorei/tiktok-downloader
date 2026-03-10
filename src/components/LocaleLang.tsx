"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LocaleLang() {
  const pathname = usePathname();

  useEffect(() => {
    const lang = pathname === "/en" ? "en" : pathname === "/es" ? "es" : "pt-BR";
    document.documentElement.lang = lang;
  }, [pathname]);

  return null;
}
