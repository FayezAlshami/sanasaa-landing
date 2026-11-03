"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";
import HeroVisual from "../hero/HeroVisual";
import { SITE } from "@/lib/constants";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || !content.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { y: 48, autoAlpha: 0.4 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.95,
          ease: "power4.out",
          delay: 1.35,
          immediateRender: false,
        },
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 24, autoAlpha: 0.4 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", delay: 1.9, immediateRender: false },
      );
      gsap.fromTo(
        ".hero-scroll",
        { y: 12, autoAlpha: 0.3 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power2.out", delay: 2.15, immediateRender: false },
      );
      // Safety: never leave hero copy invisible
      window.setTimeout(() => {
        gsap.set([".hero-line", ".hero-cta", ".hero-scroll"], { clearProps: "opacity,visibility,transform" });
      }, 4000);
      gsap.to(content.current, {
        yPercent: 12,
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
      <HeroVisual />

      <div ref={content} className="relative z-10 flex min-h-[100svh] items-center section-pad pb-28">
        <div className="container-wide">
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
        </div>
      </div>

      {/* Centered premium scroll indicator */}
      <a
        href="#why"
        className="hero-scroll absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-center"
        aria-label="اسحب للأسفل"
      >
        <span className="relative flex h-11 w-7 items-start justify-center rounded-full border border-gold/45 bg-navy-deep/40 backdrop-blur-sm">
          <span className="mt-2 h-2 w-1 rounded-full bg-gold shadow-[0_0_10px_rgba(241,165,42,0.8)] animate-[scroll-dot_1.6s_ease-in-out_infinite]" />
        </span>
        <span className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-semibold tracking-wide text-gold/80">اسحب للأسفل</span>
          <svg width="14" height="10" viewBox="0 0 14 10" className="animate-pulse-glow text-gold/70" aria-hidden>
            <path d="M1 1.5 L7 7.5 L13 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>
    </section>
  );
}
