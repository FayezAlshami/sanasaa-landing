"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const xTo = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rxTo = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3.out" });
    const ryTo = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-magnetic], [data-cursor='grow']");
      if (interactive) {
        gsap.to(r, { scale: 2.2, borderColor: "#f1a52a", duration: 0.3 });
        gsap.to(d, { scale: 0.4, background: "#f1a52a", duration: 0.3 });
      }
    };
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-magnetic], [data-cursor='grow']");
      if (interactive) {
        gsap.to(r, { scale: 1, borderColor: "rgba(241,165,42,0.55)", duration: 0.3 });
        gsap.to(d, { scale: 1, background: "#f1a52a", duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dot}
        className="custom-cursor pointer-events-none fixed top-0 left-0 z-[10002] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ring}
        className="cursor-follower pointer-events-none fixed top-0 left-0 z-[10002] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/55"
        aria-hidden
      />
    </>
  );
}
