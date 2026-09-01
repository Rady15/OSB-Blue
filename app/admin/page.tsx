import { Metadata } from "next";
import Link from "next/link";
import { FileText, Plus, Eye, EyeOff, Globe, Settings, TrendingUp, Palette } from "lucide-react";
import { store } from "@/lib/store";
import { contentStore } from "@/lib/content-store";
import { getT } from "@/lib/get-t";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getT();
  return {
    title: `${t("admin.dashboard.title")} | OSB Admin`,
    robots: { index: false, follow: false },
  };
}

export default async function AdminDashboard() {
  const { lang, dir, t } = getT();
  const blogPosts = store.getBlogPosts();
  const publishedPosts = blogPosts.filter((p) => p.status === "published");
  const draftPosts = blogPosts.filter((p) => p.status === "draft");
  const seo = store.getSEO();
  const settings = store.getSettings();
  const pages = contentStore.getPages();

  const stats = [
    {
      label: t("admin.dashboard.publishedPosts"),
      value: publishedPosts.length,
      icon: FileText,
      color: "text-green-400",
      bg: "bg-green-400/10",
      href: "/admin/blog",
    },
    {
      label: t("admin.dashboard.draftPosts"),
      value: draftPosts.length,
      icon: FileText,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      href: "/admin/blog",
    },
    {
      label: t("admin.dashboard.pages"),
      value: t("admin.dashboard.pagesCount", { count: pages.length }),
      icon: Globe,
      color: "text-[#2563eb]",
      bg: "bg-[#2563eb]/10",
      href: "/admin/pages",
    },
    {
      label: t("admin.dashboard.seoSettings"),
      value: seo.pages.length > 0 ? t("admin.dashboard.pagesCount", { count: seo.pages.length }) : t("admin.dashboard.notConfigured"),
      icon: Globe,
      color: "text-[#2563eb]",
      bg: "bg-[#2563eb]/10",
      href: "/admin/seo",
    },
  ];

  const recentPosts = [...blogPosts]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div dir={dir}>
      {/* Blog Hero Section */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1F3A] to-[#071527] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 text-xs font-bold text-[#2563eb]">
              <TrendingUp className="h-3.5 w-3.5" />
              {t("admin.dashboard.badge")}
            </div>
            <h1 className="text-2xl font-extrabold text-white md:text-3xl">{t("admin.dashboard.heading")}</h1>
            <p className="mt-2 max-w-xl text-sm text-white/50">
              {t("admin.dashboard.subtitle")}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/admin/blog/new"
                className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90"
              >
                <Plus className="h-5 w-5" />
                {t("admin.dashboard.writePost")}
              </Link>
              <Link
                href="/admin/blog"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <FileText className="h-5 w-5" />
                {t("admin.dashboard.allPosts")}
              </Link>
              <Link
                href="/blog"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                <Eye className="h-5 w-5" />
                {t("admin.dashboard.previewBlog")}
              </Link>
            </div>
          </div>
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <p className="text-3xl font-extrabold text-white">{blogPosts.length}</p>
              <p className="mt-1 text-xs text-white/40">{t("admin.dashboard.totalPosts")}</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-green-400">{publishedPosts.length}</p>
              <p className="mt-1 text-xs text-white/40">{t("admin.dashboard.published")}</p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-3xl font-extrabold text-yellow-400">{draftPosts.length}</p>
              <p className="mt-1 text-xs text-white/40">{t("admin.dashboard.drafts")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-5 transition hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/40">{stat.label}</p>
                <p className={`mt-1 text-2xl font-extrabold ${stat.color}`}>{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent posts + Quick links */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent posts */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-[#0B1F3A]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h2 className="text-lg font-bold text-white">{t("admin.dashboard.recentPosts")}</h2>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#2563eb]/90"
            >
              <Plus className="h-4 w-4" />
              {t("admin.dashboard.newPost")}
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentPosts.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-white/20" />
                <p className="mt-3 text-sm text-white/40">{t("admin.dashboard.noPostsYet")}</p>
                <Link
                  href="/admin/blog/new"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-[#2563eb] hover:underline"
                >
                  <Plus className="h-4 w-4" />
                  {t("admin.dashboard.writeFirstPost")}
                </Link>
              </div>
            ) : (
              recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/blog/edit/${post.id}`}
                  className="flex items-center justify-between px-6 py-4 transition hover:bg-white/5"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{post.title}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {post.status === "published" ? t("admin.dashboard.published") : t("admin.dashboard.drafts")} •{" "}
                      {new Date(post.updatedAt).toLocaleDateString("ar-SA")}
                    </p>
                  </div>
                  <span
                    className={`mr-4 shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      post.status === "published"
                        ? "bg-green-400/10 text-green-400"
                        : "bg-yellow-400/10 text-yellow-400"
                    }`}
                  >
                    {post.status === "published" ? t("admin.dashboard.published") : t("admin.dashboard.drafts")}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick links */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <h3 className="mb-4 text-sm font-bold text-white/60">{t("admin.dashboard.quickLinks")}</h3>
            <div className="space-y-3">
              {[
                { href: "/admin/blog/new", label: t("admin.dashboard.writeNewPost"), icon: Plus },
                { href: "/admin/seo", label: t("admin.dashboard.seoSettings"), icon: Globe },
                { href: "/admin/settings", label: t("admin.dashboard.siteSettings"), icon: Settings },
                { href: "/admin/settings/branding", label: t("admin.dashboard.branding"), icon: Palette },
                { href: "/admin/pages", label: t("admin.dashboard.managePages"), icon: Eye },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  <link.icon className="h-5 w-5 text-[#2563eb]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* SEO Status */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <h3 className="mb-4 text-sm font-bold text-white/60">{t("admin.dashboard.seoStatus")}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Google Analytics</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    seo.googleAnalyticsId ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {seo.googleAnalyticsId ? t("admin.dashboard.enabled") : t("admin.dashboard.disabled")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Search Console</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    seo.googleSearchConsoleId ? "bg-green-400/10 text-green-400" : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {seo.googleSearchConsoleId ? t("admin.dashboard.enabled") : t("admin.dashboard.disabled")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">{t("admin.dashboard.seoPages")}</span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    seo.pages.length > 0 ? "bg-green-400/10 text-green-400" : "bg-yellow-400/10 text-yellow-400"
                  }`}
                >
                  {seo.pages.length > 0 ? t("admin.dashboard.pagesCount", { count: seo.pages.length }) : t("admin.dashboard.notConfigured")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
