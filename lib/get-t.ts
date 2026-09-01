// Server-side translation helper (for server components that can't use hooks)
import { cookies } from "next/headers";
import { dictionaries } from "@/lib/i18n-dictionaries";

type Lang = "en" | "ar";

export function getT() {
  const cookieStore = cookies();
  const lang: Lang = cookieStore.get("osb-lang")?.value === "en" ? "en" : "ar";
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  function t(key: string, vars?: Record<string, string | number>): string {
    let str = dictionaries[lang][key] ?? dictionaries.ar[key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
      }
    }
    return str;
  }

  return { lang, dir, t };
}
