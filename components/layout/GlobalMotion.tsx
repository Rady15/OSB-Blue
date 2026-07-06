"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function GlobalMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const imageReveals = gsap.utils.toArray<HTMLElement>("[data-image-reveal]");
    imageReveals.forEach((element) => {
      gsap.to(element, {
        clipPath: "inset(0 0 0% 0 round 28px)",
        opacity: 1,
        duration: 1.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    const parallaxItems = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    parallaxItems.forEach((element) => {
      const speed = Number(element.dataset.parallax || 40);
      gsap.fromTo(
        element,
        { y: speed },
        {
          y: -speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    });

    const tiltCards = gsap.utils.toArray<HTMLElement>("[data-tilt]");
    const cleanups = tiltCards.map((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * -12;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
        gsap.to(card, { rotateX: y, rotateY: x, scale: 1.02, duration: 0.45, ease: "power3.out" });
      };
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: "power3.out" });
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
