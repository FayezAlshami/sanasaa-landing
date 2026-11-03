"use client";

import Image from "next/image";
import { NAV, SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-navy-deep section-pad !py-12">
      <div className="container-wide grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo-white.svg" alt="سنسعى" width={140} height={70} className="h-12 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{SITE.description}</p>
        </div>
        <div>
          <p className="mb-4 font-bold text-gold">روابط</p>
          <ul className="space-y-2 text-sm text-cream/75">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-bold text-gold">تواصل</p>
          <ul className="space-y-2 text-sm text-cream/75">
            <li>
              <a href={SITE.whatsapp} className="hover:text-gold">
                واتساب
              </a>
            </li>
            <li>
              <a href={SITE.telegram} className="hover:text-gold">
                تلغرام
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-gold">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-wide mt-10 flex flex-col items-center justify-between gap-3 border-t border-gold/10 pt-6 text-xs text-muted md:flex-row">
        <p>© {new Date().getFullYear()} سنسعى — جميع الحقوق محفوظة</p>
        <p dir="ltr">Sanasaa · Syrian Secondary Education Platform</p>
      </div>
    </footer>
  );
}
