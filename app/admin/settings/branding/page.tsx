"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

export default function BrandingEditor() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [branding, setBranding] = useState({
    logo: "",
    logoDark: "",
    favicon: "",
    primaryColor: "#0B1F3A",
    secondaryColor: "#2563eb",
    accentColor: "#ffffff",
    backgroundColor: "#000000",
    textColor: "#ffffff",
    fontFamily: "Tajawal",
    siteName: "OSB",
    siteTagline: "One Stop Business",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/admin/api/branding", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBranding)
      .catch(() => router.push("/admin/pages"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateField(field: string, value: string) {
    setBranding((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(field: "logo" | "logoDark" | "favicon", file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert(t("admin.branding.errors.upload"));
        return;
      }

      const data = await res.json();
      updateField(field, data.url);
    } catch {
      alert(t("admin.alert.connection"));
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/admin/api/branding", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(branding),
      });

      if (!res.ok) {
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
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{t("admin.branding.heading")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.branding.subtitle")}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mr-auto inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? t("admin.alert.saving") : t("admin.branding.saveSettings")}
        </button>
      </div>

      {message && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${message === t("admin.alert.saved") ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Logo & Identity */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h3 className="mb-6 text-lg font-bold text-white">{t("admin.branding.logoIdentity")}</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.siteName")}</label>
              <input
                type="text"
                value={branding.siteName}
                onChange={(e) => updateField("siteName", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.tagline")}</label>
              <input
                type="text"
                value={branding.siteTagline}
                onChange={(e) => updateField("siteTagline", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.logoLight")}</label>
              <div className="flex items-center gap-3">
                {branding.logo && (
                  <img src={branding.logo} alt="Logo" className="h-12 w-auto rounded-lg border border-white/10 bg-white/5 p-2" />
                )}
                <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-white/40 transition hover:border-white/20 hover:text-white/60">
                  <Upload className="h-4 w-4" />
                  {t("admin.branding.uploadImage")}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload("logo", file);
                    }}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.logoUrl")}</label>
              <input
                type="text"
                value={branding.logo}
                onChange={(e) => updateField("logo", e.target.value)}
                placeholder="/images/logo.png"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.favicon")}</label>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-3 text-sm text-white/40 transition hover:border-white/20 hover:text-white/60">
                <Upload className="h-4 w-4" />
                {t("admin.branding.uploadFavicon")}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload("favicon", file);
                  }}
                />
              </label>
              {branding.favicon && (
                <p className="mt-2 text-xs text-white/40">{branding.favicon}</p>
              )}
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h3 className="mb-6 text-lg font-bold text-white">{t("admin.branding.colors")}</h3>
          <div className="space-y-4">
            {[
              { key: "primaryColor", label: t("admin.branding.primaryColor"), description: t("admin.branding.primaryColorDesc") },
              { key: "secondaryColor", label: t("admin.branding.secondaryColor"), description: t("admin.branding.secondaryColorDesc") },
              { key: "accentColor", label: t("admin.branding.accentColor"), description: t("admin.branding.accentColorDesc") },
              { key: "backgroundColor", label: t("admin.branding.backgroundColor"), description: t("admin.branding.backgroundColorDesc") },
              { key: "textColor", label: t("admin.branding.textColor"), description: t("admin.branding.textColorDesc") },
            ].map((color) => (
              <div key={color.key}>
                <label className="mb-2 block text-sm font-medium text-white/70">{color.label}</label>
                <p className="mb-1.5 text-xs text-white/30">{color.description}</p>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={branding[color.key as keyof typeof branding] as string}
                    onChange={(e) => updateField(color.key, e.target.value)}
                    className="h-10 w-14 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={branding[color.key as keyof typeof branding] as string}
                    onChange={(e) => updateField(color.key, e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h3 className="mb-6 text-lg font-bold text-white">{t("admin.branding.typography")}</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.branding.defaultFont")}</label>
              <select
                value={branding.fontFamily}
                onChange={(e) => updateField("fontFamily", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
              >
                <option value="Tajawal">Tajawal</option>
                <option value="Cairo">Cairo</option>
                <option value="Tajawal">Almarai</option>
                <option value="IBM Plex Sans Arabic">IBM Plex Sans Arabic</option>
              </select>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs text-white/40">{t("admin.branding.fontPreview")}</p>
              <p className="mt-2 text-2xl font-bold" style={{ fontFamily: branding.fontFamily }}>
                {t("admin.branding.sampleText")}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
          <h3 className="mb-6 text-lg font-bold text-white">{t("admin.branding.preview")}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl" style={{ backgroundColor: branding.primaryColor }} />
              <div>
                <p className="text-sm font-medium text-white">{t("admin.branding.primaryColor")}</p>
                <p className="text-xs text-white/40">{branding.primaryColor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl" style={{ backgroundColor: branding.secondaryColor }} />
              <div>
                <p className="text-sm font-medium text-white">{t("admin.branding.secondaryColor")}</p>
                <p className="text-xs text-white/40">{branding.secondaryColor}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl border border-white/10" style={{ backgroundColor: branding.backgroundColor }} />
              <div>
                <p className="text-sm font-medium text-white">{t("admin.branding.background")}</p>
                <p className="text-xs text-white/40">{branding.backgroundColor}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
