"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const PATHS = [
  "M421,310Q390,370,330,390Q270,410,210,380Q150,350,120,290Q90,230,130,170Q170,110,240,90Q310,70,370,110Q430,150,450,220Q470,290,421,310Z",
  "M430,300Q400,360,340,385Q280,410,220,375Q160,340,130,280Q100,220,145,165Q190,110,260,95Q330,80,385,120Q440,160,455,230Q470,300,430,300Z",
  "M410,320Q375,385,310,400Q245,415,185,370Q125,325,115,255Q105,185,160,140Q215,95,285,100Q355,105,400,155Q445,205,440,270Q435,335,410,320Z",
];

export default function MorphBlob({ className = "" }: { className?: string }) {
  const path = useRef<SVGPathElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!path.current || reduced) return;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    PATHS.forEach((d) => {
      tl.to(path.current, { attr: { d }, duration: 3.5, ease: "sine.inOut" });
    });
    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <svg
      viewBox="0 0 560 500"
      className={`pointer-events-none absolute opacity-40 ${className}`}
      aria-hidden
    >
      <defs>
        <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#623996" />
          <stop offset="100%" stopColor="#f1a52a" />
        </linearGradient>
      </defs>
      <path ref={path} d={PATHS[0]} fill="url(#blobGrad)" opacity="0.35" />
    </svg>
  );
}
