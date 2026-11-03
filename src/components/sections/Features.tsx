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
  const pin = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".feat-card");
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        scale: 0.92,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feat-grid", start: "top 75%" },
      });

      // pinned storytelling strip on desktop
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = pin.current?.querySelector<HTMLElement>(".horizontal-track");
        const panels = gsap.utils.toArray<HTMLElement>(".feat-story");
        if (!pin.current || !track || panels.length === 0) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: pin.current,
            pin: true,
            scrub: 1,
            end: () => `+=${track.scrollWidth}`,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="features" ref={root} className="relative overflow-hidden">
      <div className="section-pad">
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
      </div>

      {/* Horizontal pinned storytelling */}
      <div ref={pin} className="horizontal-pin hidden lg:block">
        <div className="flex h-[100svh] items-center">
          <div className="horizontal-track">
            {FEATURES.slice(0, 5).map((f, i) => (
              <div
                key={`story-${f.id}`}
                className="feat-story flex h-[100svh] w-screen shrink-0 items-center justify-center px-16"
              >
                <div className="container-narrow grid max-w-5xl grid-cols-[0.4fr_1fr] items-center gap-12">
                  <div className="text-[8rem] font-black leading-none text-gold/20">{String(i + 1).padStart(2, "0")}</div>
                  <div>
                    <p className="mb-3 text-sm font-bold text-gold">لحظة {i + 1}</p>
                    <h3 className="mb-4 text-4xl font-black md:text-5xl">{f.title}</h3>
                    <p className="max-w-xl text-lg leading-9 text-cream/75">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
