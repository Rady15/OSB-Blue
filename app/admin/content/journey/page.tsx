"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

interface JourneyStep {
  title: string;
  description: string;
}

export default function JourneyEditor() {
  const router = useRouter();
  const [steps, setSteps] = useState<JourneyStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/admin/api/content/journey", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setSteps)
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateStep(index: number, field: keyof JourneyStep, value: string) {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function addStep() {
    setSteps((prev) => [...prev, { title: "", description: "" }]);
  }

  function removeStep(index: number) {
    if (!confirm("حذف هذه الخطوة؟")) return;
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/admin/api/content/journey", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(steps),
      });

      if (!res.ok) {
        setMessage("خطأ في الحفظ");
        setSaving(false);
        return;
      }

      setMessage("تم الحفظ بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("خطأ في الاتصال");
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
    <div dir="rtl">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">مراحل العمل</h1>
          <p className="mt-1 text-sm text-white/40">تحرير خطوات الرحلة</p>
        </div>
        <div className="mr-auto flex gap-2">
          <button
            onClick={addStep}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            إضافة خطوة
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-green-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "جاري الحفظ..." : "حفظ الكل"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${message.includes("نجاح") ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-white/60">خطوة #{index + 1}</span>
              <button
                onClick={() => removeStep(index)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-white/40">العنوان</label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/40">الوصف</label>
                <textarea
                  value={step.description}
                  onChange={(e) => updateStep(index, "description", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
