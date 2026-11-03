import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { withBase } from "@/lib/basePath";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "سنسعى | منصة التعليم الثانوي",
  description:
    "منصة سنسعى للتعليم الثانوي في سوريا: دروس فيديو، امتحانات ذكية، نقاط ومكافآت، ومتصدرين لطلاب البكالوريا وأولياء الأمور.",
  metadataBase: new URL("https://sanasaa.app"),
  openGraph: {
    title: "سنسعى | منصة التعليم الثانوي",
    description: "ادرس بثقة، تدرّب بذكاء، وتفوّق في البكالوريا مع سنسعى.",
    locale: "ar_SY",
    type: "website",
    images: [withBase("/brand/logo.png")],
  },
  icons: {
    icon: withBase("/brand/logo.png"),
    apple: withBase("/brand/logo.png"),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full bg-navy-deep font-sans text-cream">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
