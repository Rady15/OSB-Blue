import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { ScatterImage } from "@/components/ui/ScatterImage";
import { AnimatedImage } from "@/components/ui/AnimatedImage";
import { ServicesHoverGrid } from "@/components/sections/ServicesHoverGrid";
import { TrustBar } from "@/components/sections/TrustBar";
import { ChallengesSection } from "@/components/sections/ChallengesSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";

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
            <div className="relative mx-auto max-w-xs">
              <img
                src="/images/hero.png"
                alt="OSB Hero"
                className="relative z-10 rounded-[2rem] animate-hero-float"
              />
              <div className="absolute -bottom-6 left-1/2 h-20 w-3/4 -translate-x-1/2 rounded-full bg-[#2563eb] opacity-30 blur-3xl" />
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
        <PartnersMarquee />
      </section>

      <ChallengesSection />

      <WhyUsSection />

      <section className="relative bg-black py-24">
        <div className="absolute right-12 top-10 h-48 w-48 rounded-full bg-[#2563eb] blur-[95px]" />
        <div className="container-osb grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative">
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

      <section className="relative overflow-hidden bg-black py-24">
        <div className="container-osb grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          {/* Animated image with glow */}
          <div className="relative">
            <AnimatedImage
              src="/images/consult-free.svg"
              alt="استشارة مجانية"
              className="rounded-[2rem]"
            />
            {/* Glow under image */}
            <div className="absolute -bottom-6 left-1/2 h-16 w-3/4 -translate-x-1/2 rounded-full bg-[#2563eb] opacity-25 blur-3xl" />
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
