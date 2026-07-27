"use client";

import { motion, useAnimationControls, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "start";
};

export function SectionHeading({ eyebrow, title, description, light = true, align = "start" }: SectionHeadingProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimationControls();
  const inView = useInView(rootRef, {
    amount: 0.45,
    margin: "0px 0px -12% 0px",
    once: false,
  });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  return (
    <div ref={rootRef} className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow ? (
        <motion.span
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { y: 24, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
          }}
          className={`mb-3 block text-sm font-bold ${light ? "text-white/55" : "text-white/55"}`}
        >
          {eyebrow}
        </motion.span>
      ) : null}
      <ScrollRevealText
        as="h2"
        text={title}
        wordsPerLine={5}
        className={`text-3xl font-extrabold leading-[1.5] md:text-5xl ${light ? "text-white" : "text-white"}`}
        startIndex={1}
      />
      {description ? (
        <ScrollRevealText
          as="p"
          text={description}
          wordsPerLine={9}
          className={`mt-5 text-lg leading-9 ${light ? "text-white/60" : "text-white/60"}`}
          startIndex={3}
        />
      ) : null}
    </div>
  );
}
