"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: "قبل",
    text: "أي خدمة، أي عقد، أي تكلفة — نجلس معك، نفهم اعمالك، ندرس نشاطك، ونحلل السوق.",
  },
  {
    label: "ثم",
    text: "نقول لك بوضوح: هذه هي الأولويات/المتطلبات/الخطة. هذا هو الترتيب الصحيح للخطوات. هذا هو ما تحتاجه الآن — وما لا تحتاجه.",
  },
  {
    label: "بعد ذلك فقط",
    text: "ننفّذ.",
  },
];

export function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const connectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Title entrance
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
            },
          },
        );
      }

      // Each step appears individually on scroll
      stepsRef.current.filter(Boolean).forEach((step) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      // Connector line draws progressively as steps appear
      if (connectorRef.current) {
        gsap.fromTo(
          connectorRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 1,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-32 text-white">
      {/* Background accents */}
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#2563eb] opacity-[0.04] blur-[140px]" />
      <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-[#2563eb] opacity-[0.03] blur-[100px]" />

      <div className="container-osb relative z-10">
        {/* Header */}
        <div ref={titleRef} className="mb-24 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 text-sm font-bold text-[#2563eb]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] animate-pulse" />
            ما يميزنا
          </div>
          <ScrollRevealText
            as="h2"
            text="نحن لا نبيع خدمات، نحن نلتزم معك كشريك نجاح"
            wordsPerLine={5}
            className="text-3xl font-extrabold leading-[1.5] md:text-5xl lg:text-6xl"
          />
        </div>

        {/* Steps with timeline connector */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical connector line */}
          <div className="absolute right-6 top-0 bottom-0 w-[2px] md:right-10">
            <div
              ref={connectorRef}
              className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#2563eb]/60 via-[#2563eb]/20 to-transparent"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-20">
            {steps.map((step, index) => (
              <div
                key={step.label}
                ref={(el) => { stepsRef.current[index] = el; }}
                className="relative grid grid-cols-[auto_1fr] gap-6 md:gap-10"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#2563eb] bg-black text-xs font-black text-[#2563eb] shadow-[0_0_20px_rgba(37,99,235,0.3)] md:h-16 md:w-16 md:text-sm">
                    {index === steps.length - 1 ? (
                      <svg className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    ) : (
                      String(index + 1).padStart(2, "0")
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="pb-4">
                  <span className="mb-3 inline-block rounded-full bg-[#2563eb]/10 px-3 py-1 text-xl font-bold text-[#2563eb] md:text-2xl">
                    {step.label}
                  </span>
                  <p
                    className={`leading-9 md:leading-10 ${
                      index === steps.length - 1
                        ? "text-3xl font-black text-[#2563eb] md:text-4xl"
                        : "text-lg font-bold text-white/70 md:text-xl"
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
