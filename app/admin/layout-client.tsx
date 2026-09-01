"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, Globe, LogOut, Menu, X, ChevronLeft, Palette, Home, Users, MessageSquare, Route } from "lucide-react";
import { useI18n, useT, useDir } from "@/lib/i18n";

const navItems = [
  { href: "/admin", key: "admin.nav.dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/blog", key: "admin.nav.blog", icon: FileText },
  { href: "/admin/pages", key: "admin.nav.pages", icon: Globe },
  { href: "/admin/seo", key: "admin.nav.seo", icon: Settings },
  { href: "/admin/settings", key: "admin.nav.settings", icon: Settings },
  { href: "/admin/settings/branding", key: "admin.nav.branding", icon: Palette },
  { href: "/admin/content/site-config", key: "admin.nav.siteConfig", icon: Home },
  { href: "/admin/content/services", key: "admin.nav.services", icon: Settings },
  { href: "/admin/content/partners", key: "admin.nav.partners", icon: Users },
  { href: "/admin/content/faq", key: "admin.nav.faq", icon: MessageSquare },
  { href: "/admin/content/journey", key: "admin.nav.journey", icon: Route },
];

export default function AdminLayoutClient({ children, pathname: _pathname }: { children: React.ReactNode; pathname?: string }) {
  const clientPathname = usePathname();
  const pathname = _pathname || clientPathname;
  const t = useT();
  const dir = useDir();
  const { lang, toggleLang } = useI18n();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleLogout() {
    await fetch("/admin/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#071527]">{children}</div>;
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071527]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#071527]" dir={dir}>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 w-64 transform border-r border-white/10 bg-[#0B1F3A] transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
            <Link href="/admin" className="text-xl font-extrabold text-white">
              OSB<span className="text-[#2563eb]">.</span>Admin
            </Link>
            <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#2563eb] text-white"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-white/10 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              {t("admin.logout")}
            </button>
            <Link
              href="/"
              className="mt-2 flex items-center gap-3 rounded-xl px-4 py-2 text-xs text-white/40 transition-colors hover:text-white/60"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("admin.backToSite")}
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#071527]/80 px-4 py-3 backdrop-blur-md lg:px-8">
          <button className="lg:hidden text-white/60 hover:text-white" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Toggle language"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <span className="text-sm text-white/40">{t("admin.header.dashboard")}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[#2563eb] flex items-center justify-center text-sm font-bold text-white">
              A
            </div>
          </div>
        </header>
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
