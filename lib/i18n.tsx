"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionaries } from "@/lib/i18n-dictionaries";

export type Lang = "en" | "ar";

const LANG_COOKIE = "osb-lang";

function readLang(): Lang {
  if (typeof window !== "undefined") {
    const fromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${LANG_COOKIE}=`))
      ?.split("=")[1];
    if (fromCookie === "en" || fromCookie === "ar") return fromCookie;
    return "ar";
  }
  return "ar";
}

interface I18nContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (key: string, vars?: Record<string, string | number>) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const dir = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=31536000;samesite=lax`;
  }, [lang, dir]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let str = dictionaries[lang][key] ?? dictionaries.ar[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
        }
      }
      return str;
    },
    [lang]
  );

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "ar" ? "en" : "ar")), []);

  const value = useMemo<I18nContextValue>(
    () => ({ lang, dir, t, setLang, toggleLang }),
    [lang, dir, t, setLang, toggleLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}

export function useLang() {
  return useI18n().lang;
}

export function useDir() {
  return useI18n().dir;
}
