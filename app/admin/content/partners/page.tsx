"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

interface Partner {
  name: string;
  image: string;
}

export default function PartnersEditor() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    fetch("/admin/api/content/partners", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setPartners)
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  function updatePartner(index: number, field: keyof Partner, value: string) {
    setPartners((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function addPartner() {
    setPartners((prev) => [...prev, { name: "", image: "" }]);
  }

  function removePartner(index: number) {
    if (!confirm(t("admin.partners.deleteConfirm"))) return;
    setPartners((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/admin/api/content/partners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partners),
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
          <h1 className="text-2xl font-bold text-white">{t("admin.partners.heading")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.partners.subtitle")}</p>
        </div>
        <div className="mr-auto flex gap-2">
          <button
            onClick={addPartner}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            {t("admin.partners.addPartner")}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-green-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? t("admin.alert.saving") : t("admin.partners.saveAll")}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${messageType === "success" ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.partners.name")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.partners.image")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.partners.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {partners.map((partner, index) => (
                <tr key={index} className="group transition hover:bg-white/5">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) => updatePartner(index, "name", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={partner.image}
                        onChange={(e) => updatePartner(index, "image", e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                      />
                      <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const fd = new FormData();
                            fd.append("file", file);
                            const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
                            if (res.ok) {
                              const data = await res.json();
                              updatePartner(index, "image", data.url);
                            }
                          }}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      </label>
                    </div>
                    {partner.image && (
                      <img src={partner.image} alt={partner.name} className="mt-2 h-12 w-16 rounded-lg border border-white/10 object-cover" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => removePartner(index)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-red-400/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
