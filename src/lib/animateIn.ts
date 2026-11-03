"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimateInVars = gsap.TweenVars & {
  trigger?: Element | string | null;
  start?: string;
};

/**
 * Enhance-in animation that never leaves content stuck invisible.
 * Uses immediateRender:false so elements stay at natural CSS visibility
 * until the scroll trigger actually plays.
 */
export function animateIn(
  targets: gsap.TweenTarget,
  vars: AnimateInVars = {},
) {
  const { trigger, start = "top 88%", ...rest } = vars;
  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: 36, ...(rest as object) },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.08,
      immediateRender: false,
      overwrite: "auto",
      ...rest,
      scrollTrigger: {
        trigger: trigger || (Array.isArray(targets) ? undefined : (targets as Element)),
        start,
        once: true,
        ...(typeof rest.scrollTrigger === "object" ? rest.scrollTrigger : {}),
      },
    },
  );
}

export function refreshScrollTriggers(delayMs = 100) {
  const run = () => ScrollTrigger.refresh();
  run();
  window.setTimeout(run, delayMs);
  window.setTimeout(run, delayMs + 400);
  window.addEventListener("load", run, { once: true });
  if (document.fonts?.ready) {
    document.fonts.ready.then(run).catch(() => undefined);
  }
}
