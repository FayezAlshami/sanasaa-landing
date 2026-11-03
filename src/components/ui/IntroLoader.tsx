"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function IntroLoader() {
  const overlay = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = overlay.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        el.style.display = "none";
      },
    });
    tl.fromTo(
      logo.current,
      { scale: 0.6, opacity: 0, filter: "blur(12px)" },
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
    )
      .fromTo(
        ring.current,
        { scale: 0.4, opacity: 0, rotate: -40 },
        { scale: 1.15, opacity: 1, rotate: 0, duration: 1, ease: "expo.out" },
        0.1,
      )
      .to(ring.current, { scale: 1.6, opacity: 0, duration: 0.55, ease: "power2.in" }, "+=0.35")
      .to(logo.current, { y: -20, opacity: 0, duration: 0.45, ease: "power2.in" }, "-=0.25")
      .to(el, { yPercent: -100, duration: 0.85, ease: "power4.inOut" }, "-=0.1");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={overlay} className="intro-overlay" aria-hidden>
      <div className="relative grid place-items-center">
        <div
          ref={ring}
          className="absolute h-44 w-44 rounded-full border border-gold/40"
          style={{ boxShadow: "0 0 60px rgba(241,165,42,0.25)" }}
        />
        <div ref={logo} className="relative z-10">
          <Image
            src="/brand/logo-white.svg"
            alt=""
            width={220}
            height={110}
            priority
            className="h-auto w-[180px] md:w-[220px]"
          />
        </div>
      </div>
    </div>
  );
}
