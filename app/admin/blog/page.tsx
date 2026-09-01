"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { BlogPost } from "@/data/store";
import { useT, useDir, useLang } from "@/lib/i18n";

export default function BlogListPage() {
  const t = useT();
  const dir = useDir();
  const lang = useLang();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const res = await fetch("/admin/api/blog", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setPosts(data.sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t("admin.blog.deleteConfirm"))) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/admin/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      alert(t("admin.blog.deleteError"));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div dir={dir}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("admin.blog.title")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.blog.subtitle")}</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90"
        >
          <Plus className="h-5 w-5" />
          {t("admin.blog.newPost")}
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] overflow-hidden">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
              <Search className="h-8 w-8 text-white/20" />
            </div>
            <p className="mt-4 text-sm text-white/40">{t("admin.blog.empty")}</p>
            <Link
              href="/admin/blog/new"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-sm font-bold text-white"
            >
              <Plus className="h-5 w-5" />
              {t("admin.blog.writeFirst")}
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.blog.column.title")}</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.blog.column.category")}</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.blog.column.status")}</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.blog.column.date")}</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.blog.column.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post) => (
                  <tr key={post.id} className="group transition hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">{post.title}</p>
                        <p className="mt-1 text-xs text-white/30">/{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                        {post.category || t("admin.blog.general")}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                          post.status === "published"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-yellow-400/10 text-yellow-400"
                        }`}
                      >
                        {post.status === "published" ? (
                          <>
                            <Eye className="h-3 w-3" />
                            {t("admin.blog.published")}
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            {t("admin.blog.draft")}
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(lang === "en" ? "en-US" : "ar-SA") : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${post.id}`}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-red-400/10 hover:text-red-400 disabled:opacity-50"
                        >
                          {deletingId === post.id ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
