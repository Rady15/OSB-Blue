"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Search, Rocket, TrendingUp, Sparkles, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeWorkPage() {
  const t = useT();
  const [activeStep, setActiveStep] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLElement>(null);

  const steps = [
    {
      num: "01",
      title: t("page.how.step1.title"),
      icon: MessageSquare,
      color: "#2563eb",
      description: t("page.how.step1.description"),
      details: t("page.how.step1.details").split("|"),
    },
    {
      num: "02",
      title: t("page.how.step2.title"),
      icon: Search,
      color: "#3b82f6",
      description: t("page.how.step2.description"),
      details: t("page.how.step2.details").split("|"),
    },
    {
      num: "03",
      title: t("page.how.step3.title"),
      icon: Rocket,
      color: "#60a5fa",
      description: t("page.how.step3.description"),
      details: t("page.how.step3.details").split("|"),
    },
    {
      num: "04",
      title: t("page.how.step4.title"),
      icon: TrendingUp,
      color: "#93c5fd",
      description: t("page.how.step4.description"),
      details: t("page.how.step4.details").split("|"),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        if (heroGlowRef.current) {
          gsap.to(heroGlowRef.current, { x, y, duration: 1.2, ease: "power2.out" });
        }
      };
      window.addEventListener("mousemove", onMove);

      if (journeyRef.current) {
        ScrollTrigger.create({
          trigger: journeyRef.current,
          start: "top 30%",
          end: "bottom bottom",
          onUpdate: (self) => {
            const index = Math.min(Math.floor(self.progress * steps.length), steps.length - 1);
            setActiveStep(index);
          },
        });
      }

      return () => window.removeEventListener("mousemove", onMove);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = steps[activeStep].icon;

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[70vh] overflow-hidden bg-black pt-32 pb-20">
        <div
          ref={heroGlowRef}
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#2563eb] opacity-[0.04] blur-[100px]" />

        <div className="container-osb relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#2563eb] backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            {t("page.how.badge")}
          </div>

          <h1 className="text-5xl font-black leading-[1.5] tracking-tight md:text-7xl lg:text-8xl">
            {t("page.how.title1")} <span className="bg-gradient-to-l from-[#2563eb] to-[#60a5fa] bg-clip-text text-transparent">{t("page.how.title2")}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-xl text-white/50 md:text-2xl">
            {t("page.how.subtitle")}
          </p>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ChevronDown className="h-6 w-6 animate-bounce text-[#2563eb]/60" />
          </div>
        </div>
      </section>

      {/* ===== INTERACTIVE JOURNEY ===== */}
      <section ref={journeyRef} className="relative bg-black pb-48 pt-20">
        {/* Progress bar */}
        <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="container-osb py-4">
            <div className="relative h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-l from-[#2563eb] to-[#60a5fa] transition-all duration-500"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <div className="mt-3 flex justify-between">
              {steps.map((step, i) => (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    i === activeStep ? "text-[#2563eb]" : "text-white/30 hover:text-white/60"
                  }`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs transition-all duration-300 ${
                    i === activeStep ? "border-[#2563eb] bg-[#2563eb] text-white" : "border-white/20 text-white/50"
                  }`}>
                    {i + 1}
                  </span>
                  <span className="hidden md:inline">{step.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Journey visualization */}
        <div className="container-osb relative z-10 py-16">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
            {/* Left: Active step display */}
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent p-10">
                <div
                  className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle, ${steps[activeStep].color}20, transparent)`,
                    opacity: 0.6,
                  }}
                />

                <div className="relative mb-8 flex items-center gap-4">
                  <span className="text-7xl font-black text-white/[0.06]">{steps[activeStep].num}</span>
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500"
                    style={{ backgroundColor: `${steps[activeStep].color}15` }}
                  >
                    <ActiveIcon className="h-8 w-8" style={{ color: steps[activeStep].color }} />
                  </div>
                </div>

                <h2 className="relative text-3xl font-black text-white md:text-4xl">
                  {steps[activeStep].title}
                </h2>
                <div
                  className="relative mt-3 h-1 w-16 rounded-full transition-all duration-500"
                  style={{ backgroundColor: steps[activeStep].color, width: "4rem" }}
                />

                <p className="relative mt-6 text-xl leading-10 text-white/60">
                  {steps[activeStep].description}
                </p>

                {steps[activeStep].details && (
                  <ul className="relative mt-6 space-y-3">
                    {steps[activeStep].details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-white/50 transition-all duration-300"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: steps[activeStep].color }}
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Right: Journey steps with connecting path */}
            <div className="relative">
              <svg className="absolute right-8 top-0 h-full w-16 md:right-12" viewBox="0 0 60 800" fill="none" preserveAspectRatio="none">
                <path
                  d="M30,0 L30,800"
                  stroke="rgba(37,99,235,0.2)"
                  strokeWidth="2"
                  strokeDasharray="1000"
                />
              </svg>

              <div className="space-y-12">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.num}
                      className={`group relative grid grid-cols-[auto_1fr] gap-6 md:gap-8 cursor-pointer transition-all duration-500 ${
                        index === activeStep ? "opacity-100" : "opacity-50 hover:opacity-80"
                      }`}
                      onClick={() => setActiveStep(index)}
                      onMouseEnter={() => setActiveStep(index)}
                    >
                      <div className="relative z-10 flex flex-col items-center">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                            index === activeStep
                              ? "scale-110 shadow-lg"
                              : "border-white/10 bg-black group-hover:border-white/30"
                          }`}
                          style={{
                            borderColor: index === activeStep ? step.color : undefined,
                            backgroundColor: index === activeStep ? `${step.color}20` : undefined,
                            boxShadow: index === activeStep ? `0 0 30px ${step.color}40` : undefined,
                          }}
                        >
                          <Icon
                            className="h-7 w-7 transition-colors duration-300"
                            style={{ color: index === activeStep ? step.color : "rgba(255,255,255,0.4)" }}
                          />
                        </div>
                      </div>

                      <div className="pb-8">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white/30">{step.num}</span>
                          <h3
                            className="text-2xl font-bold transition-colors duration-300"
                            style={{ color: index === activeStep ? step.color : undefined }}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-3 text-lg leading-8 text-white/50">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative border-t border-white/5 bg-[#0a0a0a] py-24">
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#2563eb] opacity-[0.04] blur-[100px]" />
        <div className="container-osb relative z-10 text-center">
          <h2 className="text-3xl font-black md:text-5xl">{t("page.how.ctaTitle")}</h2>
          <p className="mt-4 text-xl text-white/50">{t("page.how.ctaDesc")}</p>
          <a
            href="/free-consultation"
            className="mt-8 inline-flex items-center gap-2 rounded-none bg-[#2563eb] px-8 py-4 text-lg font-bold text-white shadow-[0_0_34px_rgba(37,99,235,0.42)] transition-all duration-300 hover:bg-white hover:text-black"
          >
            {t("page.how.ctaButton")}
            <Rocket className="h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
