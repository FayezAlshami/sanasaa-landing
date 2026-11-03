"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NAV } from "@/lib/constants";
import MagneticButton from "../ui/MagneticButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-navy-deep/80 py-3 backdrop-blur-xl border-b border-gold/10" : "bg-transparent py-5"
      }`}
    >
      <div className="container-wide flex items-center justify-between gap-4 px-5 md:px-8">
        <a href="#top" className="relative z-10" data-cursor="grow">
          <Image src="/brand/logo-white.svg" alt="سنسعى" width={140} height={70} className="h-10 w-auto md:h-12" priority />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-cream/75 transition hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton href="#download" className="bg-gold text-navy-deep hover:bg-gold-soft">
            حمّل التطبيق
          </MagneticButton>
        </div>

        <button
          type="button"
          className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-gold/30 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="القائمة"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-5 bg-gold transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gold transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-gold transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="absolute inset-x-0 top-full border-b border-gold/10 bg-navy-deep/95 px-5 py-6 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-lg font-bold text-cream"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
              <MagneticButton href="#download" className="bg-gold text-navy-deep" onClick={() => setOpen(false)}>
                حمّل التطبيق
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
