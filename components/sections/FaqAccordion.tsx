"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/faq";
import { useT } from "@/lib/i18n";

export function FaqAccordion() {
  const t = useT();
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="grid gap-4">
      {faqs.map((faq, index) => {
        const question = t(`faq.${index}.q`);
        const answer = t(`faq.${index}.a`);
        return (
          <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_0_45px_rgba(37,99,235,0.08)]">
            <button
              onClick={() => setActive(active === index ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-6 text-right text-xl font-bold text-white"
            >
              {question}
              <ChevronDown className={`h-5 w-5 shrink-0 text-white/55 transition ${active === index ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {active === index ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 leading-8 text-white/60">{answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
