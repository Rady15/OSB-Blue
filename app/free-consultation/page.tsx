import type { Metadata } from "next";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

export const metadata: Metadata = {
  title: "احجز استشارتك المجانية | OSB",
  description: "استشارة تغير مسار مشروعك. نجلس معك، نفهم وضعك، ونخبرك بصدق ما الذي تحتاجه.",
};

export default function FreeConsultationPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black pb-20 pt-36 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_24%,rgba(37,99,235,0.3),transparent_30%),radial-gradient(circle_at_82%_34%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="soft-light-beam right-0 top-28" />
      <div className="container-osb relative z-10 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 text-sm font-bold text-white/55">استشارة مجانية</p>
          <ScrollRevealText as="h1" text="احجز استشارتك المجانية" wordsPerLine={4} className="text-5xl font-extrabold leading-[1.5] md:text-7xl" />
          <p className="mt-6 max-w-3xl text-xl leading-10 text-white/60">
            استشارة تغير مسار مشروعك. نجلس معك، نفهم وضعك، ونخبرك بصدق ما الذي تحتاجه — وما لا تحتاجه. بدون التزام. بدون ضغط. بدون تكلفة.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-bold text-white/75 sm:grid-cols-3">
            {["تشخيص واضح", "خطوات مرتبة", "قرار قبل التكلفة"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="glow-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
          <div className="rounded-[1.5rem] border border-white/10 bg-black p-5 md:p-7">
          <ConsultationForm light />
          </div>
        </div>
      </div>
    </section>
  );
}
