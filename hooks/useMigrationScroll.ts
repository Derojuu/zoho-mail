"use client";

import { useEffect, useState, type RefObject } from "react";

export function useMigrationScrollProgress(
  sectionRef: RefObject<HTMLElement | null>
): { activeStep: number; progressPercent: number } {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;

      if (totalScrollable <= 0) {
        setActiveStep(1);
        setProgressPercent(0);
        return;
      }

      const scrolled = -rect.top;
      const ratio = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setProgressPercent(Math.round(ratio * 100));

      if (ratio < 0.33) {
        setActiveStep(1);
      } else if (ratio < 0.66) {
        setActiveStep(2);
      } else {
        setActiveStep(3);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRef]);

  return { activeStep, progressPercent };
}
