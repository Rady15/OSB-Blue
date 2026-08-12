"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Image as ImageIcon, Type, Layout, Palette, Upload } from "lucide-react";

interface Block {
  id: string;
  type: string;
  content: string;
  styles?: Record<string, string>;
}

interface Section {
  id: string;
  type: string;
  label: string;
  blocks: Block[];
  styles?: Record<string, string>;
  backgroundColor?: string;
  backgroundImage?: string;
}

interface Page {
  path: string;
  title: string;
  description: string;
  sections: Section[];
  seoTitle?: string;
  seoDescription?: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    loadPage();
  }, [params.path]);

  async function loadPage() {
    try {
      const res = await fetch(`/admin/api/pages/edit?path=${encodeURIComponent(params.path as string)}`, { cache: "no-store" });
      if (!res.ok) {
        router.push("/admin/pages");
        return;
      }
      const data = await res.json();
      setPage(data);
      if (data.sections?.length > 0) {
        setActiveSection(data.sections[0].id);
      }
    } catch {
      router.push("/admin/pages");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof Page, value: any) {
    if (!page) return;
    setPage({ ...page, [field]: value });
  }

  function updateSection(sectionId: string, updates: Partial<Section>) {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)),
    });
  }

  function updateBlock(sectionId: string, blockId: string, updates: Partial<Block>) {
    if (!page) return;
    setPage({
      ...page,
      sections: page.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: s.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
            }
          : s
      ),
    });
  }

  function addSection() {
    if (!page) return;
    const newSection: Section = {
      id: generateId(),
      type: "custom",
      label: "قسم جديد",
      blocks: [
        { id: generateId(), type: "heading", content: "عنوان جديد", styles: { color: "#ffffff", fontSize: "2rem", fontWeight: "700" } },
      ],
    };
    setPage({ ...page, sections: [...page.sections, newSection] });
    setActiveSection(newSection.id);
  }

  function deleteSection(sectionId: string) {
    if (!page || !confirm("هل أنت متأكد من حذف هذا القسم؟")) return;
    setPage({ ...page, sections: page.sections.filter((s) => s.id !== sectionId) });
    if (activeSection === sectionId) {
      setActiveSection(page.sections.find((s) => s.id !== sectionId)?.id || null);
    }
  }

  function addBlock(sectionId: string) {
    if (!page) return;
    const newBlock: Block = {
      id: generateId(),
      type: "text",
      content: "نص جديد",
      styles: { color: "#ffffff", fontSize: "1rem" },
    };
    updateSection(sectionId, {
      blocks: [...page.sections.find((s) => s.id === sectionId)!.blocks, newBlock],
    });
  }

  function deleteBlock(sectionId: string, blockId: string) {
    if (!page || !confirm("حذف هذا العنصر؟")) return;
    updateSection(sectionId, {
      blocks: page.sections.find((s) => s.id === sectionId)!.blocks.filter((b) => b.id !== blockId),
    });
  }

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/admin/api/pages/edit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
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

  async function handleImageUpload(sectionId: string, blockId: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/admin/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        alert("خطأ في رفع الصورة");
        return;
      }

      const data = await res.json();
      updateBlock(sectionId, blockId, { content: data.url });
    } catch {
      alert("خطأ في الاتصال");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!page) return null;

  const activeSectionData = page.sections.find((s) => s.id === activeSection);

  return (
    <div dir="rtl">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">تعديل الصفحة</h1>
          <p className="mt-1 text-sm text-white/40">{page.path}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
        >
          <Save className="h-5 w-5" />
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>

      {message && (
        <div className={`mb-6 rounded-xl px-4 py-3 text-sm ${message.includes("نجاح") ? "border border-green-500/30 bg-green-500/10 text-green-400" : "border border-red-500/30 bg-red-500/10 text-red-400"}`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Sections list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">الأقسام</h3>
              <button
                onClick={addSection}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563eb] text-white transition hover:bg-[#2563eb]/90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {page.sections.map((section) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 rounded-xl p-3 cursor-pointer transition ${
                    activeSection === section.id ? "bg-[#2563eb]/20 border border-[#2563eb]/30" : "bg-white/5 border border-transparent hover:bg-white/10"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <GripVertical className="h-4 w-4 text-white/30" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{section.label}</p>
                    <p className="text-xs text-white/40">{section.blocks.length} عنصر</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSection(section.id);
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded text-white/40 hover:text-red-400"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Page SEO */}
          <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6">
            <h3 className="mb-4 text-lg font-bold text-white">SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-white/40">عنوان SEO</label>
                <input
                  type="text"
                  value={page.seoTitle || ""}
                  onChange={(e) => updateField("seoTitle", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/40">وصف SEO</label>
                <textarea
                  value={page.seoDescription || ""}
                  onChange={(e) => updateField("seoDescription", e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#2563eb]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section editor */}
        <div className="lg:col-span-2">
          {activeSectionData && (
            <div className="rounded-2xl border border-white/10 bg-[#0B1F3A]">
              <div className="border-b border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="text"
                    value={activeSectionData.label}
                    onChange={(e) => updateSection(activeSectionData.id, { label: e.target.value })}
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-lg font-bold text-white outline-none focus:border-[#2563eb]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs text-white/40">لون الخلفية</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={activeSectionData.backgroundColor || "#000000"}
                        onChange={(e) => updateSection(activeSectionData.id, { backgroundColor: e.target.value })}
                        className="h-10 w-14 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={activeSectionData.backgroundColor || "#000000"}
                        onChange={(e) => updateSection(activeSectionData.id, { backgroundColor: e.target.value })}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-none focus:border-[#2563eb]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-white/40">صورة الخلفية</label>
                    <input
                      type="text"
                      value={activeSectionData.backgroundImage || ""}
                      onChange={(e) => updateSection(activeSectionData.id, { backgroundImage: e.target.value })}
                      placeholder="/images/..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                    />
                  </div>
                </div>
              </div>

              {/* Blocks */}
              <div className="p-6 space-y-4">
                {activeSectionData.blocks.map((block) => (
                  <div key={block.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                        {block.type === "heading" ? <Type className="h-4 w-4 text-white/60" /> : block.type === "image" ? <ImageIcon className="h-4 w-4 text-white/60" /> : <Layout className="h-4 w-4 text-white/60" />}
                      </div>
                      <select
                        value={block.type}
                        onChange={(e) => updateBlock(activeSectionData.id, block.id, { type: e.target.value })}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none focus:border-[#2563eb]"
                      >
                        <option value="heading">عنوان</option>
                        <option value="text">نص</option>
                        <option value="image">صورة</option>
                        <option value="richtext">نص منسق</option>
                        <option value="button">زر</option>
                      </select>
                      <button
                        onClick={() => deleteBlock(activeSectionData.id, block.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {block.type === "image" ? (
                      <div className="space-y-3">
                        {block.content && (
                          <img src={block.content} alt="" className="w-full h-40 object-cover rounded-xl border border-white/10" />
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={block.content}
                            onChange={(e) => updateBlock(activeSectionData.id, block.id, { content: e.target.value })}
                            placeholder="رابط الصورة أو ارفع صورة"
                            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                          />
                          <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-white/10 bg-white/5 transition hover:bg-white/10">
                            <ImageIcon className="h-5 w-5 text-white/60" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(activeSectionData.id, block.id, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(activeSectionData.id, block.id, { content: e.target.value })}
                        rows={block.type === "heading" ? 2 : 4}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#2563eb]"
                        placeholder={block.type === "heading" ? "عنوان القسم..." : "اكتب النص هنا..."}
                      />
                    )}

                    {/* Style controls */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <label className="mb-1 block text-xs text-white/40">اللون</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={block.styles?.color || "#ffffff"}
                            onChange={(e) => updateBlock(activeSectionData.id, block.id, { styles: { ...block.styles, color: e.target.value } })}
                            className="h-8 w-10 rounded border border-white/10 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={block.styles?.color || "#ffffff"}
                            onChange={(e) => updateBlock(activeSectionData.id, block.id, { styles: { ...block.styles, color: e.target.value } })}
                            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-white outline-none"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-white/40">حجم الخط</label>
                        <input
                          type="text"
                          value={block.styles?.fontSize || "1rem"}
                          onChange={(e) => updateBlock(activeSectionData.id, block.id, { styles: { ...block.styles, fontSize: e.target.value } })}
                          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addBlock(activeSectionData.id)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 py-4 text-sm text-white/40 transition hover:border-white/20 hover:text-white/60"
                >
                  <Plus className="h-4 w-4" />
                  إضافة عنصر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
