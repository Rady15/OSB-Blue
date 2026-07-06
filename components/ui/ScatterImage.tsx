"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScatterImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

// Glass shard clip-paths - triangular pieces that tile the image
const shards = [
  // Top row
  "polygon(0% 0%, 33% 0%, 20% 35%)",
  "polygon(33% 0%, 66% 0%, 50% 30%)",
  "polygon(66% 0%, 100% 0%, 80% 35%)",
  "polygon(20% 35%, 50% 30%, 33% 0%)",
  "polygon(50% 30%, 80% 35%, 66% 0%)",
  // Middle row
  "polygon(0% 0%, 20% 35%, 0% 50%)",
  "polygon(20% 35%, 50% 30%, 40% 65%)",
  "polygon(50% 30%, 80% 35%, 65% 60%)",
  "polygon(80% 35%, 100% 0%, 100% 50%)",
  "polygon(0% 50%, 20% 35%, 40% 65%)",
  "polygon(40% 65%, 50% 30%, 65% 60%)",
  "polygon(65% 60%, 80% 35%, 100% 50%)",
  // Bottom row
  "polygon(0% 50%, 40% 65%, 25% 100%)",
  "polygon(0% 50%, 25% 100%, 0% 100%)",
  "polygon(25% 100%, 40% 65%, 65% 60%)",
  "polygon(40% 65%, 65% 60%, 50% 100%)",
  "polygon(25% 100%, 50% 100%, 65% 60%)",
  "polygon(65% 60%, 100% 50%, 75% 100%)",
  "polygon(50% 100%, 75% 100%, 65% 60%)",
  "polygon(75% 100%, 100% 50%, 100% 100%)",
];

// Scatter directions for each shard
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

export function ScatterImage({ src, alt, width, height, className = "" }: ScatterImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        shardsRef.current.forEach((shard) => {
          if (shard) gsap.set(shard, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
        });
        return;
      }

      const shardEls = shardsRef.current.filter(Boolean);

      // Set initial scattered state
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

      // Animate shards coming together
      gsap.to(shardEls, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 3.5,
        stagger: {
          each: 0.15,
          from: "random",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 15%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: "1200px" }}>
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
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-full w-full object-cover"
            style={{ borderRadius: "2rem" }}
          />
        </div>
      ))}

      {/* Invisible placeholder for sizing */}
      <div style={{ visibility: "hidden" }}>
        <Image src={src} alt="" width={width} height={height} />
      </div>
    </div>
  );
}
