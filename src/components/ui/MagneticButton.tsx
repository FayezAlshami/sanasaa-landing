"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  as?: "a" | "button";
  type?: "button" | "submit";
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  as,
  type = "button",
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const isDesktop = useIsDesktop();
  const Comp = (as ?? (href ? "a" : "button")) as "a" | "button";

  const onMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.35, y: y * 0.35, duration: 0.35, ease: "power3.out" });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.4)" });
  };

  const shared = {
    ref: ref as never,
    "data-magnetic": true,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    className: `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-bold transition-colors ${className}`,
  };

  if (Comp === "a") {
    return (
      <a {...shared} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button {...shared} type={type}>
      {children}
    </button>
  );
}
