"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STATS } from "@/lib/constants";
import AnimatedCounter from "../ui/AnimatedCounter";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative section-pad">
      <div className="container-wide">
        <div className="glass overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(241,165,42,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(98,57,150,0.2),transparent_40%)]" />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((st) => (
              <div key={st.label} className="stat-item text-center">
                <div className="gradient-text text-4xl font-black md:text-5xl">
                  <AnimatedCounter value={st.value} suffix={st.suffix} />
                </div>
                <p className="mt-2 text-sm font-semibold text-muted md:text-base">{st.label}</p>
              </div>
            ))}
          </div>
          <p className="relative mt-8 text-center text-xs text-muted/80">
            أرقام توضيحية للعرض — تُحدَّث مع الإطلاق الرسمي.
          </p>
        </div>
      </div>
    </section>
  );
}
