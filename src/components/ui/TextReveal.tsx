"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  mode?: "chars" | "words";
  delay?: number;
};

export default function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  mode = "words",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const parts = mode === "chars" ? Array.from(children) : children.split(" ");
    el.innerHTML = parts
      .map((p) => {
        const safe = p === " " ? "&nbsp;" : p;
        const cls = mode === "chars" ? "split-char" : "split-word";
        // Visible by default — animation only enhances
        return `<span class="inline-block overflow-hidden align-bottom"><span class="${cls} inline-block">${safe}${mode === "words" ? "&nbsp;" : ""}</span></span>`;
      })
      .join("");

    const targets = el.querySelectorAll(`.${mode === "chars" ? "split-char" : "split-word"}`);
    const anim = gsap.fromTo(
      targets,
      { y: "40%", autoAlpha: 0.35 },
      {
        y: "0%",
        autoAlpha: 1,
        duration: 0.7,
        stagger: mode === "chars" ? 0.015 : 0.04,
        ease: "power3.out",
        delay,
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      },
    );

    // Safety: force visible if trigger never fires
    const safety = window.setTimeout(() => {
      gsap.set(targets, { y: "0%", autoAlpha: 1, clearProps: "opacity,visibility,transform" });
    }, 3500);

    return () => {
      window.clearTimeout(safety);
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [children, mode, delay, reduced]);

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}
