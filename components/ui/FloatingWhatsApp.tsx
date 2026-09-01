"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useT } from "@/lib/i18n";

export function FloatingWhatsApp() {
  const t = useT();
  return (
    <a
      href={`https://wa.me/966${siteConfig.phone.slice(1)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp.aria")}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-none bg-[#2563eb] px-4 py-3 font-bold text-white shadow-[0_0_34px_rgba(37,99,235,0.42)] transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#2563eb] text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#2563eb]/40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden md:inline">{t("whatsapp.cta")}</span>
    </a>
  );
}
