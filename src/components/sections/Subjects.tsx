"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SUBJECTS } from "@/lib/constants";
import Marquee from "../ui/Marquee";
import TextReveal from "../ui/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Subjects() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".subject-chip",
        { scale: 0.92, autoAlpha: 0.5, y: 20 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.55,
          ease: "back.out(1.7)",
          immediateRender: false,
          scrollTrigger: { trigger: ".subject-grid", start: "top 80%", once: true },
        },
      );
      const safety = window.setTimeout(() => gsap.set(".subject-chip", { clearProps: "opacity,visibility,transform" }), 4000);
      return () => window.clearTimeout(safety);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="subjects" ref={root} className="relative overflow-hidden">
      <Marquee items={SUBJECTS} />
      <div className="section-pad">
        <div className="container-narrow text-center">
          <p className="mb-3 text-sm font-bold text-gold">المواد</p>
          <TextReveal className="mb-4 text-3xl font-black md:text-5xl">موادك… كلها تحت سقف واحد</TextReveal>
          <p className="mx-auto mb-10 max-w-xl text-muted">
            علمي وأدبي — اختر فروعك ووحداتك، وافتح ما تحتاجه بنقاطك.
          </p>
          <div className="subject-grid flex flex-wrap justify-center gap-3">
            {SUBJECTS.map((s) => (
              <span
                key={s}
                className="subject-chip rounded-full border border-gold/20 bg-surface/60 px-5 py-2.5 text-sm font-bold text-cream/90 transition hover:border-gold hover:text-gold md:text-base"
                data-cursor="grow"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Marquee items={[...SUBJECTS].reverse()} className="opacity-70" />
    </section>
  );
}
