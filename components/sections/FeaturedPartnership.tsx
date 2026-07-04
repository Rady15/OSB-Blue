import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

const points = ["تحليل وضع المشروع قبل التنفيذ", "تحديد الأولويات والتكلفة والمدة", "ربطك بالشركاء والمتخصصين المناسبين"];

export function FeaturedPartnership() {
  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_28%,rgba(37,99,235,0.24),transparent_28%)]" />
      <span className="soft-light-beam left-0 top-24" />
      <span className="soft-light-beam bottom-24 right-0" />
      <div className="container-osb relative z-10 grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div data-image-reveal className="image-reveal glow-panel overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3">
          <Image
            src="/images/business-strategy.svg"
            alt="تحليل استراتيجية الأعمال"
            width={960}
            height={720}
            className="h-auto w-full rounded-[1.6rem]"
            priority={false}
          />
        </div>
        <div>
          <p className="mb-3 font-bold text-white/70">شراكة تشغيلية متكاملة</p>
          <ScrollRevealText
            as="h2"
            text="نفس إحساس المواقع التفاعلية: حركة، عمق، ووضوح في كل خطوة"
            wordsPerLine={5}
            className="text-3xl font-extrabold leading-tight md:text-5xl"
          />
          <ScrollRevealText
            as="p"
            text="نضع مشروعك داخل مسار واضح، ثم نستخدم التصميم والحركة لتوصيل هذه الفكرة بصرياً: تشخيص، توجيه، تنفيذ، ثم متابعة مستمرة."
            wordsPerLine={9}
            className="mt-6 text-lg leading-9 text-white/60"
          />
          <div className="mt-8 grid gap-4">
            {points.map((point) => (
              <div key={point} data-tilt className="tilt-card glow-panel flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur">
                <CheckCircle2 className="h-6 w-6 text-white" />
                <span className="font-bold">{point}</span>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <LinkButton href="/free-consultation">احصل على جلسة مجانية</LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
