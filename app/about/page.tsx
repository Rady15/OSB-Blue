"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpLeft, Sparkles, Eye, Shield, Puzzle, Clock, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const storyLines = [
  "OSB شركة سعودية متخصصة تقدم حلول الأعمال المتكاملة داخل المملكة العربية السعودية،",
  "نساعد رواد الأعمال والمستثمرين والشركات الناشئة على بناء أعمالهم بطريقة صحيحة ومدروسة",
  "من البداية وحتى التشغيل والتوسع.",
  "",
  "أسسنا OSB لتكون المحطة الأولى لكل صاحب فكرة أو مشروع في المملكة العربية السعودية.",
  "",
  "أطلقناها من فهم حقيقي للتحديات التي تواجه أصحاب المشاريع في السوق السعودي،",
  "حيث يبدأ الكثير من رواد الأعمال بالتنفيذ قبل التخطيط الصحيح،",
  "مما يؤدي إلى قرارات مكلفة وتشتت بين الجهات والخدمات المختلفة.",
  "",
  "خبرة في التعامل مع مختلف أنواع الشركات، من المحلية والخليجية إلى الدولية والشركات المختلطة.",
];

const values = [
  { title: "الوضوح", desc: "نبني قراراتنا على المعلومات الدقيقة والحقائق الواضحة.", icon: Eye },
  { title: "الموثوقية", desc: "نختار شركائنا بعناية، ونلتزم بمعايير مهنية تضمن جودة الخدمة.", icon: Shield },
  { title: "التكامل", desc: "نوفر منظومة متكاملة تغطي احتياجات المشروع في مختلف مراحله.", icon: Puzzle },
  { title: "المتابعة", desc: "لا نتوقف عند بدء الإجراء، بل نتابع حتى تحقيق النتيجة.", icon: Clock },
  { title: "الكفاءة", desc: "نساعد عملائنا على اختصار الوقت والجهد والتكلفة.", icon: Zap },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);
  const storyLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const vmCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const valueCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Mouse parallax for hero glow
      const onMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        if (heroGlowRef.current) {
          gsap.to(heroGlowRef.current, { x, y, duration: 1.5, ease: "power3.out" });
        }
      };
      window.addEventListener("mousemove", onMove);

      // Story lines wave animation
      const lines = storyLinesRef.current.filter(Boolean);
      if (lines.length) {
        gsap.fromTo(
          lines,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: { each: 0.1, from: "start" },
            ease: "power3.out",
            scrollTrigger: {
              trigger: lines[0],
              start: "top 82%",
            },
          },
        );
      }

      // Vision & Mission cards
      const vmCards = vmCardsRef.current.filter(Boolean);
      if (vmCards.length) {
        gsap.fromTo(
          vmCards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: vmCards[0],
              start: "top 75%",
            },
          },
        );

        vmCards.forEach((card) => {
          const el = card as HTMLElement;
          el.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
            gsap.to(el, { rotateY: x, rotateX: y, duration: 0.3, ease: "power2.out" });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
          });
        });
      }

      // Value cards
      const vCards = valueCardsRef.current.filter(Boolean);
      if (vCards.length) {
        gsap.fromTo(
          vCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: vCards[0],
              start: "top 82%",
            },
          },
        );

        vCards.forEach((card) => {
          const el = card as HTMLElement;
          el.addEventListener("mousemove", (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
            gsap.to(el, { rotateY: x, rotateX: y, y: -4, duration: 0.3, ease: "power2.out" });
          });
          el.addEventListener("mouseleave", () => {
            gsap.to(el, { rotateY: 0, rotateX: 0, y: 0, duration: 0.5, ease: "power3.out" });
          });
        });
      }

      return () => window.removeEventListener("mousemove", onMove);
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[80vh] overflow-hidden bg-black pt-32 pb-20">
        {/* Gradient orbs */}
        <div
          ref={heroGlowRef}
          className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
          }}
        />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#2563eb] opacity-[0.04] blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-[#2563eb] opacity-[0.03] blur-[80px]" />

        <div className="container-osb relative z-10 grid min-h-[70vh] items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Text side */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#2563eb] backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              من نحن
            </div>



            <p className="max-w-2xl text-lg leading-9 text-white/60 md:text-xl md:leading-10">
              بدأت OSB من ملاحظة بسيطة.<br />
              رأينا أن كثيراً من الشركات تقضي وقتاً وجهداً كبيرين في التنسيق بين جهات متعددة، بينما كان يمكن إنجاز كل ذلك من خلال شريك واحد يفهم احتياجاتها ويقدّم الحلول المناسبة.<br />
              ومن هنا جاءت فكرة OSB.<br />
              جمعنا خدمات الأعمال الأساسية تحت سقف واحد، لنساعد الشركات على العمل بكفاءة أكبر، واتخاذ قرارات أفضل، والتركيز على نمو أعمالها.
            </p>
          </div>

          {/* Image side */}
          <div className="relative" data-parallax="40">
            {/* Decorative frame */}
            <div className="absolute -inset-3 rounded-[2rem] border border-[#2563eb]/10" />
            <div className="absolute -inset-6 rounded-[2.5rem] border border-[#2563eb]/5" />

            <div data-image-reveal className="image-reveal relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/logo.png"
                alt="OSB"
                width={960}
                height={720}
                className="rounded-[1.5rem] object-contain p-16 drop-shadow-[0_0_40px_rgba(37,99,235,0.6)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="relative bg-black py-28">
        <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-[#2563eb] opacity-[0.03] blur-[120px]" />

        <div className="container-osb relative z-10">
          <div className="grid gap-16 lg:grid-cols-[0.35fr_1fr]">
            {/* Sticky heading */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#2563eb]" />
                <span className="text-sm font-bold text-[#2563eb]">قصتنا</span>
              </div>
              <h2 className="text-5xl font-black leading-[1.5] md:text-6xl">
                لماذا
                <br />
                <span className="text-[#2563eb]">OSB؟</span>
              </h2>
            </div>

            {/* Story text */}
            <div className="space-y-4">
              {storyLines.map((line, i) => (
                <p
                  key={i}
                  ref={(el) => { storyLinesRef.current[i] = el; }}
                  className={`text-xl leading-[2.2] md:text-2xl ${
                    line === "" ? "h-4" : "text-white/60"
                  }`}
                >
                  {line && (
                    <span className={line.includes("OSB") || line.includes("أسسنا") || line.includes("أطلقناها") ? "font-semibold text-white/80" : ""}>
                      {line}
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="relative border-y border-white/5 bg-[#0a0a0a] py-28">
        <div className="container-osb relative z-10" style={{ perspective: "1400px" }}>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#2563eb] backdrop-blur-sm">
              بوصلة OSB
            </div>
            <h2 className="text-4xl font-black md:text-5xl">رؤيتنا ورسالتنا</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Vision */}
            <div
              ref={(el) => { vmCardsRef.current[0] = el; }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#2563eb] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.08]" />

              <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10 transition-transform duration-500 group-hover:scale-110">
                <svg className="h-8 w-8 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <h3 className="relative text-3xl font-black text-white">رؤيتنا</h3>
              <div className="relative mt-3 h-0.5 w-12 rounded-full bg-[#2563eb]/60" />
              <p className="relative mt-6 text-xl leading-10 text-white/50">
                أن نكون الوجهة الأولى لحلول الأعمال المتكاملة في المملكة العربية السعودية.
              </p>
            </div>

            {/* Mission */}
            <div
              ref={(el) => { vmCardsRef.current[1] = el; }}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#2563eb] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-[0.08]" />

              <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10 transition-transform duration-500 group-hover:scale-110">
                <ArrowUpLeft className="h-8 w-8 text-[#2563eb]" />
              </div>

              <h3 className="relative text-3xl font-black text-white">رسالتنا</h3>
              <div className="relative mt-3 h-0.5 w-12 rounded-full bg-[#2563eb]/60" />
              <p className="relative mt-6 text-xl leading-10 text-white/50">
                تمكين أصحاب المشاريع والمستثمرين من اتخاذ قرارات صحيحة ومدروسة من خلال حلول متكاملة تجمع بين الخبرة والتنفيذ والمتابعة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="relative bg-black py-28">
        <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#2563eb] opacity-[0.03] blur-[100px]" />

        <div className="container-osb relative z-10" style={{ perspective: "1200px" }}>
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#2563eb] backdrop-blur-sm">
              ما نؤمن به
            </div>
            <h2 className="text-4xl font-black md:text-5xl">قيمنا</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/40">
              القيم التي تضبط طريقة تفكيرنا وتنفيذنا في كل خدمة.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={(el) => { valueCardsRef.current[index] = el; }}
                  className="card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 transition-all duration-500 hover:border-[#2563eb]/20 hover:bg-white/[0.04]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#2563eb] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.08]" />

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10 transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-[#2563eb]" />
                  </div>

                  <h3 className="relative text-xl font-bold text-white">{value.title}</h3>
                  <p className="relative mt-3 leading-8 text-white/45 transition-colors duration-500 group-hover:text-white/60">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
