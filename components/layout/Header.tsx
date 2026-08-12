"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { services } from "@/data/services";
import { LinkButton } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/how-we-work", label: "كيف نعمل" },
  { href: "/blog", label: "المدونة" },
  { href: "/faq", label: "الأسئلة الشائعة" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition duration-300 ${
          scrolled ? "bg-black/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="container-osb flex h-20 items-center justify-between gap-6">
          <Link href="/" className="cursor-hover">
            <Image src="/images/logo.png" alt="OSB" width={180} height={72} className="h-16 w-auto brightness-0 invert" />
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-bold text-white md:flex">
            {navLinks.slice(0, 2).map((link) => (
              <Link key={link.href} href={link.href} className="cursor-hover transition hover:text-accent">
                {link.label}
              </Link>
            ))}
            <div onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)} className="relative">
            <button className="cursor-hover flex items-center gap-1 transition hover:text-white/70">
                الخدمات <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {servicesOpen ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-8 grid w-[520px] grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-black p-5 shadow-[0_0_50px_rgba(37,99,235,0.22)]"
                  >
                    {services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="rounded-xl px-3 py-2 text-sm text-white/55 transition hover:bg-white/10 hover:text-white"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            {navLinks.slice(2).map((link) => (
              <Link key={link.href} href={link.href} className="cursor-hover transition hover:text-accent">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/admin" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:text-white" aria-label="لوحة التحكم">
              <Settings className="h-5 w-5" />
            </Link>
            <LinkButton href="/free-consultation">احجز استشارتك المجانية</LinkButton>
          </div>
          <button aria-label="فتح القائمة" onClick={() => setMenuOpen(true)} className="text-white md:hidden">
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
