"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, ExternalLink, Plus } from "lucide-react";
import { useT, useDir, useLang } from "@/lib/i18n";

export default function PagesManagement() {
  const t = useT();
  const dir = useDir();
  const lang = useLang();
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/api/pages", { cache: "no-store" })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setPages)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  return (
    <div dir={dir}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("admin.pages.title")}</h1>
          <p className="mt-1 text-sm text-white/40">{t("admin.pages.subtitle")}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.pages.column.page")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.pages.column.path")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.pages.column.sections")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.pages.column.updated")}</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-white/40">{t("admin.pages.column.actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pages.map((page) => (
                <tr key={page.path} className="group transition hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                        <Globe className="h-5 w-5 text-white/40" />
                      </div>
                      <span className="text-sm font-medium text-white">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-[#2563eb]">{page.path}</code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/40">{t("admin.pages.sectionCount", { count: page.sections?.length || 0 })}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white/40">
                    {new Date(page.updatedAt).toLocaleDateString(lang === "en" ? "en-US" : "ar-SA")}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={page.path}
                        target="_blank"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
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
