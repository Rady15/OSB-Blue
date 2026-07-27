import Link from "next/link";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_28%,rgba(37,99,235,0.25),transparent_30%)]" />
      <div className="container-osb relative z-10 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-bold text-white/55">استشارة مجانية</p>
          <ScrollRevealText
            as="h2"
            text="ابدأ بخطوة صحيحة قبل أي قرار مكلف"
            className="text-3xl font-extrabold leading-[1.5] md:text-5xl"
          />
          <p className="mt-5 text-lg leading-9 text-white/60">
            نجلس معك، نفهم وضعك، ونخبرك بصدق ما الذي تحتاجه — وما لا تحتاجه. بدون التزام. بدون ضغط. بدون تكلفة.
          </p>
        </div>
        <div className="glow-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-black p-5">
            <ConsultationForm light />
            <Link href="/free-consultation" className="mt-4 block text-center text-sm font-bold text-white/55 transition hover:text-white">
              أو تفضّل بزيارة صفحة الاستشارة الكاملة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
