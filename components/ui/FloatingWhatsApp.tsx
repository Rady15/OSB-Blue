"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/966${siteConfig.phone.slice(1)}`}
      target="_blank"
      rel="noreferrer"
      aria-label="استشارة مجانية عبر واتساب"
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-black px-4 py-3 font-bold text-white shadow-2xl transition duration-300 hover:-translate-y-1"
    >
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-[#2563eb] text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#2563eb]/40" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
      <span className="hidden md:inline">استشارة مجانية</span>
    </a>
  );
}
