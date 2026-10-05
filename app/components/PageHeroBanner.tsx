"use client";

import { useInView } from "./useInView";

type PageHeroBannerProps = {
  title: string;
  subtitle: string;
  backgroundImage: string;
  breadcrumb?: string;
  heightClassName?: string;
};

export default function PageHeroBanner({
  title,
  subtitle,
  backgroundImage,
  breadcrumb,
  heightClassName = "min-h-[50vh] sm:min-h-[60vh]",
}: PageHeroBannerProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className={`relative overflow-hidden bg-slate-950 flex items-center ${heightClassName}`}>
      {/* Background Image with Dark Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: backgroundImage ? `url("${encodeURI(backgroundImage)}")` : undefined }}
      />
      <div className="pointer-events-none absolute inset-0 bg-slate-950/75" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      {/* Ambient Red Glow */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 site-container py-14 sm:py-16">
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
          }`}
        >
          {breadcrumb ? (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              <span>{breadcrumb}</span>
            </div>
          ) : null}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white leading-tight tracking-tight">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-sans leading-relaxed text-slate-300">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
