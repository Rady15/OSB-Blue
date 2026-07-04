"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { journeySteps } from "@/data/journey";
import { fadeUpOnScroll } from "@/lib/animations";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

export function JourneyTimeline({ variant = "preview" }: { variant?: "preview" | "full" }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (variant === "preview") {
      fadeUpOnScroll(".journey-preview-item", { stagger: 0.15, trigger: "#journey-preview" });
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 768px)", () => {
        const stages = gsap.utils.toArray<HTMLElement>(".journey-stage");
        gsap.set(stages.slice(1), { autoAlpha: 0, y: 50 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#journey-pin",
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
          },
        });

        stages.forEach((stage, index) => {
          if (index > 0) timeline.fromTo(stage, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 });
          if (index < stages.length - 1) timeline.to(stage, { autoAlpha: 0, y: -50, duration: 1 }, "+=0.5");
        });
    });
    media.add("(max-width: 767px)", () => {
      fadeUpOnScroll(".journey-mobile-item", { stagger: 0.15, trigger: "#journey-pin" });
    });

    return () => media.revert();
  }, [variant]);

  if (variant === "preview") {
    return (
      <section id="journey-preview" className="bg-black py-24 text-white">
        <div className="container-osb">
          <SectionHeading
            light
            title="رحلتك معنا"
            description="نرافقك من الفكرة إلى التنفيذ بطريقة واضحة ومنظمة تساعدك على فهم كل مرحلة من مشروعك."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="journey-preview-item rounded-2xl border border-white/10 bg-white/[0.035] p-6">
                <span className="text-5xl font-extrabold text-white/10">0{index + 1}</span>
                <h3 className="mt-5 text-xl font-extrabold text-white">{step.title}</h3>
                <p className="mt-4 leading-8 text-white/55">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="journey-pin" ref={rootRef} className="relative overflow-hidden bg-black text-white md:h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(37,99,235,0.24),transparent_30%),radial-gradient(circle_at_74%_68%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="relative z-10 hidden h-screen items-center md:flex">
        <div className="container-osb relative h-[520px]">
          {journeySteps.map((step, index) => (
            <div key={step.title} className="journey-stage absolute inset-0 flex items-center">
              <div className="max-w-4xl">
                <span className="text-8xl font-extrabold text-[#2563eb]/35">0{index + 1}</span>
                <ScrollRevealText as="h2" text={step.title} className="mt-6 text-5xl font-extrabold" />
                <p className="mt-6 text-2xl leading-[2.2] text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-0 right-0 flex gap-3">
            {journeySteps.map((step, index) => (
              <span
                key={step.title}
                className={`h-3 rounded-full transition-all ${active === index ? "w-12 bg-[#2563eb]" : "w-3 bg-white/30"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container-osb relative z-10 grid gap-6 py-24 md:hidden">
        {journeySteps.map((step, index) => (
          <div key={step.title} className="journey-mobile-item rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <span className="text-5xl font-extrabold text-[#2563eb]/60">0{index + 1}</span>
            <ScrollRevealText as="h2" text={step.title} className="mt-5 text-2xl font-extrabold" />
            <p className="mt-4 leading-8 text-white/60">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
