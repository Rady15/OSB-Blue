"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";

export default function NewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    path: "",
    title: "",
    description: "",
    sections: [] as any[],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.path.trim() || !formData.title.trim()) {
      setError("المسار والعنوان مطلوبان");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/admin/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "خطأ في الحفظ");
        setSaving(false);
        return;
      }

      router.push("/admin/pages");
      router.refresh();
    } catch {
      setError("خطأ في الاتصال");
      setSaving(false);
    }
  }

  return (
    <div dir="rtl">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">صفحة جديدة</h1>
          <p className="mt-1 text-sm text-white/40">إنشاء صفحة جديدة مع أقسام قابلة للتعديل</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">مسار الصفحة *</label>
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 overflow-hidden">
              <span className="px-4 py-3 text-sm text-white/30">/</span>
              <input
                type="text"
                value={formData.path}
                onChange={(e) => updateField("path", e.target.value)}
                placeholder="مثال: about-us"
                className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-white/30 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">عنوان الصفحة *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="عنوان الصفحة"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? "جاري الحفظ..." : "إنشاء الصفحة"}
          </button>
        </div>
      </form>
    </div>
  );
}
