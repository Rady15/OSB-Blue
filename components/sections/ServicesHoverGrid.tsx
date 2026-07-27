"use client";

import { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { GlassShatterImage } from "@/components/ui/GlassShatterImage";

gsap.registerPlugin(ScrollTrigger);

const serviceImages: Record<string, string> = {
  "strategy-planning": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  "accounting-compliance": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
  "marketing-branding": "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80",
  "digital-solutions": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "business-automation": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80",
  "business-infrastructure": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
};
const displayedServices = services.slice(0, 6);

export function ServicesHoverGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!cards.length || !wrapperRef.current) return;

      // Pin the section and animate through services on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${cards.length * 300}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // First card: visible from the start
      cards.forEach((card, i) => {
        const textSide = card.querySelector("[data-text-side]") as HTMLElement;
        const imgSide = card.querySelector("[data-img-side]") as HTMLElement;

        if (i === 0) {
          gsap.set([textSide, imgSide], { opacity: 1 });
          // First card: animate OUT only
          if (textSide) tl.to(textSide, { x: -100, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.5);
          if (imgSide) tl.to(imgSide, { x: 100, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.5);
        } else {
          // Subsequent cards: animate in, hold, then animate out
          const inPos = i * 2;
          const outPos = inPos + 1.5;

          // Animate in from opposite direction
          if (textSide) {
            tl.fromTo(textSide,
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
              inPos,
            );
            // Animate out
            tl.to(textSide, { x: -100, opacity: 0, duration: 0.5, ease: "power2.in" }, outPos);
          }
          if (imgSide) {
            tl.fromTo(imgSide, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }, inPos);
            tl.to(imgSide, { x: 100, opacity: 0, duration: 0.5, ease: "power2.in" }, outPos);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Background accent */}
      <div className="absolute left-0 top-1/4 h-[500px] w-[500px] rounded-full bg-[#2563eb] opacity-[0.03] blur-[140px]" />

      <div className="container-osb relative z-10">
        {/* Header */}
        <div className="mb-10 pt-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#2563eb] backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            الحلول التي نقدمها
          </div>
          <ScrollRevealText
            as="h2"
            text="خدمات متكاملة تحت سقف واحد"
            wordsPerLine={5}
            className="text-4xl font-black md:text-6xl"
          />
          <p className="mt-4 text-sm text-white/40">
            مرّر على أي خدمة لمعرفة المزيد
          </p>
        </div>

        {/* Pinned cards wrapper — all cards stack in same place */}
        <div ref={wrapperRef} className="relative h-[70vh]">
          {displayedServices.map((service, index) => {
            const imgSrc = serviceImages[service.slug] ?? "/images/operations-dashboard.svg";

            return (
              <div
                key={service.slug}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="absolute inset-0 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
              >
                {/* Text side — right on desktop, top on mobile */}
                <div data-text-side className="opacity-0">
                  <div className="relative">
                    {/* Large number behind text */}
                    <span className="absolute -top-16 right-0 select-none text-[12rem] font-black leading-none text-white/[0.04] md:text-[16rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3 className="relative z-10 text-3xl font-extrabold leading-[1.5] text-white md:text-5xl">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Image side — left on desktop, bottom on mobile */}
                <div data-img-side className="opacity-0">
                  <GlassShatterImage
                    src={imgSrc}
                    alt={service.title}
                    width={960}
                    height={720}
                    className="rounded-[2rem]"
                  />
                  <div className="absolute -bottom-4 left-1/2 h-20 w-32 -translate-x-1/2 rounded-full bg-[#2563eb] opacity-15 blur-2xl" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
