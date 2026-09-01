"use client";

import { usePathname } from "next/navigation";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { GoogleAnalytics } from "@/components/ui/GoogleAnalytics";

export default function RootLayoutClient({ children, initialLang }: { children: React.ReactNode; initialLang?: "en" | "ar" }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <I18nProvider initialLang={initialLang}>
      <GoogleAnalytics />
      {!isAdmin && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BackToTopButton />}
      {!isAdmin && <FloatingWhatsApp />}
      {!isAdmin && <CustomCursor />}
    </I18nProvider>
  );
}