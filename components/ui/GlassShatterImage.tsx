"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface GlassShatterImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

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

export function GlassShatterImage({ src, alt, width, height, className = "" }: GlassShatterImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Expose shards for external animation
  useEffect(() => {
    return () => { shardsRef.current = []; };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ perspective: "1200px" }}>
      {shards.map((clipPath, i) => (
        <div
          key={i}
          ref={(el) => { shardsRef.current[i] = el; }}
          data-shard
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
