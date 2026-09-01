"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

export default function SiteConfigEditor() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    workingHours: "",
    social: { linkedin: "", instagram: "" },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    fetch("/admin/api/content/site-config", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setFormData)
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function updateSocial(field: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [field]: value },
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/admin/api/content/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">{t("admin.siteConfig.heading")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.siteConfig.subtitle")}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mr-auto inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? t("admin.alert.saving") : t("admin.siteConfig.saveSettings")}
        </button>
      </div>

      {message && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${messageType === "success" ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.siteName")}</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.tagline")}</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => updateField("tagline", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.phone")}</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.email")}</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
            />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.address")}</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.siteConfig.workingHours")}</label>
          <input
            type="text"
            value={formData.workingHours}
            onChange={(e) => updateField("workingHours", e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">LinkedIn</label>
            <input
              type="text"
              value={formData.social.linkedin}
              onChange={(e) => updateSocial("linkedin", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">Instagram</label>
            <input
              type="text"
              value={formData.social.instagram}
              onChange={(e) => updateSocial("instagram", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-[#2563eb]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
