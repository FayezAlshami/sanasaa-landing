"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TESTIMONIALS } from "@/lib/constants";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".t-card", {
        y: 70,
        opacity: 0,
        rotateZ: -2,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section-pad">
      <div className="container-wide">
        <p className="mb-3 text-sm font-bold text-gold">قصص من المنصة</p>
        <TextReveal className="mb-3 text-3xl font-black md:text-5xl">ماذا يقول الطلاب والأهل؟</TextReveal>
        <p className="mb-10 text-sm text-muted">أمثلة توضيحية للعرض — ليست شهادات حقيقية بعد.</p>
        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TiltCard key={t.name} className="t-card">
              <article className="glass flex h-full flex-col rounded-3xl p-6">
                <span className="mb-4 text-3xl text-gold/50">&ldquo;</span>
                <p className="flex-1 text-sm leading-8 text-cream/85 md:text-base">{t.text}</p>
                <div className="mt-6 border-t border-gold/15 pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted">{t.role}</p>
                  <span className="mt-2 inline-block rounded-full bg-purple/30 px-2.5 py-0.5 text-[11px] text-gold">
                    {t.note}
                  </span>
                </div>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
