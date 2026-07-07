"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { partners } from "@/data/partners";

export function PartnersMarquee() {
  const setRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!setRef.current || !trackRef.current) return;
    const setW = setRef.current.offsetWidth;
    if (!setW) return;

    const tween = gsap.to(trackRef.current, {
      x: setW,
      duration: 28,
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
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />

      <div ref={trackRef} className="flex w-max">
        {/* Hidden measuring set */}
        <div ref={setRef} className="flex shrink-0 gap-4 opacity-0 absolute pointer-events-none" aria-hidden>
          {partners.map((partner) => (
            <div key={`m-${partner.name}`} className="grid h-24 w-44 shrink-0 place-items-center rounded-xl bg-white p-4">
              <Image
                src={partner.image}
                alt={partner.name}
                width={140}
                height={70}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        {/* Visible sets */}
        {[0, 1, 2, 3, 4].map((set) => (
          <div key={set} className="flex shrink-0 gap-4">
            {partners.map((partner) => (
              <div key={`${set}-${partner.name}`} className="grid h-24 w-44 shrink-0 place-items-center rounded-xl bg-white p-4">
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={140}
                  height={70}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
