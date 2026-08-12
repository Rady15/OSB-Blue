import { Metadata } from "next";
import { store } from "@/lib/store";

export async function generateMetadata(): Promise<Metadata> {
  const settings = store.getSettings();
  return {
    title: `صيانة | ${settings.siteName}`,
    description: "الموقع تحت الصيانة حالياً",
    robots: { index: false, follow: false },
  };
}

export default function MaintenancePage() {
  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-[#071527] px-4">
      <div className="text-center">
        <div className="mb-6 text-6xl">🔧</div>
        <h1 className="text-3xl font-extrabold text-white md:text-4xl">الموقع تحت الصيانة</h1>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          نعمل على تحسين الموقع لنقدم لك تجربة أفضل. سنعود قريباً بإذن الله.
        </p>
      </div>
    </div>
  );
}
