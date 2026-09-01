import { Metadata } from "next";
import { store } from "@/lib/store";
import { getT } from "@/lib/get-t";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = getT();
  const settings = store.getSettings();
  return {
    title: t("page.maintenance.metaTitle", { siteName: settings.siteName }),
    description: t("page.maintenance.metaDescription"),
    robots: { index: false, follow: false },
  };
}

export default function MaintenancePage() {
  const { t, dir } = getT();
  return (
    <div dir={dir} className="flex min-h-screen items-center justify-center bg-[#071527] px-4">
      <div className="text-center">
        <div className="mb-6 text-6xl">🔧</div>
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">{t("page.maintenance.title")}</h1>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          {t("page.maintenance.description")}
        </p>
      </div>
    </div>
  );
}
