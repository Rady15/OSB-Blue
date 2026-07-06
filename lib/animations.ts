"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const canAnimate = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const fadeUpOnScroll = (
  selector: string,
  options?: { stagger?: number; delay?: number; trigger?: string },
) => {
  if (!canAnimate()) return;

  gsap.from(selector, {
    y: 40,
    opacity: 0,
    duration: 1.6,
    ease: "power3.out",
    stagger: options?.stagger ?? 0.25,
    delay: options?.delay ?? 0,
    scrollTrigger: {
      trigger: options?.trigger ?? selector,
      start: "top 85%",
      toggleActions: "play none none none",
      once: true,
    },
  });
};
