"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FEATURES } from "@/lib/constants";
import TextReveal from "../ui/TextReveal";
import TiltCard from "../ui/TiltCard";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".feat-card");
      gsap.fromTo(
        cards,
        { y: 48, autoAlpha: 0.4 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.07,
          duration: 0.75,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: ".feat-grid", start: "top 80%", once: true },
        },
      );
      const safety = window.setTimeout(() => {
        gsap.set(cards, { clearProps: "opacity,visibility,transform" });
      }, 4000);
      return () => window.clearTimeout(safety);
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="features" ref={root} className="relative overflow-hidden section-pad">
      <div className="container-wide">
        <p className="mb-3 text-sm font-bold text-gold">المزايا</p>
        <TextReveal className="mb-3 text-3xl font-black md:text-5xl">كل ما تحتاجه في مكان واحد</TextReveal>
        <p className="mb-10 max-w-2xl text-muted md:text-lg">
          من الفيديو إلى الرادار الوزاري — أدوات عملية للطالب، وطمأنينة للأهل.
        </p>

        <div className="feat-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map((f) => (
            <TiltCard key={f.id} className="feat-card">
              <article className="glass h-full rounded-3xl p-6 transition hover:border-gold/40">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-purple/40 text-xl text-gold">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm leading-7 text-muted">{f.desc}</p>
              </article>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
