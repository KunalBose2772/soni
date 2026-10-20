"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, currentScroll / totalScroll)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Circumference of circular progress (2 * PI * r) where r = 18
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - scrollProgress * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-5 sm:right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/[0.12] text-white hover:text-brand shadow-[0_8px_30px_rgb(0,0,0,0.35)] transition-all duration-300 group cursor-pointer focus:outline-none ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-90 translate-y-3 pointer-events-none"
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Subtle Hover Glow Backdrop */}
      <div className="absolute inset-0 rounded-full bg-brand/0 group-hover:bg-brand/10 transition-colors duration-300 pointer-events-none" />

      {/* Circular Progress SVG */}
      <svg className="absolute w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 44 44">
        {/* Track Circle (Muted White) */}
        <circle
          className="text-white/10"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="transparent"
          r="18"
          cx="22"
          cy="22"
        />
        {/* Progress Circle (Brand Red) */}
        <circle
          className="text-brand transition-all duration-100"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="transparent"
          r="18"
          cx="22"
          cy="22"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>

      {/* Up Arrow Icon */}
      <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 relative z-10" />
    </button>
  );
}
