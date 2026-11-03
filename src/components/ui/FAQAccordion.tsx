"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Item = { q: string; a: string };

export default function FAQAccordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="glass overflow-hidden rounded-2xl">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right text-base font-bold md:text-lg"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              data-magnetic
            >
              <span>{item.q}</span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/30 text-gold transition-transform ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-5 pb-5 text-sm leading-8 text-muted md:text-base">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
