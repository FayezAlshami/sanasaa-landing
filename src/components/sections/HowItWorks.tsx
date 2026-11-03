"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STEPS } from "@/lib/constants";
import TextReveal from "../ui/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      if (line.current) {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: true,
            },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>(".step-card").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? 60 : -60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="how" ref={root} className="relative section-pad">
      <div className="container-narrow">
        <p className="mb-3 text-sm font-bold text-gold">كيف تعمل؟</p>
        <TextReveal className="mb-12 text-3xl font-black md:text-5xl">ثلاث خطوات وتبدأ رحلتك</TextReveal>

        <div className="relative">
          <div className="absolute start-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gold/15 md:block">
            <div ref={line} className="h-full origin-top bg-gradient-to-b from-gold via-purple-light to-gold" />
          </div>

          <div className="space-y-8 md:space-y-16">
            {STEPS.map((step, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={step.n} className="step-card relative grid items-center gap-6 md:grid-cols-2">
                  <div className={flip ? "md:col-start-1" : "md:col-start-2"}>
                    <div className="glass rounded-3xl p-7">
                      <span className="text-5xl font-black text-gold/40">{step.n}</span>
                      <h3 className="mt-3 text-2xl font-bold">{step.title}</h3>
                      <p className="mt-3 leading-8 text-muted">{step.desc}</p>
                    </div>
                  </div>
                  <div
                    className={`hidden md:flex ${flip ? "md:col-start-2 md:row-start-1 justify-start" : "md:col-start-1 md:row-start-1 justify-end"}`}
                  >
                    <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-gold bg-navy-deep text-xl font-black text-gold glow-gold">
                      {i + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
