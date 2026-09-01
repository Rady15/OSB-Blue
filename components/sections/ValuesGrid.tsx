"use client";

import { useEffect, useRef } from "react";
import { Eye, Target, Lightbulb, Shield, Puzzle, Clock, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/lib/i18n";

gsap.registerPlugin(ScrollTrigger);

const icons = { Eye, Target, Lightbulb, Shield, Puzzle, Clock, Zap };

const valueKeys = [
  { titleKey: "values.clarity.title", descKey: "values.clarity.desc", icon: "Eye" },
  { titleKey: "values.reliability.title", descKey: "values.reliability.desc", icon: "Shield" },
  { titleKey: "values.integration.title", descKey: "values.integration.desc", icon: "Puzzle" },
  { titleKey: "values.followup.title", descKey: "values.followup.desc", icon: "Clock" },
  { titleKey: "values.efficiency.title", descKey: "values.efficiency.desc", icon: "Zap" },
];

export function ValuesGrid() {
  const t = useT();
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      cardsRef.current.filter(Boolean).forEach((card, i) => {
        if (!card) return;

        // Entrance
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateX: 8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          },
        );

        // Mouse tilt
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
          gsap.to(card, { rotateY: x, rotateX: y, scale: 1.03, duration: 0.4, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "power3.out" });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1200px" }}>
      {valueKeys.map((value, index) => {
        const Icon = icons[value.icon as keyof typeof icons] ?? Lightbulb;
        return (
          <div
            key={value.titleKey}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_0_45px_rgba(37,99,235,0.06)] backdrop-blur transition-colors duration-500 hover:border-[#2563eb]/30 hover:bg-white/[0.06]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hover glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#2563eb] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10" />

            {/* Icon */}
            <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#2563eb]/10 transition-all duration-500 group-hover:bg-[#2563eb]/20 group-hover:scale-110">
              <Icon className="h-7 w-7 text-[#2563eb]" />
            </div>

            {/* Number watermark */}
            <span className="absolute left-5 top-4 text-6xl font-black text-white/[0.03] transition-colors duration-500 group-hover:text-[#2563eb]/[0.08]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <h3 className="relative text-xl font-extrabold text-white transition-colors duration-500 group-hover:text-white">
              {t(value.titleKey)}
            </h3>
            <p className="relative mt-3 leading-8 text-white/50 transition-colors duration-500 group-hover:text-white/70">
              {t(value.descKey)}
            </p>
          </div>
        );
      })}
    </div>
  );
}
