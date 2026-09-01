"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Globe, Mail, MapPin, Clock, Link2 } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

export default function SettingsPage() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [settings, setSettings] = useState({
    siteName: "",
    siteTagline: "",
    phone: "",
    email: "",
    address: "",
    workingHours: "",
    social: { linkedin: "", instagram: "" },
    maintenanceMode: false,
  });
  const [seo, setSeo] = useState({
    googleAnalyticsId: "",
    googleSearchConsoleId: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/admin/api/settings?type=site", { cache: "no-store" }),
      fetch("/admin/api/settings?type=seo", { cache: "no-store" }),
    ])
      .then(async ([siteRes, seoRes]) => {
        if (siteRes.ok) setSettings(await siteRes.json());
        if (seoRes.ok) setSeo(await seoRes.json());
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateField(field: string, value: string | boolean) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function updateSocial(field: string, value: string) {
    setSettings((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
  }

  function updateSEO(field: string, value: string) {
    setSeo((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const [siteRes, seoRes] = await Promise.all([
        fetch("/admin/api/settings?type=site", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(settings),
        }),
        fetch("/admin/api/settings?type=seo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(seo),
        }),
      ]);

      if (!siteRes.ok || !seoRes.ok) {
        setMessage(t("admin.alert.error"));
        setSaving(false);
        return;
      }

      setMessage(t("admin.alert.saved"));
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage(t("admin.alert.connection"));
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
        <h1 className="text-2xl font-bold text-white">{t("admin.settings.title")}</h1>
        <p className="mt-1 text-sm text-white/40">{t("admin.settings.subtitle")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`rounded-xl px-4 py-3 text-sm ${message === t("admin.alert.saved") ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
            {message}
          </div>
        )}

        {/* Site Info */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h2 className="mb-6 text-lg font-bold text-white">{t("admin.settings.siteInfo")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.siteName")}</label>
              <div className="relative">
                <Globe className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => updateField("siteName", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.tagline")}</label>
              <input
                type="text"
                value={settings.siteTagline}
                onChange={(e) => updateField("siteTagline", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.phone")}</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-white/30">+966</span>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="50 000 0000"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-12 pl-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.email")}</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.address")}</label>
              <div className="relative">
                <MapPin className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.workingHours")}</label>
              <div className="relative">
                <Clock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => updateField("workingHours", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">LinkedIn</label>
              <div className="relative">
                <Link2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={settings.social.linkedin}
                  onChange={(e) => updateSocial("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Instagram</label>
              <div className="relative">
                <Link2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={settings.social.instagram}
                  onChange={(e) => updateSocial("instagram", e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-10 pl-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">{t("admin.settings.maintenanceTitle")}</h2>
              <p className="mt-1 text-sm text-white/40">{t("admin.settings.maintenanceDescription")}</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => updateField("maintenanceMode", e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-6 w-11 rounded-full bg-white/10 peer-checked:bg-[#2563eb] after:absolute after:right-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5" />
            </label>
          </div>
        </div>

        {/* Google Integrations */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h2 className="mb-6 text-lg font-bold text-white">{t("admin.settings.googleLatest")}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.ga4MeasurementId")}</label>
              <input
                type="text"
                value={seo.googleAnalyticsId}
                onChange={(e) => updateSEO("googleAnalyticsId", e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.settings.ga4IdHint")}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.settings.gscVerification")}</label>
              <input
                type="text"
                value={seo.googleSearchConsoleId}
                onChange={(e) => updateSEO("googleSearchConsoleId", e.target.value)}
                placeholder="google-site-verification"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
              <p className="mt-1 text-xs text-white/30">{t("admin.settings.gscHint")}</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-white/5 bg-white/5 p-4">
            <h3 className="mb-2 text-sm font-bold text-white/60">{t("admin.settings.instructions")}</h3>
            <div className="space-y-2 text-xs text-white/40 leading-relaxed">
              <p><strong className="text-white/60">Google Analytics 4:</strong> {t("admin.settings.ga4Instructions")}</p>
              <p><strong className="text-white/60">Search Console:</strong> {t("admin.settings.gscInstructions")}</p>
            </div>
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
            {saving ? t("admin.alert.saving") : t("admin.settings.saveSettings")}
          </button>
          {message && (
            <span className={`text-sm ${message === t("admin.alert.saved") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
