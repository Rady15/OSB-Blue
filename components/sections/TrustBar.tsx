"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ShieldCheck } from "lucide-react";
import { useT } from "@/lib/i18n";

const itemKeys = [
  "trustBar.item1",
  "trustBar.item2",
  "trustBar.item3",
  "trustBar.item4",
];

export function TrustBar() {
  const t = useT();
  const setRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setRef.current || !trackRef.current) return;
    const setW = setRef.current.offsetWidth;
    if (!setW) return;

    const tween = gsap.to(trackRef.current, {
      x: -setW,
      duration: 25,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (v) => {
          const px = parseFloat(v);
          return ((px % setW) + setW) % setW + "px";
        },
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section className="border-y border-white/5 bg-[#111] py-5 text-white">
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#111] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#111] to-transparent" />

        <div ref={trackRef} className="flex w-max">
          {/* Hidden measuring set */}
          <div ref={setRef} className="flex shrink-0 gap-10 opacity-0 absolute pointer-events-none" aria-hidden>
            {itemKeys.map((key, index) => (
              <div key={`m-${index}`} className="flex shrink-0 items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#2563eb]" />
                <span className="whitespace-nowrap text-lg font-bold text-white/70">{t(key)}</span>
              </div>
            ))}
          </div>
          {/* Visible sets — enough to cover viewport + 1 extra */}
          {[0, 1, 2, 3, 4].map((set) => (
            <div key={set} className="flex shrink-0 gap-10">
              {itemKeys.map((key, index) => (
                <div key={`${set}-${index}`} className="flex shrink-0 items-center gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#2563eb]" />
                  <span className="whitespace-nowrap text-lg font-bold text-white/70">{t(key)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
