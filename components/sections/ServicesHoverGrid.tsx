"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/data/services";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

gsap.registerPlugin(ScrollTrigger);

const allImages = [
  "/images/operations-dashboard.svg",
  "/images/service-cards.svg",
  "/images/consulting-session.svg",
  "/images/business-strategy.svg",
];

// Maps each service index (0-5) to an image index in allImages
const serviceToImage = [1, 0, 2, 3, 1, 0];

const DEFAULT_SERVICE_IDX = 1;

// Glass shard clip-paths
const shards = [
  "polygon(0% 0%, 33% 0%, 20% 35%)",
  "polygon(33% 0%, 66% 0%, 50% 30%)",
  "polygon(66% 0%, 100% 0%, 80% 35%)",
  "polygon(20% 35%, 50% 30%, 33% 0%)",
  "polygon(50% 30%, 80% 35%, 66% 0%)",
  "polygon(0% 0%, 20% 35%, 0% 50%)",
  "polygon(20% 35%, 50% 30%, 40% 65%)",
  "polygon(50% 30%, 80% 35%, 65% 60%)",
  "polygon(80% 35%, 100% 0%, 100% 50%)",
  "polygon(0% 50%, 20% 35%, 40% 65%)",
  "polygon(40% 65%, 50% 30%, 65% 60%)",
  "polygon(65% 60%, 80% 35%, 100% 50%)",
  "polygon(0% 50%, 40% 65%, 25% 100%)",
  "polygon(0% 50%, 25% 100%, 0% 100%)",
  "polygon(25% 100%, 40% 65%, 65% 60%)",
  "polygon(40% 65%, 65% 60%, 50% 100%)",
  "polygon(25% 100%, 50% 100%, 65% 60%)",
  "polygon(65% 60%, 100% 50%, 75% 100%)",
  "polygon(50% 100%, 75% 100%, 65% 60%)",
  "polygon(75% 100%, 100% 50%, 100% 100%)",
];

// Scatter directions
const scatterTransforms = [
  { x: -250, y: -200, rotation: -40, scale: 0.3 },
  { x: 40, y: -280, rotation: 25, scale: 0.4 },
  { x: 280, y: -160, rotation: 50, scale: 0.35 },
  { x: -120, y: -140, rotation: -20, scale: 0.5 },
  { x: 160, y: -220, rotation: 35, scale: 0.3 },
  { x: -320, y: 40, rotation: -55, scale: 0.4 },
  { x: -60, y: -80, rotation: 15, scale: 0.45 },
  { x: 100, y: -120, rotation: -30, scale: 0.35 },
  { x: 320, y: 60, rotation: 45, scale: 0.4 },
  { x: -280, y: 120, rotation: -35, scale: 0.3 },
  { x: 20, y: -40, rotation: 10, scale: 0.5 },
  { x: 240, y: 160, rotation: 40, scale: 0.35 },
  { x: -200, y: 240, rotation: -50, scale: 0.4 },
  { x: -300, y: 200, rotation: -25, scale: 0.3 },
  { x: 80, y: 220, rotation: 20, scale: 0.45 },
  { x: -40, y: 280, rotation: -15, scale: 0.35 },
  { x: 140, y: 260, rotation: 30, scale: 0.4 },
  { x: 280, y: 220, rotation: 55, scale: 0.3 },
  { x: 60, y: 320, rotation: -10, scale: 0.45 },
  { x: 300, y: 280, rotation: 35, scale: 0.35 },
];

export function ServicesHoverGrid() {
  const [currentImg, setCurrentImg] = useState(allImages[serviceToImage[DEFAULT_SERVICE_IDX]]);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const displayedServices = services.slice(0, 6);

  const scatterImage = useCallback(() => {
    const shardEls = shardsRef.current.filter(Boolean);
    if (!shardEls.length) return;

    // Scatter out
    shardEls.forEach((shard, i) => {
      if (!shard) return;
      const t = scatterTransforms[i % scatterTransforms.length];
      gsap.to(shard, {
        x: t.x,
        y: t.y,
        rotation: t.rotation,
        scale: t.scale,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    });
  }, []);

  const gatherImage = useCallback(() => {
    const shardEls = shardsRef.current.filter(Boolean);
    if (!shardEls.length) return;

    // Gather back
    gsap.to(shardEls, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.7,
      stagger: { each: 0.03, from: "random" },
      ease: "power3.out",
      onComplete: () => setIsAnimating(false),
    });
  }, []);

  const handleHover = useCallback(
    (slug: string | null) => {
      if (isAnimating) return;

      let nextImg: string;
      if (slug === null) {
        nextImg = allImages[serviceToImage[DEFAULT_SERVICE_IDX]];
      } else {
        const idx = displayedServices.findIndex((s) => s.slug === slug);
        if (idx === -1) return;
        nextImg = allImages[serviceToImage[idx]];
      }

      if (nextImg === currentImg) return;

      setIsAnimating(true);

      // First scatter out
      scatterImage();

      // After scatter, change image and gather
      setTimeout(() => {
        setCurrentImg(nextImg);
        // Reset shards to scattered position for new image
        const shardEls = shardsRef.current.filter(Boolean);
        shardEls.forEach((shard, i) => {
          if (!shard) return;
          const t = scatterTransforms[i % scatterTransforms.length];
          gsap.set(shard, {
            x: t.x,
            y: t.y,
            rotation: t.rotation,
            scale: t.scale,
            opacity: 0,
          });
        });
        // Then gather
        setTimeout(() => gatherImage(), 50);
      }, 500);
    },
    [currentImg, isAnimating, scatterImage, gatherImage, displayedServices],
  );

  // Initialize shards in gathered state
  useEffect(() => {
    const shardEls = shardsRef.current.filter(Boolean);
    gsap.set(shardEls, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-28">
      <div className="container-osb grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left: Services list */}
        <div>
          <p className="mb-3 text-sm font-bold text-white/45">الحلول التي</p>
          <ScrollRevealText
            as="h2"
            text="نقدمها"
            className="text-5xl font-extrabold md:text-7xl"
          />
          <div className="mt-10 grid gap-4">
            {displayedServices.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                onMouseEnter={() => handleHover(service.slug)}
                onMouseLeave={() => handleHover(null)}
                className="group grid grid-cols-[42px_1fr_42px] items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition hover:bg-white hover:text-black"
              >
                <span className="text-sm text-white/40 group-hover:text-black/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-extrabold">{service.title}</span>
                <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Image with glass-shatter effect */}
        <div className="relative">
          <div ref={containerRef} className="relative aspect-[4/3] rounded-[2rem]" style={{ perspective: "1200px" }}>
            {/* Shard layers */}
            {shards.map((clipPath, i) => (
              <div
                key={i}
                ref={(el) => { shardsRef.current[i] = el; }}
                className="absolute inset-0"
                style={{
                  clipPath,
                  WebkitClipPath: clipPath,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={currentImg}
                  alt="خدمات OSB"
                  width={960}
                  height={720}
                  className="h-full w-full object-cover"
                  style={{ borderRadius: "2rem" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
