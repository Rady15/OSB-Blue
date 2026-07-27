"use client";

import Image from "next/image";

interface GlassShatterImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function GlassShatterImage({ src, alt, width, height, className = "" }: GlassShatterImageProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover"
        style={{ borderRadius: "2rem" }}
      />
    </div>
  );
}
