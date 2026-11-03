"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export default function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * -14;
    const rotateX = (y - 0.5) * 14;
    gsap.to(ref.current, {
      rotateX,
      rotateY,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-3d will-change-transform ${className}`}
      data-cursor="grow"
    >
      {children}
    </div>
  );
}
