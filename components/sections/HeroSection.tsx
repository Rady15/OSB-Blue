"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, CheckCircle2, Instagram, Linkedin, MousePointer2, Phone } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const patternX = useTransform(mouseX, [-400, 400], [-20, 20]);
  const patternY = useTransform(mouseY, [-300, 300], [-20, 20]);

  return (
    <section
      onMouseMove={(event) => {
        mouseX.set(event.clientX - window.innerWidth / 2);
        mouseY.set(event.clientY - window.innerHeight / 2);
      }}
      className="relative min-h-[92vh] overflow-hidden bg-black pt-32 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(37,99,235,0.32),transparent_28%),radial-gradient(circle_at_78%_38%,rgba(255,255,255,0.08),transparent_20%)]" />
      <motion.div
        style={{ x: patternX, y: patternY }}
        className="pattern-overlay pointer-events-none absolute inset-0 opacity-40"
      />
      <motion.img
        src="/images/osb-hero-lines.svg"
        alt=""
        aria-hidden="true"
        style={{ x: patternX, y: patternY }}
        className="pointer-events-none absolute left-0 top-24 hidden w-[44rem] max-w-none animate-float-y opacity-50 lg:block"
      />
      <div className="absolute left-[8%] top-28 hidden h-72 w-72 animate-spin-slow rounded-full border border-white/15 hero-orbit lg:block" />
      <div className="absolute bottom-24 right-[45%] hidden h-28 w-28 animate-float-x rounded-full border border-white/15 bg-white/5 backdrop-blur lg:block" />
      <div className="container-osb relative z-10 grid min-h-[72vh] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-bold text-white backdrop-blur"
          >
            <MousePointer2 className="h-4 w-4" />
            OSB — One Stop Business
          </motion.p>
          <ScrollRevealText
            as="h1"
            text="كل ما يحتاجه مشروعك في مكان واحد"
            wordsPerLine={4}
            className="max-w-4xl text-4xl font-extrabold leading-tight md:text-7xl"
          />
          <ScrollRevealText
            as="p"
            text={"نشخّص فكرتك. نحدد احتياجك. ثم ننفّذ معك.\n\nالبداية الصحيحة تصنع فرقاً كبيراً.\nنساعدك على اتخاذ القرارات الصحيحة قبل أن تستثمر وقتك وميزانيتك, من اختيار الكيان القانوني المناسب إلى التخطيط التشغيل والنمو."}
            wordsPerLine={8}
            startIndex={2}
            className="mt-7 max-w-3xl text-lg leading-9 text-white/60 md:text-2xl md:leading-10"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/free-consultation" className="animate-soft-pulse">
              احجز استشارتك المجانية <ArrowLeft className="h-5 w-5" />
            </LinkButton>
            <div className="flex gap-3 text-white/80">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20"><Linkedin className="h-5 w-5" /></span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20"><Instagram className="h-5 w-5" /></span>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20"><Phone className="h-5 w-5" /></span>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ x: -60, opacity: 0, rotate: -2 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
          className="relative"
        >
          <div className="reveal-mask rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white/70">انا مهتم بـ</p>
                <ScrollRevealText as="h2" text="جلسة تشخيص مجانية" className="mt-1 text-2xl font-extrabold text-white" />
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-[#2563eb]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2 text-xs font-bold text-white/80">
              {["تأسيس", "محاسبة", "قانوني", "نمو"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-center">
                  {item}
                </span>
              ))}
            </div>
            <ConsultationForm compact light />
          </div>
          <div className="absolute -bottom-8 -right-6 hidden animate-float-y rounded-3xl border border-white/15 bg-white p-5 text-black shadow-2xl md:block">
            <p className="text-4xl font-extrabold">+120</p>
            <p className="mt-1 text-sm font-bold">عميل واثق بنا</p>
          </div>
          <div className="absolute -left-7 top-12 hidden animate-float-x rounded-3xl border border-white/15 bg-white/[0.08] p-5 text-white shadow-2xl backdrop-blur md:block">
            <p className="text-sm text-white/70">نظام العمل</p>
            <p className="mt-1 text-xl font-extrabold">نشخّص. نوجّه. ننفّذ.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
