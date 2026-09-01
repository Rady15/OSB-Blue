"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, Globe } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

interface PageSEO {
  path: string;
  title: string;
  description: string;
  keywords: string;
  noIndex: boolean;
}

export default function SEOSettingsPage() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [settings, setSettings] = useState({
    globalTitle: "",
    globalDescription: "",
    globalKeywords: "",
    ogImage: "",
    twitterHandle: "",
    googleAnalyticsId: "",
    googleSearchConsoleId: "",
  });
  const [pages, setPages] = useState<PageSEO[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    fetch("/admin/api/seo", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setSettings({
          globalTitle: data.globalTitle || "",
          globalDescription: data.globalDescription || "",
          globalKeywords: data.globalKeywords || "",
          ogImage: data.ogImage || "",
          twitterHandle: data.twitterHandle || "",
          googleAnalyticsId: data.googleAnalyticsId || "",
          googleSearchConsoleId: data.googleSearchConsoleId || "",
        });
        setPages(data.pages || []);
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateField(field: string, value: string) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function addPage() {
    setPages((prev) => [...prev, { path: "", title: "", description: "", keywords: "", noIndex: false }]);
  }

  function updatePage(index: number, field: keyof PageSEO, value: string | boolean) {
    setPages((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function removePage(index: number) {
    setPages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/admin/api/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...settings, pages }),
      });

      if (!res.ok) {
        setMessage(t("admin.alert.error"));
        setMessageType("error");
        setSaving(false);
        return;
      }

      setMessage(t("admin.alert.saved"));
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage(t("admin.alert.connection"));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div dir={dir}>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{t("admin.seo.title")}</h1>
        <p className="mt-1 text-sm text-white/40">{t("admin.seo.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`rounded-xl px-4 py-3 text-sm ${messageType === "success" ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
            {message}
          </div>
        )}

        {/* Global SEO */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h2 className="mb-6 text-lg font-bold text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-[#2563eb]" />
            {t("admin.seo.globalTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.seo.defaultSiteTitle")}</label>
              <input
                type="text"
                value={settings.globalTitle}
                onChange={(e) => updateField("globalTitle", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                maxLength={60}
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.seo.titleHint")}</p>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.seo.defaultSiteDescription")}</label>
              <textarea
                value={settings.globalDescription}
                onChange={(e) => updateField("globalDescription", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                maxLength={160}
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.seo.descriptionHint")}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.seo.keywords")}</label>
              <input
                type="text"
                value={settings.globalKeywords}
                onChange={(e) => updateField("globalKeywords", e.target.value)}
                placeholder={t("admin.seo.keywordsPlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.seo.defaultOgImage")}</label>
              <input
                type="text"
                value={settings.ogImage}
                onChange={(e) => updateField("ogImage", e.target.value)}
                placeholder="/images/hero.png"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Twitter Handle</label>
              <input
                type="text"
                value={settings.twitterHandle}
                onChange={(e) => updateField("twitterHandle", e.target.value)}
                placeholder="@osb_sa"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>
        </div>

        {/* Google Integrations */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h2 className="mb-6 text-lg font-bold text-white">{t("admin.seo.googleIntegration")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Google Analytics 4 (Measurement ID)</label>
              <input
                type="text"
                value={settings.googleAnalyticsId}
                onChange={(e) => updateField("googleAnalyticsId", e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.seo.ga4IdHint")}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Google Search Console (Verification Code)</label>
              <input
                type="text"
                value={settings.googleSearchConsoleId}
                onChange={(e) => updateField("googleSearchConsoleId", e.target.value)}
                placeholder="google-site-verification code"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.seo.gscIdHint")}</p>
            </div>
          </div>
        </div>

        {/* Per-page SEO */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A]">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h2 className="text-lg font-bold text-white">{t("admin.seo.perPage")}</h2>
            <button
              type="button"
              onClick={addPage}
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#2563eb]/90"
            >
              <Plus className="h-4 w-4" />
              {t("admin.seo.addPage")}
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {pages.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-white/40">
                {t("admin.seo.empty")}
              </div>
            )}
            {pages.map((page, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white">{t("admin.seo.pageHeader", { index: index + 1 })}</span>
                  <button
                    type="button"
                    onClick={() => removePage(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition hover:bg-red-400/10 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs text-white/40">{t("admin.seo.pagePath")}</label>
                    <input
                      type="text"
                      value={page.path}
                      onChange={(e) => updatePage(index, "path", e.target.value)}
                      placeholder="/about"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-white/40">{t("admin.seo.pageTitle")}</label>
                    <input
                      type="text"
                      value={page.title}
                      onChange={(e) => updatePage(index, "title", e.target.value)}
                      placeholder={t("admin.seo.pageTitlePlaceholder")}
                      maxLength={60}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs text-white/40">{t("admin.seo.pageDescription")}</label>
                    <textarea
                      value={page.description}
                      onChange={(e) => updatePage(index, "description", e.target.value)}
                      rows={2}
                      maxLength={160}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-white/40">{t("admin.seo.pageKeywords")}</label>
                    <input
                      type="text"
                      value={page.keywords}
                      onChange={(e) => updatePage(index, "keywords", e.target.value)}
                      placeholder={t("admin.seo.keywordsCommaPlaceholder")}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={page.noIndex}
                        onChange={(e) => updatePage(index, "noIndex", e.target.checked)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#2563eb] focus:ring-[#2563eb]"
                      />
                      <span className="text-sm text-white/60">No Index</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? t("admin.alert.saving") : t("admin.seo.saveAll")}
          </button>
          {message && (
            <span className={`text-sm ${messageType === "success" ? "text-green-400" : "text-red-400"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
