"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Globe, Settings, X } from "lucide-react";
import Link from "next/link";
import { services } from "@/data/services";
import { useI18n, useT, useDir } from "@/lib/i18n";

const linkKeys = [
  { href: "/", key: "mobileMenu.links.home" },
  { href: "/about", key: "mobileMenu.links.about" },
  { href: "/how-we-work", key: "mobileMenu.links.howWeWork" },
  { href: "/faq", key: "mobileMenu.links.faq" },
  { href: "/contact", key: "mobileMenu.links.contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const dir = useDir();
  const { lang, toggleLang } = useI18n();
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[65] overflow-hidden bg-black text-white md:hidden"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(37,99,235,0.28),transparent_32%)]" />
          <Link href="/" onClick={onClose} className="absolute right-6 top-6">
            <Image src="/images/logo.png" alt="OSB" width={140} height={56} className="h-14 w-auto brightness-0 invert" />
          </Link>
          <button aria-label={t("mobileMenu.closeLabel")} onClick={onClose} className="absolute left-6 top-6 text-white">
            <X className="h-8 w-8" />
          </button>
          <nav className="relative z-10 flex h-full flex-col justify-center gap-6 px-8 text-2xl font-bold" dir={dir}>
            {linkKeys.map((link) => (
              <Link key={link.href} href={link.href} onClick={onClose}>
                {t(link.key)}
              </Link>
            ))}
            <div className="grid gap-3 pt-4 text-base text-white/55">
              {services.map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} onClick={onClose}>
                  {t(`service.${service.slug}.title`)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-6 text-base">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label={t("mobileMenu.langToggle")}
              >
                <Globe className="h-5 w-5" />
                {lang === "ar" ? "EN" : "عربي"}
              </button>
              <Link
                href="/admin"
                onClick={onClose}
                className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label={t("mobileMenu.login")}
              >
                <Settings className="h-5 w-5" />
                {t("mobileMenu.login")}
              </Link>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
