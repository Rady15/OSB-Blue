"use client";

import { ShieldCheck } from "lucide-react";

const items = [
  "نشخّص قبل أن ننفّذ",
  "حلول أعمال متكاملة تحت سقف واحد",
  "شركاء متخصصون ومعتمدون",
  "خبرة بالسوق السعودي ومتطلباته",
];

export function TrustBar() {
  return (
    <section className="border-y border-white/5 bg-[#111] py-5 text-white">
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#111] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#111] to-transparent" />

        <div className="marquee-track flex w-max">
          {/* Two identical sets — no gap between them for seamless loop */}
          <div className="flex gap-10">
            {items.map((item, index) => (
              <div key={index} className="flex shrink-0 items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#2563eb]" />
                <span className="whitespace-nowrap text-lg font-bold text-white/70">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-10">
            {items.map((item, index) => (
              <div key={`dup-${index}`} className="flex shrink-0 items-center gap-3">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#2563eb]" />
                <span className="whitespace-nowrap text-lg font-bold text-white/70">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
