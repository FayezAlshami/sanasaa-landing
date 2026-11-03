"use client";

import SmoothScroll from "./SmoothScroll";
import CustomCursor from "../ui/CustomCursor";
import ScrollProgress from "../ui/ScrollProgress";
import IntroLoader from "../ui/IntroLoader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <IntroLoader />
      <ScrollProgress />
      <CustomCursor />
      <div className="grain" aria-hidden />
      {children}
    </SmoothScroll>
  );
}
