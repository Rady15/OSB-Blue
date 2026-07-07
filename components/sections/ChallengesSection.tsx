"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

const challenges = [
  "غير متأكد من نوع الشركة أو الكيان القانوني المناسب لنشاطك؟",
  "تتعامل مع عدة جهات وخدمات وتشعر أن الصورة غير واضحة؟",
  "أنفقت وقتاً أو ميزانية على إجراءات لم تكن ضرورية؟",
  "تمتلك شركة قائمة وتشعر أن بعض الجوانب التشغيلية أو الإدارية تحتاج إلى تنظيم أفضل؟",
];

export function ChallengesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Stagger entrance for each row
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      );

      // Subtle parallax on scroll
      gsap.to(itemsRef.current.filter(Boolean), {
        x: -30,
        stagger: 0.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black py-32 text-white">
      {/* Large background number with glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563eb] opacity-20 blur-[100px]" />
        <div className="relative select-none text-[22rem] font-black leading-none text-white/[0.02]">
          ؟
        </div>
      </div>

      {/* Top glow */}
      <div className="absolute left-1/3 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#2563eb] opacity-[0.06] blur-[130px]" />

      <div className="container-osb relative z-10">
        {/* Header */}
        <div className="mb-20 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563eb]/30 bg-[#2563eb]/10 px-4 py-1.5 text-sm font-bold text-[#2563eb]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] animate-pulse" />
              قبل أن تبدأ
            </div>
            <ScrollRevealText
              as="h2"
              text="هل تواجه إحدى هذه التحديات؟"
              wordsPerLine={4}
              className="text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl"
            />
          </div>
          <p className="max-w-md text-lg leading-8 text-white/50">
            كل مشروع يحتاج إلى نقطة بداية واضحة، وكل قرار مبكر قد يصنع فرقاً كبيراً في المسار.
          </p>
        </div>

        {/* Challenge rows */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {challenges.map((challenge, index) => (
            <div
              key={challenge}
              ref={(el) => { itemsRef.current[index] = el; }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative grid cursor-default grid-cols-[auto_1fr_auto] items-center gap-6 py-8 transition-colors duration-500 md:gap-10 md:py-10"
            >
              {/* Active background highlight */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-l from-[#2563eb]/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              {/* Number */}
              <div className="relative z-10 flex items-center gap-6 md:gap-10">
                <span
                  className={`text-5xl font-black tabular-nums transition-all duration-500 md:text-7xl ${
                    activeIndex === index ? "text-[#2563eb]" : "text-white/10"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Text */}
              <p
                className={`relative z-10 text-xl font-bold leading-9 transition-all duration-500 md:text-2xl md:leading-10 ${
                  activeIndex === index ? "text-white" : "text-white/50"
                }`}
              >
                {challenge}
              </p>

              {/* Arrow icon */}
              <div className="relative z-10">
                <ArrowUpLeft
                  className={`h-6 w-6 transition-all duration-500 ${
                    activeIndex === index
                      ? "translate-x-0 -translate-y-0 rotate-0 text-[#2563eb] opacity-100"
                      : "translate-x-2 translate-y-2 text-white/0 opacity-0"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA note */}
        <div className="mt-20 grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
          {/* Left: big statement */}
          <div>
            <p className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
              إذا كانت إجابتك{" "}
              <span className="relative inline-block text-[#2563eb]">
                نعم
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[#2563eb]" />
              </span>
              {" "}على أي من هذه الأسئلة، فأنت لست وحدك.
            </p>
          </div>

          {/* Right: explanation card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur">
            {/* Corner accent */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2563eb]/10 blur-2xl" />

            <p className="relative text-lg leading-9 text-white/60">
              كثير من المشاريع لا تواجه مشكلة في الفكرة نفسها، بل في القرارات التي تُتخذ في البداية.
            </p>

            <div className="relative mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb] text-lg font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                OSB
              </div>
              <div>
                <p className="text-lg font-extrabold text-white">وهنا يأتي دورنا</p>
                <p className="text-sm text-white/50">نبدأ بفهم مشروعك قبل أي خطوة</p>
              </div>
            </div>

            <p className="relative mt-6 text-lg leading-9 text-white/60">
              نشخّص احتياجاتك، ثم نرشدك إلى الخطوات الصحيحة قبل البدء بالتنفيذ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
