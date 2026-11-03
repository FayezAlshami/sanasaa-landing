"use client";

import MagneticButton from "../ui/MagneticButton";
import TextReveal from "../ui/TextReveal";
import { SITE } from "@/lib/constants";

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="container-narrow text-center">
        <p className="mb-3 text-sm font-bold text-gold">تواصل معنا</p>
        <TextReveal className="mb-4 text-3xl font-black md:text-5xl">نحن قريبون منك</TextReveal>
        <p className="mx-auto mb-10 max-w-xl text-muted">
          للاستفسار عن بطاقات الشحن، التسجيل، أو الشراكة مع مكتبات ونقاط بيع.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href={SITE.whatsapp}
            className="bg-[#25D366] text-navy-deep hover:brightness-110"
          >
            واتساب (Placeholder)
          </MagneticButton>
          <MagneticButton
            href={SITE.telegram}
            className="bg-[#2AABEE] text-navy-deep hover:brightness-110"
          >
            تلغرام (Placeholder)
          </MagneticButton>
          <MagneticButton
            href={`mailto:${SITE.email}`}
            className="border border-gold/40 text-cream hover:border-gold hover:text-gold"
          >
            {SITE.email}
          </MagneticButton>
        </div>
        <p className="mt-6 text-xs text-muted">أرقام وروابط التواصل مؤقتة للعرض وسيتم استبدالها بالقنوات الرسمية.</p>
      </div>
    </section>
  );
}
