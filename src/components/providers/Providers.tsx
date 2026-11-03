"use client";

import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "../ui/ScrollProgress";
import IntroLoader from "../ui/IntroLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <IntroLoader />
      <ScrollProgress />
      <div className="grain" aria-hidden />
      {children}
    </SmoothScroll>
  );
}
