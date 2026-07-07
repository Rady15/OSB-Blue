"use client";

import { useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { GlassShatterImage } from "@/components/ui/GlassShatterImage";

gsap.registerPlugin(ScrollTrigger);

const scatterTransforms = [
  { x: -300, y: -250, rotation: -45, scale: 0.3 },
  { x: 50, y: -350, rotation: 30, scale: 0.4 },
  { x: 350, y: -200, rotation: 55, scale: 0.35 },
  { x: -150, y: -180, rotation: -25, scale: 0.5 },
  { x: 200, y: -280, rotation: 40, scale: 0.3 },
  { x: -400, y: 50, rotation: -60, scale: 0.4 },
  { x: -80, y: -100, rotation: 20, scale: 0.45 },
  { x: 120, y: -150, rotation: -35, scale: 0.35 },
  { x: 400, y: 80, rotation: 50, scale: 0.4 },
  { x: -350, y: 150, rotation: -40, scale: 0.3 },
  { x: 30, y: -50, rotation: 15, scale: 0.5 },
  { x: 300, y: 200, rotation: 45, scale: 0.35 },
  { x: -250, y: 300, rotation: -55, scale: 0.4 },
  { x: -380, y: 250, rotation: -30, scale: 0.3 },
  { x: 100, y: 280, rotation: 25, scale: 0.45 },
  { x: -50, y: 350, rotation: -20, scale: 0.35 },
  { x: 180, y: 320, rotation: 35, scale: 0.4 },
  { x: 350, y: 280, rotation: 60, scale: 0.3 },
  { x: 80, y: 400, rotation: -15, scale: 0.45 },
  { x: 380, y: 350, rotation: 40, scale: 0.35 },
];

const serviceImages: Record<string, string> = {
  "company-formation": "https://tanfeth.sa/wp-content/uploads/2026/06/%D8%AA%D8%A3%D8%B3%D9%8A%D8%B3-%D9%85%D8%A4%D8%B3%D8%B3%D8%A9-%D9%81%D8%B1%D8%AF%D9%8A%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9.png",
  "legal-consulting": "https://www.alsaqrlaw.com/wp-content/uploads/2025/11/8-980x580-2.png",
  "accounting-tax": "https://sadanykhalifa.com/uploads/Blog/1745571118.webp",
  "feasibility-studies": "https://mega-consultations.com/photos/%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%88%D9%89/%D8%AF%D8%B1%D8%A7%D8%B3%D8%A9%20%D8%A7%D9%84%D8%AC%D8%AF%D9%88%D9%89.jpg",
  "digital-marketing": "https://mbridges-sa.com/ar/wp-content/uploads/2025/02/%D9%83%D9%8A%D9%81-%D8%AA%D8%AE%D8%AA%D8%A7%D8%B1-%D8%B4%D8%B1%D9%83%D8%A9-%D8%AA%D8%B3%D9%88%D9%8A%D9%82-%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A-%D9%86%D8%A7%D8%AC%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%D8%A9%D8%9F.webp",
  "automation": "https://sabbar-prod-uploaded-files.s3.eu-west-1.amazonaws.com/submissions/blog-posts/a40091e3-3403-4cda-b251-54d59945898e.webp",
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
          end: `+=${cards.length * 800}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // First card: visible from the start
      cards.forEach((card, i) => {
        const textSide = card.querySelector("[data-text-side]") as HTMLElement;
        const imgSide = card.querySelector("[data-img-side]") as HTMLElement;
        // Get shard elements from GlassShatterImage
        const shardEls = Array.from(
          card.querySelectorAll("[data-shard]"),
        ) as HTMLElement[];

        if (i === 0) {
          // First card: animate IN immediately, then animate OUT
          if (textSide) {
            tl.fromTo(textSide, { x: 0, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
            tl.to(textSide, { x: -100, opacity: 0, duration: 1, ease: "power2.in" }, 3.5);
          }
          if (imgSide) {
            // Fade in container
            tl.fromTo(imgSide, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0);
            // Scatter shards then assemble
            shardEls.forEach((shard, si) => {
              const t = scatterTransforms[si % scatterTransforms.length];
              tl.fromTo(shard,
                { x: t.x, y: t.y, rotation: t.rotation, scale: t.scale, opacity: 0 },
                { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
                0 + si * 0.08,
              );
            });
            tl.to(imgSide, { x: 100, opacity: 0, duration: 1, ease: "power2.in" }, 3.5);
          }
        } else {
          // Subsequent cards: animate in, hold, then animate out
          const inPos = i * 4;
          const outPos = inPos + 3.5;

          // Animate in from opposite direction
          if (textSide) {
            tl.fromTo(textSide,
              { x: 100, opacity: 0 },
              { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
              inPos,
            );
            // Animate out
            tl.to(textSide, { x: -100, opacity: 0, duration: 1, ease: "power2.in" }, outPos);
          }
          if (imgSide) {
            // Fade in container
            tl.fromTo(imgSide, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, inPos);
            // Scatter shards then assemble
            shardEls.forEach((shard, si) => {
              const t = scatterTransforms[si % scatterTransforms.length];
              tl.fromTo(shard,
                { x: t.x, y: t.y, rotation: t.rotation, scale: t.scale, opacity: 0 },
                { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1, duration: 2, ease: "power3.out" },
                inPos + si * 0.08,
              );
            });
            tl.to(imgSide, { x: 100, opacity: 0, duration: 1, ease: "power2.in" }, outPos);
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
        <div className="mb-16 pt-28 text-center">
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
        <div ref={wrapperRef} className="relative min-h-[70vh]">
          {displayedServices.map((service, index) => {
            const imgSrc = serviceImages[service.slug] ?? "/images/operations-dashboard.svg";

            return (
              <div
                key={service.slug}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`absolute inset-0 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 ${
                  index === 0 ? "relative" : ""
                }`}
              >
                {/* Text side — right on desktop, top on mobile */}
                <div data-text-side className="opacity-0">
                  <div className="relative">
                    {/* Large number behind text */}
                    <span className="absolute -top-16 right-0 select-none text-[12rem] font-black leading-none text-white/[0.04] md:text-[16rem]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Title */}
                    <h3 className="relative z-10 text-3xl font-extrabold leading-tight text-white md:text-5xl">
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
