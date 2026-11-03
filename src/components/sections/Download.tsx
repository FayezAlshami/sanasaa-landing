"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import MagneticButton from "../ui/MagneticButton";
import TextReveal from "../ui/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { withBase } from "@/lib/basePath";

gsap.registerPlugin(ScrollTrigger);

export default function Download() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".dl-panel", {
        scale: 0.94,
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(".dl-orb", {
        rotate: 360,
        duration: 40,
        repeat: -1,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="download" ref={root} className="section-pad">
      <div className="container-wide">
        <div className="dl-panel relative overflow-hidden rounded-[2.5rem] border border-gold/20 bg-gradient-to-br from-surface via-navy to-navy-deep p-8 md:p-14">
          <div className="dl-orb pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full border border-gold/20" />
          <div className="dl-orb pointer-events-none absolute -start-16 bottom-0 h-56 w-56 rounded-full border border-purple-light/30" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="mb-3 text-sm font-bold text-gold">حمّل التطبيق</p>
              <TextReveal className="mb-4 text-3xl font-black md:text-5xl">خليك جاهز… الإطلاق قريب</TextReveal>
              <p className="mb-8 max-w-xl text-muted leading-8">
                Google Play و App Store قادمان قريباً. سجّل اهتمامك أو تواصل معنا وسنخبرك فور التوفر.
              </p>
              <div className="flex flex-wrap gap-4">
                <MagneticButton className="bg-cream/10 text-cream border border-cream/20 opacity-80" as="button">
                  <span className="text-lg">▶</span> Google Play — قريباً
                </MagneticButton>
                <MagneticButton className="bg-cream/10 text-cream border border-cream/20 opacity-80" as="button">
                  <span className="text-lg"></span> App Store — قريباً
                </MagneticButton>
              </div>
              <div className="mt-6">
                <MagneticButton href="#contact" className="bg-gold text-navy-deep hover:bg-gold-soft glow-gold">
                  أعلمني عند الإطلاق
                </MagneticButton>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xs">
              <div className="absolute inset-0 rounded-[2rem] bg-gold/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-navy-deep p-6 text-center">
                <Image
                  src={withBase("/brand/logo-white.svg")}
                  alt="سنسعى"
                  width={200}
                  height={100}
                  className="mx-auto h-auto w-40"
                />
                <p className="mt-4 text-sm text-muted">منصة سنسعى للتعليم الثانوي</p>
                <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
                  {["دروس", "امتحانات", "نقاط", "متصدرين"].map((x) => (
                    <span key={x} className="rounded-lg bg-surface px-2 py-2 text-cream/80">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
