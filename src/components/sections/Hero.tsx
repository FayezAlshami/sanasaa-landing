"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import { SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-navy-deep" />,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || !content.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        rotateX: -40,
        transformOrigin: "top",
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        delay: 1.5,
      });
      gsap.from(".hero-cta", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: 2.1,
      });
      gsap.to(content.current, {
        yPercent: 25,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" ref={root} className="relative min-h-[100svh] overflow-hidden">
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(98,57,150,0.35),transparent_55%)]" />

      <div ref={content} className="relative z-10 flex min-h-[100svh] items-center section-pad">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl perspective-[800px]">
            <p className="hero-line mb-4 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-surface/50 px-4 py-1.5 text-sm font-semibold text-gold">
              <span className="h-2 w-2 animate-pulse-glow rounded-full bg-gold" />
              للطلاب وأولياء الأمور في سوريا
            </p>
            <h1 className="hero-line text-4xl font-black leading-[1.25] md:text-6xl lg:text-7xl">
              منصة <span className="gradient-text">سنسعى</span>
              <br />
              للتعليم الثانوي
            </h1>
            <p className="hero-line mt-6 max-w-xl text-base leading-9 text-cream/75 md:text-xl">
              دروس فيديو، امتحانات ذكية، نقاط ومكافآت، ومتصدرين — طريق أوضح نحو البكالوريا، مع متابعة هادئة للأهل.
            </p>
            <div className="hero-cta mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton href="#download" className="glow-gold bg-gold text-navy-deep hover:bg-gold-soft">
                ابدأ الآن — حمّل التطبيق
              </MagneticButton>
              <MagneticButton
                href="#features"
                className="border border-gold/35 bg-transparent text-cream hover:border-gold hover:text-gold"
              >
                اكتشف المزايا
              </MagneticButton>
            </div>
            <p className="hero-cta mt-6 text-sm text-muted">{SITE.tagline}</p>
          </div>
          <div className="pointer-events-none hidden h-[420px] lg:block" aria-hidden />
        </div>
      </div>

      <div className="absolute bottom-8 inset-inline-start-1/2 z-10 -translate-x-1/2 text-center text-xs text-muted">
        <div className="mx-auto mb-2 h-10 w-px overflow-hidden bg-gold/20">
          <div className="h-full w-full origin-top animate-pulse-glow bg-gold/70" />
        </div>
        اسحب للأسفل
      </div>
    </section>
  );
}
