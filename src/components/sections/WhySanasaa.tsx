"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../ui/TextReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

const POINTS = [
  {
    title: "مصمّمة للبكالوريا السورية",
    desc: "محتوى مرتب حسب المواد والفروع والوحدات — مو دروس عامة بلا سياق.",
  },
  {
    title: "توازن بين الطالب والأهل",
    desc: "الطالب يتقدّم بنفسه، والأهل يطمنّوا عبر أدوات واضحة بدون مراقبة خانقة.",
  },
  {
    title: "تحفيز حقيقي بالنقاط",
    desc: "نظام نقاط وبطاقات شحن وقائمة متصدرين يخلّي الدراسة عادة مش عبء.",
  },
];

export default function WhySanasaa() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".why-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          rotateY: i % 2 === 0 ? 12 : -12,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });

      gsap.to(".why-blob", {
        xPercent: 20,
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: root.current, scrub: true, start: "top bottom", end: "bottom top" },
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="why" ref={root} className="relative section-pad overflow-hidden">
      <div className="why-blob pointer-events-none absolute -start-20 top-10 h-72 w-72 rounded-full bg-purple/30 blur-[100px]" />
      <div className="why-blob pointer-events-none absolute -end-10 bottom-0 h-64 w-64 rounded-full bg-gold/20 blur-[90px]" />
      <div className="container-narrow relative">
        <p className="mb-3 text-sm font-bold text-gold">لماذا سنسعى؟</p>
        <TextReveal className="mb-4 text-3xl font-black md:text-5xl" mode="words">
          لأن الطريق للبكالوريا يحتاج رفيق أوضح
        </TextReveal>
        <p className="mb-12 max-w-2xl text-base leading-8 text-muted md:text-lg">
          مو تطبيق دروس فقط — منظومة تساعدك تدرس بتركيز، تتدرّب بثقة، وتكافئ نفسك على كل خطوة.
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {POINTS.map((p) => (
            <article key={p.title} className="why-card glass rounded-3xl p-6 md:p-7">
              <div className="mb-5 h-1.5 w-14 rounded-full bg-gradient-to-l from-gold to-purple" />
              <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
              <p className="text-sm leading-7 text-muted md:text-base">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
