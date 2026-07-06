"use client";

import { motion, useAnimationControls, useInView, type Variants } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

const lineVariants: Variants = {
  hidden: { y: 42, opacity: 0 },
  visible: (index: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1.4,
      delay: index * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function splitIntoLines(text: string, wordsPerLine: number) {
  const manualLines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return manualLines.flatMap((line) => {
    const sentenceLines = line
      .split(/(?<=[.؟!،])\s+/)
      .map((part) => part.trim())
      .filter(Boolean);
    const sourceLines = sentenceLines.length > 1 ? sentenceLines : [line];

    return sourceLines.flatMap((sourceLine) => {
      const words = sourceLine.split(/\s+/).filter(Boolean);
      if (words.length <= wordsPerLine) return [sourceLine];

      const chunks: string[] = [];
      for (let index = 0; index < words.length; index += wordsPerLine) {
        chunks.push(words.slice(index, index + wordsPerLine).join(" "));
      }
      return chunks;
    });
  });
}

export function ScrollRevealText({
  text,
  as = "span",
  className = "",
  lineClassName = "",
  wordsPerLine = 6,
  startIndex = 0,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  lineClassName?: string;
  wordsPerLine?: number;
  startIndex?: number;
}) {
  const rootRef = useRef(null);
  const controls = useAnimationControls();
  const inView = useInView(rootRef, {
    amount: 0.45,
    margin: "0px 0px -12% 0px",
    once: false,
  });
  const lines = useMemo(() => splitIntoLines(text, wordsPerLine), [text, wordsPerLine]);
  const content = lines.map((line, index) => (
    <span key={`${line}-${index}`} className="block overflow-hidden">
      <motion.span
        aria-hidden="true"
        custom={startIndex + index}
        variants={lineVariants}
        className={`block ${lineClassName}`}
      >
        {line}
      </motion.span>
    </span>
  ));

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [controls, inView]);

  if (as === "h1") return <motion.h1 ref={rootRef} aria-label={text} initial="hidden" animate={controls} className={className}>{content}</motion.h1>;
  if (as === "h2") return <motion.h2 ref={rootRef} aria-label={text} initial="hidden" animate={controls} className={className}>{content}</motion.h2>;
  if (as === "h3") return <motion.h3 ref={rootRef} aria-label={text} initial="hidden" animate={controls} className={className}>{content}</motion.h3>;
  if (as === "p") return <motion.p ref={rootRef} aria-label={text} initial="hidden" animate={controls} className={className}>{content}</motion.p>;

  return <motion.span ref={rootRef} aria-label={text} initial="hidden" animate={controls} className={className}>{content}</motion.span>;
}
