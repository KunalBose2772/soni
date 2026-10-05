"use client";

import { useEffect, useRef, useState } from "react";

type InViewOptions = IntersectionObserverInit & {
  once?: boolean;
};

export function useInView<T extends HTMLElement>(options: InViewOptions = {}) {
  const { once = true, root = null, rootMargin = "0px 0px -20% 0px", threshold = 0.2 } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsInView(false);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [once, root, rootMargin, threshold]);

  return { ref, isInView };
}
