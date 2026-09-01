"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useT, useDir } from "@/lib/i18n";

export default function LoginPage() {
  const t = useT();
  const dir = useDir();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/admin/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || t("admin.login.errorGeneric"));
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError(t("admin.login.errorConnection"));
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#071527] px-4" dir={dir}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-extrabold text-white">
            OSB<span className="text-[#2563eb]">.</span>
          </Link>
          <p className="mt-2 text-sm text-white/40">{t("admin.login.heading")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-8">
          <h1 className="mb-6 text-xl font-bold text-white">{t("admin.login.loginTitle")}</h1>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">{t("admin.login.password")}</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("admin.login.passwordPlaceholder")}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#2563eb]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full rounded-xl bg-[#2563eb] py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]/90 disabled:opacity-50"
            >
              {loading ? t("admin.login.verifying") : t("admin.login.submit")}
            </button>
          </div>
        </form>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            {t("admin.login.backToSite")}
          </Link>
        </div>
      </div>
    </div>
  );
}
