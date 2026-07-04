"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const x = useSpring(mouseX, { stiffness: 500, damping: 35 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 35 });

  useEffect(() => {
    if (window.innerWidth < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX - (hovering ? 20 : 6));
      mouseY.set(event.clientY - (hovering ? 20 : 6));
    };
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setHovering(Boolean(target.closest(".cursor-hover")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [hovering, mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[80] hidden rounded-full bg-accent mix-blend-difference md:block"
      style={{ x, y, width: hovering ? 40 : 12, height: hovering ? 40 : 12, opacity: hovering ? 0.35 : 1 }}
    />
  );
}
