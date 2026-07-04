import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { ScatterImage } from "@/components/ui/ScatterImage";
import { ServicesHoverGrid } from "@/components/sections/ServicesHoverGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { partners } from "@/data/partners";

const stats = [
  ["+5,000", "إجراء مكتمل"],
  ["+370", "ملف أعمال مدروس"],
  ["+13K", "متابعة وإجراء"],
  ["+385", "استشارة منجزة"],
];

export default function Home() {
  return (
    <div className="adsela-page min-h-screen overflow-hidden bg-black text-white">
      <section className="relative min-h-screen overflow-hidden bg-black pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(37,99,235,0.32),transparent_28%),radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.08),transparent_20%)]" />
        <div className="absolute left-10 top-24 hidden flex-col gap-3 md:flex">
          {[0, 1, 2, 3, 4].map((item) => (
            <span key={item} className="h-2 w-2 rounded-full bg-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.9)]" />
          ))}
        </div>
        <div className="container-osb relative z-10 grid min-h-[78vh] items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div data-parallax="34" className="order-2 lg:order-1">
            <div className="glow-panel rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur">
              <div className="rounded-[1.5rem] border border-white/10 bg-black p-5">
                <p className="mb-4 text-sm font-bold text-white/60">أنا مهتم بـ</p>
                <div className="mb-5 grid grid-cols-2 gap-2 text-xs font-bold">
                  {["تأسيس شركة", "استشارة قانونية", "محاسبة وزكاة", "إجراءات حكومية"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-white/80">
                      {item}
                    </span>
                  ))}
                </div>
                <ConsultationForm compact light />
              </div>
            </div>
          </div>
          <div className="order-1 text-right lg:order-2">
            <p className="mb-5 text-sm font-bold text-white/55">OSB — One Stop Business</p>
            <ScrollRevealText
              as="h1"
              text="كل ما يحتاجه مشروعك في مكان واحد"
              wordsPerLine={3}
              className="text-5xl font-extrabold leading-[1.08] md:text-7xl"
            />
            <ScrollRevealText
              as="p"
              text="من الفكرة إلى التشغيل، نساعدك على اتخاذ القرارات الصحيحة قبل أن تستثمر وقتك وميزانيتك."
              wordsPerLine={7}
              className="mt-7 max-w-2xl text-lg leading-9 text-white/65"
            />
            <Link
              href="/free-consultation"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#2563eb] px-7 py-4 text-sm font-extrabold text-white shadow-[0_0_42px_rgba(37,99,235,0.55)] transition hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              تواصل معنا <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="bg-black py-10">
        <p className="mb-7 text-center text-sm font-bold text-white/50">نفتخر أيضاً بشركائنا</p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
          <div className="marquee-track-reverse flex w-max">
            <div className="flex gap-4">
              {partners.map((partner, index) => (
                <div key={partner.name} className="grid h-24 w-44 shrink-0 place-items-center rounded-xl bg-white p-4">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={140}
                    height={70}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {partners.map((partner, index) => (
                <div key={`dup-${partner.name}`} className="grid h-24 w-44 shrink-0 place-items-center rounded-xl bg-white p-4">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={140}
                    height={70}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ChallengesSection />

      <WhyUsSection />

      <section className="relative bg-black py-24">
        <div className="absolute right-12 top-10 h-48 w-48 rounded-full bg-[#2563eb] blur-[95px]" />
        <div className="container-osb grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
            <div className="absolute -right-6 top-8 z-10 grid h-36 w-36 place-items-center rounded-full bg-[#2563eb] p-5 text-center text-sm font-extrabold shadow-[0_0_55px_rgba(37,99,235,0.7)]">
              نشخّص قبل أن ننفّذ
            </div>
            <ScatterImage
              src="/images/about-us.png"
              alt="عن OSB"
              width={960}
              height={720}
              className="rounded-[2rem]"
            />
          </div>
          <div>
            <p className="mb-3 text-sm font-bold text-white/45">عن OSB</p>
            <ScrollRevealText
              as="h2"
              text="نحوّل الفكرة إلى مسار عمل واضح"
              wordsPerLine={4}
              className="text-4xl font-extrabold leading-tight md:text-6xl"
            />
            <p className="mt-7 max-w-3xl text-lg leading-9 text-white/60">
              OSB شركة سعودية متخصصة تقدم حلول الأعمال المتكاملة داخل المملكة العربية السعودية، نساعد رواد الأعمال والمستثمرين والشركات الناشئة على بناء أعمالهم بطريقة صحيحة ومدروسة من البداية وحتى التشغيل والتوسع.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/5 bg-black py-14">
        <div className="container-osb grid gap-8 text-center md:grid-cols-4">
          {stats.map(([number, label]) => (
            <div key={label}>
              <p className="text-4xl font-extrabold md:text-5xl">{number}</p>
              <p className="mt-3 text-sm font-bold text-white/45">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <ServicesHoverGrid />

      <section className="bg-black py-24">
        <div className="container-osb grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-image-reveal className="image-reveal">
            <Image src="/images/business-strategy.svg" alt="دليل الأعمال" width={960} height={720} className="rounded-[2rem]" />
          </div>
          <div>
            <ScrollRevealText
              as="h2"
              text="ابدأ باستشارة مجانية قبل أي قرار"
              wordsPerLine={5}
              className="text-4xl font-extrabold leading-tight md:text-5xl"
            />
            <p className="mt-6 text-lg leading-9 text-white/60">
              نجلس معك، نفهم وضعك، ونخبرك بصدق ما الذي تحتاجه وما لا تحتاجه. بدون التزام. بدون ضغط. بدون تكلفة.
            </p>
            <div className="mt-8 max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <ConsultationForm compact light />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
