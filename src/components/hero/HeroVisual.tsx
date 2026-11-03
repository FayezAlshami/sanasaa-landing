"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { withBase } from "@/lib/basePath";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

function BookSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden>
      <defs>
        <linearGradient id="bookGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f1a52a" />
          <stop offset="100%" stopColor="#f5c15d" />
        </linearGradient>
        <linearGradient id="bookCover" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8b5fc7" />
          <stop offset="100%" stopColor="#623996" />
        </linearGradient>
      </defs>
      <path
        d="M10 18 C28 10, 48 12, 58 22 L58 78 C48 68, 28 66, 10 72 Z"
        fill="url(#bookCover)"
        opacity="0.95"
      />
      <path
        d="M110 18 C92 10, 72 12, 62 22 L62 78 C72 68, 92 66, 110 72 Z"
        fill="url(#bookCover)"
        opacity="0.85"
      />
      <path d="M58 22 L62 22 L62 78 L58 78 Z" fill="url(#bookGold)" />
      <path
        d="M18 30 H48 M18 42 H46 M18 54 H42"
        stroke="#faf7f2"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export default function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hv-logo",
        { scale: 0.7, opacity: 0, filter: "blur(16px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 1.4 },
      );
      gsap.fromTo(
        ".hv-ring",
        { scale: 0.5, opacity: 0, rotate: -25 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: "expo.out", delay: 1.5 },
      );
      gsap.to(".hv-ring", {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
      });
      gsap.to(".hv-ring-inner", {
        rotate: -360,
        duration: 36,
        ease: "none",
        repeat: -1,
      });
      gsap.utils.toArray<HTMLElement>(".hv-book").forEach((book, i) => {
        gsap.fromTo(
          book,
          { y: 40, opacity: 0, rotate: i % 2 === 0 ? -18 : 18 },
          {
            y: 0,
            opacity: 1,
            rotate: i % 2 === 0 ? -8 : 10,
            duration: 1,
            ease: "power3.out",
            delay: 1.7 + i * 0.12,
          },
        );
        gsap.to(book, {
          y: i % 2 === 0 ? -14 : -10,
          rotate: i % 2 === 0 ? -4 : 14,
          duration: 3.2 + i * 0.35,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 2.2 + i * 0.1,
        });
      });
      gsap.to(".hv-orb", {
        scale: 1.08,
        opacity: 0.85,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.utils.toArray<HTMLElement>(".hv-particle").forEach((p, i) => {
        gsap.to(p, {
          y: -30 - (i % 5) * 8,
          x: (i % 2 === 0 ? 1 : -1) * (10 + (i % 4) * 6),
          opacity: 0.15,
          duration: 2.5 + (i % 6) * 0.4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.08,
        });
      });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(".hv-parallax", {
          x: x * 28,
          y: y * 18,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
        gsap.to(".hv-parallax-slow", {
          x: x * 12,
          y: y * 8,
          duration: 1.1,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      el.addEventListener("mousemove", onMove);
      return () => el.removeEventListener("mousemove", onMove);
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  const particles = Array.from({ length: 18 }, (_, i) => i);

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(98,57,150,0.45)_0%,transparent_55%),radial-gradient(ellipse_at_30%_70%,rgba(241,165,42,0.12)_0%,transparent_50%),linear-gradient(180deg,#0d0818_0%,#1a0f2e_50%,#0d0818_100%)]" />

      <div className="hv-orb absolute start-1/2 top-[42%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,95,199,0.55)_0%,rgba(98,57,150,0.2)_45%,transparent_70%)] blur-2xl md:h-[460px] md:w-[460px]" />

      <div className="hv-parallax-slow absolute inset-0 flex items-center justify-center">
        <div className="hv-ring relative grid h-[280px] w-[280px] place-items-center md:h-[380px] md:w-[380px]">
          <div className="absolute inset-0 rounded-full border border-gold/25" />
          <div className="hv-ring-inner absolute inset-6 rounded-full border border-dashed border-purple-light/35" />
          <div className="absolute inset-12 rounded-full border border-gold/15" />
          <div className="hv-logo relative z-10 drop-shadow-[0_0_40px_rgba(241,165,42,0.35)]">
            <Image
              src={withBase("/brand/logo-white.svg")}
              alt=""
              width={240}
              height={120}
              priority
              className="h-auto w-[150px] md:w-[220px]"
            />
          </div>
        </div>
      </div>

      <div className="hv-parallax absolute inset-0">
        <BookSVG className="hv-book absolute start-[8%] top-[22%] w-20 opacity-80 md:w-28" />
        <BookSVG className="hv-book absolute end-[10%] top-[28%] w-16 rotate-12 opacity-70 md:w-24" />
        <BookSVG className="hv-book absolute start-[18%] bottom-[18%] w-14 -rotate-6 opacity-60 md:w-20" />
        <BookSVG className="hv-book absolute end-[16%] bottom-[22%] w-18 opacity-75 md:w-24" />
      </div>

      {particles.map((i) => (
        <span
          key={i}
          className="hv-particle absolute h-1.5 w-1.5 rounded-full bg-gold/70"
          style={{
            top: `${12 + ((i * 37) % 70)}%`,
            insetInlineStart: `${8 + ((i * 53) % 84)}%`,
            opacity: 0.55,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-transparent to-navy-deep" />
    </div>
  );
}
