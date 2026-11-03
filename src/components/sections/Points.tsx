"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextReveal from "../ui/TextReveal";
import MagneticButton from "../ui/MagneticButton";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

export default function Points() {
  const root = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!root.current || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(card.current, {
        rotateY: -25,
        z: -120,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: card.current, start: "top 80%" },
      });
      gsap.to(".coin", {
        y: -16,
        rotation: 12,
        stagger: 0.15,
        yoyo: true,
        repeat: -1,
        duration: 2.2,
        ease: "sine.inOut",
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="points" ref={root} className="relative section-pad overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,165,42,0.08),transparent_60%)]" />
      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold text-gold">النقاط وبطاقات الشحن</p>
          <TextReveal className="mb-4 text-3xl font-black md:text-5xl">نقاطك مفتاحك للمحتوى</TextReveal>
          <p className="mb-6 max-w-lg text-muted leading-8">
            الأدمن يمنح نقاطاً، أو تشتري بطاقة شحن من نقطة بيع معتمدة وتدخل الكود داخل التطبيق.
            بعدها تفتح مادة أو فرع أو وحدة وتكمل دراستك.
          </p>
          <ul className="mb-8 space-y-3 text-sm md:text-base">
            {[
              "منح إداري مرن للطلاب",
              "بطاقات شحن (كود) من المكتبات ونقاط البيع",
              "شراء اشتراك مادة / فرع / وحدة",
              "قائمة متصدرين شهرية مع أوسمة",
            ].map((x) => (
              <li key={x} className="flex items-start gap-3">
                <span className="mt-1 text-gold">✦</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
          <MagneticButton href="#contact" className="bg-purple text-cream hover:bg-purple-light">
            اسأل عن بطاقات الشحن
          </MagneticButton>
        </div>

        <div ref={card} className="relative mx-auto w-full max-w-md perspective-[1000px]">
          <div className="coin absolute -top-4 start-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-navy-deep font-black glow-gold">
            ★
          </div>
          <div className="coin absolute top-10 end-4 grid h-10 w-10 place-items-center rounded-full bg-purple-light text-cream font-bold">
            +
          </div>
          <div className="glass relative overflow-hidden rounded-[2rem] border-gold/30 p-8 glow-gold">
            <div className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <p className="text-sm font-bold text-gold">بطاقة شحن سنسعى</p>
            <p className="mt-6 text-5xl font-black gradient-text">٥٠٠</p>
            <p className="text-muted">نقطة</p>
            <div className="mt-8 rounded-xl border border-dashed border-gold/30 bg-navy-deep/50 px-4 py-3 font-mono text-center tracking-[0.35em] text-gold">
              SANA-XXXX-XXXX
            </div>
            <p className="mt-6 text-xs text-muted">أدخل الكود من شاشة النقاط داخل التطبيق</p>
          </div>
        </div>
      </div>
    </section>
  );
}
