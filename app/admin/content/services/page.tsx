"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";

interface Service {
  slug: string;
  title: string;
  heroQuestion: string;
  problemParagraphs: string[];
  solutionParagraph: string;
  suitableIf: string[];
  icon: string;
  image: string;
}

export default function ServicesEditor() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/admin/api/content/services", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setServices)
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  function updateService(index: number, field: keyof Service, value: any) {
    setServices((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }

  function updateArrayItem(index: number, field: "problemParagraphs" | "suitableIf", itemIndex: number, value: string) {
    setServices((prev) => prev.map((s, i) => {
      if (i !== index) return s;
      const newArr = [...s[field]];
      newArr[itemIndex] = value;
      return { ...s, [field]: newArr };
    }));
  }

  function addArrayItem(index: number, field: "problemParagraphs" | "suitableIf") {
    setServices((prev) => prev.map((s, i) => {
      if (i !== index) return s;
      return { ...s, [field]: [...s[field], ""] };
    }));
  }

  function removeArrayItem(index: number, field: "problemParagraphs" | "suitableIf", itemIndex: number) {
    setServices((prev) => prev.map((s, i) => {
      if (i !== index) return s;
      const newArr = s[field].filter((_, idx) => idx !== itemIndex);
      return { ...s, [field]: newArr };
    }));
  }

  function addService() {
    setServices((prev) => [...prev, {
      slug: "",
      title: "",
      heroQuestion: "",
      problemParagraphs: [""],
      solutionParagraph: "",
      suitableIf: [""],
      icon: "LineChart",
      image: "",
    }]);
  }

  function removeService(index: number) {
    if (!confirm("حذف هذه الخدمة؟")) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/admin/api/content/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
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
          <h1 className="text-2xl font-bold text-white">الخدمات</h1>
          <p className="mt-1 text-sm text-white/40">تحرير قائمة الخدمات</p>
        </div>
        <div className="mr-auto flex gap-2">
          <button
            onClick={addService}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white"
          >
            <Plus className="h-4 w-4" />
            إضافة خدمة
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

      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">خدمة #{index + 1}</h3>
              <button
                onClick={() => removeService(index)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-white/40">الأيقونة (اسم Lucide)</label>
                <input
                  type="text"
                  value={service.icon}
                  onChange={(e) => updateService(index, "icon", e.target.value)}
                  placeholder="مثال: LineChart"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/40">صورة الخدمة</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={service.image || ""}
                    onChange={(e) => updateService(index, "image", e.target.value)}
                    placeholder="/images/service.jpg"
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
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
                          updateService(index, "image", data.url);
                        }
                      }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  </label>
                </div>
                {service.image && (
                  <img src={service.image} alt="Service preview" className="mt-2 h-24 w-full rounded-xl border border-white/10 object-cover" />
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-white/40">سؤال البطل</label>
                <input
                  type="text"
                  value={service.heroQuestion}
                  onChange={(e) => updateService(index, "heroQuestion", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-white/40">فقرة المشكلة</label>
                <textarea
                  value={service.problemParagraphs[0] || ""}
                  onChange={(e) => updateArrayItem(index, "problemParagraphs", 0, e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-white/40">الحل</label>
                <textarea
                  value={service.solutionParagraph}
                  onChange={(e) => updateService(index, "solutionParagraph", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs text-white/40">من تناسب الخدمة</label>
                <div className="space-y-2">
                  {service.suitableIf.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateArrayItem(index, "suitableIf", i, e.target.value)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                      />
                      <button
                        onClick={() => removeArrayItem(index, "suitableIf", i)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addArrayItem(index, "suitableIf")}
                    className="flex items-center gap-2 text-sm text-white/40 hover:text-white"
                  >
                    <Plus className="h-4 w-4" />
                    إضافة نقطة
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
