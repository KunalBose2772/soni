"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { useInView } from "./useInView";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type PageHeroBannerProps = {
  title: string | ReactNode;
  subtitle: string;
  backgroundImage?: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
  breadcrumb?: string; // backwards compatibility
  heightClassName?: string;
  titleClassName?: string;
  centered?: boolean;
  actions?: ReactNode;
};

export default function PageHeroBanner({
  title,
  subtitle,
  backgroundImage,
  badge,
  breadcrumbs,
  breadcrumb,
  heightClassName,
  titleClassName,
  centered = false,
  actions,
}: PageHeroBannerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  // Normalize breadcrumb items for SEO & navigation
  const resolvedBreadcrumbs: BreadcrumbItem[] = breadcrumbs
    ? breadcrumbs
    : breadcrumb
    ? [
        { label: "Home", href: "/" },
        { label: breadcrumb },
      ]
    : [{ label: "Home", href: "/" }];

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden bg-slate-950 text-white ${
        heightClassName ?? "py-10 sm:py-14 lg:py-16"
      }`}
    >
      {/* Background Image with Dark Vignette & Royal Blue Tint */}
      {backgroundImage && (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ backgroundImage: `url("${encodeURI(backgroundImage)}")` }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      {/* Ambient Royal Blue & Brand Accents */}
      <div className="absolute -top-12 -left-12 w-96 h-96 bg-brand-primary/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 site-container">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            centered ? "mx-auto text-center" : ""
          } ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {/* SEO Structured Breadcrumbs Bar */}
          <nav
            aria-label="Breadcrumb"
            className={`mb-3.5 flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-medium text-slate-300 font-sans ${
              centered ? "justify-center" : "justify-start"
            }`}
          >
            {resolvedBreadcrumbs.map((crumb, idx) => {
              const isLast = idx === resolvedBreadcrumbs.length - 1;
              return (
                <div key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && (
                    <ChevronRight size={11} className="text-slate-300 shrink-0" />
                  )}
                  {crumb.href && !isLast ? (
                    <Link
                      href={crumb.href}
                      className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-semibold line-clamp-1">
                      {crumb.label}
                    </span>
                  )}
                </div>
              );
            })}

            {/* Optional Trust Micro-Badge */}
            {badge && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-brand-royal/40 border border-brand-royal-border/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                <Sparkles size={10} className="text-amber-400 shrink-0" />
                <span>{badge}</span>
              </span>
            )}
          </nav>

          {/* Heading - SEO optimized, compact on mobile, elegant on desktop */}
          <h1
            className={`font-extrabold font-heading text-white tracking-tight leading-snug sm:leading-tight ${
              titleClassName ?? "text-2xl sm:text-3xl lg:text-4xl"
            }`}
          >
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-2.5 sm:mt-3 max-w-2xl text-xs sm:text-sm lg:text-base font-sans leading-relaxed text-slate-300">
              {subtitle}
            </p>
          )}

          {/* Optional Action Buttons */}
          {actions && (
            <div
              className={`mt-4 sm:mt-5 flex flex-wrap items-center gap-3 ${
                centered ? "justify-center" : "justify-start"
              }`}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
