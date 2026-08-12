"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, EyeOff } from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditBlogPost() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<Partial<BlogPost>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPost();
  }, [params.id]);

  async function fetchPost() {
    try {
      const res = await fetch(`/admin/api/blog/${params.id}`, { cache: "no-store" });
      if (!res.ok) {
        router.push("/admin/blog");
        return;
      }
      const post = await res.json();
      setFormData({
        ...post,
        tags: Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || "",
      });
    } catch {
      router.push("/admin/blog");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !prev.slug) {
        next.slug = generateSlug(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await savePost("published");
  }

  async function saveDraft() {
    await savePost("draft");
  }

  async function savePost(status: "draft" | "published") {
    setError("");

    if (!formData.title?.trim()) {
      setError("العنوان مطلوب");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/admin/api/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            status,
            tags: typeof formData.tags === "string"
              ? (formData.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
              : formData.tags,
            publishedAt: status === "published" && !formData.publishedAt
              ? new Date().toISOString()
              : formData.publishedAt,
          }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "خطأ في الحفظ");
        setSaving(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("خطأ في الاتصال");
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

  if (!formData.id) return null;

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
          <h1 className="text-2xl font-bold text-white">تعديل المقال</h1>
          <p className="mt-1 text-sm text-white/40">تعديل ونشر المقال</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">عنوان المقال *</label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#2563eb]"
                required
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">رابط المقال (slug)</label>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <span className="px-4 py-3 text-sm text-white/30">/blog/</span>
                <input
                  type="text"
                  value={formData.slug || ""}
                  onChange={(e) => updateField("slug", generateSlug(e.target.value))}
                  className="flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">ملخص المقال</label>
              <textarea
                value={formData.excerpt || ""}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#2563eb]"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">المحتوى *</label>
              <RichTextEditor
                value={formData.content || ""}
                onChange={(html) => updateField("content", html)}
                placeholder="ابدأ الكتابة هنا... استخدم شريط الأدوات لتنسيق النص"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">النشر</label>
              <button
                type="submit"
                disabled={saving}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {saving ? "جاري الحفظ..." : "نشر المقال"}
              </button>
              <button
                type="button"
                onClick={saveDraft}
                disabled={saving}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:opacity-50 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
              >
                <EyeOff className="h-4 w-4" />
                {saving ? "جاري الحفظ..." : "حفظ كمسودة"}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">معلومات المقال</label>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">المؤلف</label>
                  <input
                    type="text"
                    value={formData.author || ""}
                    onChange={(e) => updateField("author", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">التصنيف</label>
                  <input
                    type="text"
                    value={formData.category || ""}
                    onChange={(e) => updateField("category", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">الوسوم (مفصولة بفاصلة)</label>
                  <input
                    type="text"
                    value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags || ""}
                    onChange={(e) => updateField("tags", e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">صورة الغلاف</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.coverImage || ""}
                      onChange={(e) => updateField("coverImage", e.target.value)}
                      placeholder="/images/blog/cover.jpg"
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
                            updateField("coverImage", data.url);
                          }
                        }}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/60"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    </label>
                  </div>
                  {formData.coverImage && (
                    <img src={formData.coverImage} alt="Cover preview" className="mt-2 h-32 w-full rounded-xl border border-white/10 object-cover" />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">SEO</label>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">عنوان SEO</label>
                  <input
                    type="text"
                    value={formData.seoTitle || ""}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    maxLength={60}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">وصف SEO</label>
                  <textarea
                    value={formData.seoDescription || ""}
                    onChange={(e) => updateField("seoDescription", e.target.value)}
                    rows={3}
                    maxLength={160}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
