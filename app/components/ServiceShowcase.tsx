"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { useInView } from "./useInView";
import { defaultServiceSlug, getServiceBySlug, services } from "./serviceData";
import SectionHeader from "./ui/SectionHeader";

type ServiceShowcaseProps = {
  activeSlug?: string;
};

export default function ServiceShowcase({ activeSlug = defaultServiceSlug }: ServiceShowcaseProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [activeSlide, setActiveSlide] = useState(0);
  const activeService = getServiceBySlug(activeSlug) ?? getServiceBySlug(defaultServiceSlug) ?? services[0];
  const showcaseImages = useMemo(() => activeService.faqImages.slice(0, 3), [activeService]);

  useEffect(() => {
    if (showcaseImages.length <= 1) {
      return;
    }

    const id = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % showcaseImages.length);
    }, 3500);

    return () => window.clearInterval(id);
  }, [showcaseImages.length]);

  return (
    <section ref={ref} className="section-spacing bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        {/* Section Header */}
        <SectionHeader
          badge="Relocation Portfolio"
          badgeIcon={Sparkles}
          title="Explore Our Comprehensive"
          highlight="Moving Services"
          description="Select any service category to inspect vehicle fleet details, multi-layer packing specifications, and direct route pricing."
          align="center"
        />

        {/* 6 Category Tiles */}
        <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-10">
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isActive = service.slug === activeService.slug;

            return (
              <Link
                key={service.title}
                href={`/services/${service.slug}`}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                  isActive
                    ? "border-red-500/80 bg-slate-950 text-white shadow-lg ring-1 ring-red-500/30"
                    : "border-slate-200/90 bg-white text-slate-900 hover:-translate-y-1 hover:border-red-300 hover:shadow-md"
                } ${isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: `${100 + idx * 60}ms` }}
              >
                <div
                  className={`mb-3.5 inline-flex rounded-xl p-2.5 transition-transform duration-300 ${
                    isActive ? "bg-red-600 text-white shadow-xs" : `${service.accent} text-white group-hover:scale-105`
                  }`}
                >
                  <Icon size={20} />
                </div>
                <p className="text-xs sm:text-sm font-bold font-heading leading-tight line-clamp-1">{service.shortTitle}</p>
                <div className={`mt-3 h-1 w-10 rounded-full transition-all duration-300 ${isActive ? "bg-red-500 w-14" : "bg-slate-200 group-hover:bg-red-400 group-hover:w-14"}`} />
              </Link>
            );
          })}
        </div>

        {/* Active Service Showcase Card */}
        <div
          className={`grid gap-8 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl transition-all duration-700 lg:grid-cols-12 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Left Column: Carousel Image Preview */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-2xl bg-slate-950 min-h-[300px] sm:min-h-[360px]">
            {showcaseImages.map((image, idx) => (
              <img
                key={`${image}-${idx}`}
                src={image}
                alt={`${activeService.title} preview ${idx + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                  idx === activeSlide ? "scale-100 opacity-100" : "scale-105 opacity-0 pointer-events-none"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            {/* Slider Dots */}
            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {showcaseImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide ? "w-6 bg-red-600" : "w-2 bg-white/70 hover:bg-white"
                  }`}
                  aria-label={`Show image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Service Deep Dive */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200/80 px-2.5 py-1 rounded-full w-fit mb-2">
              Verified Service Specifications
            </span>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-slate-950 leading-tight mb-3">
              {activeService.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
              {activeService.description}
            </p>

            {/* Service Highlights Checklist */}
            <div className="space-y-2.5 mb-7">
              {activeService.details.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5 transition-all hover:bg-red-50/20 hover:border-red-200/60"
                  style={{ transitionDelay: `${150 + idx * 80}ms` }}
                >
                  <CheckCircle2 size={16} className="text-red-600 shrink-0" strokeWidth={2.2} />
                  <span className="text-xs sm:text-[13px] font-medium font-sans text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="/#quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 hover:bg-red-700 text-white px-7 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-none font-sans"
              >
                <span>Book This Relocation Service</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
