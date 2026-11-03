"use client";

import { FAQS } from "@/lib/constants";
import FAQAccordion from "../ui/FAQAccordion";
import TextReveal from "../ui/TextReveal";

export default function FAQ() {
  return (
    <section id="faq" className="section-pad">
      <div className="container-narrow">
        <p className="mb-3 text-sm font-bold text-gold">أسئلة شائعة</p>
        <TextReveal className="mb-10 text-3xl font-black md:text-5xl">جاوبناك قبل ما تسأل</TextReveal>
        <FAQAccordion items={FAQS} />
      </div>
    </section>
  );
}
