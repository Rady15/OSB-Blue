"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, EyeOff, Wand2 } from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { useT, useDir } from "@/lib/i18n";

const EMPTY_POST = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  author: "",
  category: "",
  tags: "",
  status: "draft" as const,
  seoTitle: "",
  seoDescription: "",
};

export default function NewBlogPost() {
  const t = useT();
  const dir = useDir();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    author: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published",
    seoTitle: "",
    seoDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  function updateField<K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && !slugEdited) {
        next.slug = generateSlug(value);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError(t("admin.blog.new.titleRequired"));
      return;
    }
    if (!formData.content.trim()) {
      setError(t("admin.blog.new.contentRequired"));
      return;
    }

    await savePost({ ...formData, status: "published" });
  }

  async function saveDraft() {
    setError("");
    if (!formData.title.trim()) {
      setError(t("admin.blog.new.titleRequired"));
      return;
    }
    await savePost({ ...formData, status: "draft" });
  }

  async function savePost(data: typeof formData) {
    setLoading(true);
    try {
      const payload: any = {
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      if (data.status === "published") {
        payload.publishedAt = new Date().toISOString();
      }

      const res = await fetch("/admin/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const resData = await res.json();
        setError(resData.error || t("admin.alert.error"));
        setLoading(false);
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError(t("admin.alert.connection"));
      setLoading(false);
    }
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
          <h1 className="text-2xl font-bold text-white">{t("admin.blog.new.heading")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.blog.new.subtitle")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Title */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.blog.new.title")}</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder={t("admin.blog.new.titlePlaceholder")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#2563eb]"
                required
              />
            </div>

            {/* Slug */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-white/70">{t("admin.blog.new.slug")}</label>
                <button
                  type="button"
                  onClick={() => {
                    setSlugEdited(false);
                    updateField("slug", generateSlug(formData.title));
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#2563eb] transition hover:text-white"
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  {t("admin.blog.new.slugAuto")}
                </button>
              </div>
              <div className="flex items-center rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <span className="px-4 py-3 text-sm text-white/30">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    updateField("slug", generateSlug(e.target.value));
                  }}
                  placeholder="article-slug"
                  className="flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder-white/30 outline-none"
                />
              </div>
              <p className="mt-2 text-xs text-white/30">{t("admin.blog.new.slugHint")}</p>
            </div>

            {/* Excerpt */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.blog.new.excerpt")}</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder={t("admin.blog.new.excerptPlaceholder")}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#2563eb]"
              />
            </div>

            {/* Content */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.blog.new.content")}</label>
              <RichTextEditor
                value={formData.content}
                onChange={(html) => updateField("content", html)}
                placeholder={t("admin.blog.new.contentPlaceholder")}
              />
              <p className="mt-2 text-xs text-white/30">
                {t("admin.blog.new.contentHint")}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish box */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">{t("admin.blog.new.publish")}</label>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
              >
                <Save className="h-5 w-5" />
                {loading ? t("admin.alert.saving") : t("admin.blog.new.publishPost")}
              </button>
              <button
                type="button"
                onClick={saveDraft}
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:opacity-50 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
              >
                <EyeOff className="h-4 w-4" />
                {loading ? t("admin.alert.saving") : t("admin.blog.new.saveDraft")}
              </button>
            </div>

            {/* Meta */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">{t("admin.blog.new.meta")}</label>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.author")}</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => updateField("author", e.target.value)}
                    placeholder={t("admin.blog.new.authorPlaceholder")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.category")}</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => updateField("category", e.target.value)}
                    placeholder={t("admin.blog.new.categoryPlaceholder")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.tags")}</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => updateField("tags", e.target.value)}
                    placeholder={t("admin.blog.new.tagsPlaceholder")}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.coverImage")}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData.coverImage}
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

            {/* SEO */}
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
              <label className="mb-3 block text-sm font-medium text-white/70">{t("admin.blog.new.seo")}</label>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.seoTitle")}</label>
                  <input
                    type="text"
                    value={formData.seoTitle}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    placeholder={formData.title || t("admin.blog.new.titlePlaceholder")}
                    maxLength={60}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-white/40">{t("admin.blog.new.seoDescription")}</label>
                  <textarea
                    value={formData.seoDescription}
                    onChange={(e) => updateField("seoDescription", e.target.value)}
                    placeholder={formData.excerpt || t("admin.blog.new.seoDescriptionPlaceholder")}
                    rows={3}
                    maxLength={160}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
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
