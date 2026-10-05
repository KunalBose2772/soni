"use client";

import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";
import { useInView } from "./useInView";
import { services } from "./serviceData";
import SectionHeader from "./ui/SectionHeader";

export default function Services() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="bg-slate-50/70 section-spacing border-y border-slate-200/60">
      <div className="site-container">
        {/* Standardized Dual-Colored Heading */}
        <SectionHeader
          title="Shifting Services We Offer in"
          highlight="Ranchi & Pan India"
          description="From packing a 1 BHK apartment to moving corporate offices, cars, and bikes — here is how we can help you move safely."
          align="center"
        />

        {/* 6-Card Services Grid with Rounded Squircles & Smooth Micro-Interactions */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={`/services/${item.slug}`}
                className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-350 hover:shadow-md ${
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${120 + idx * 70}ms` }}
              >
                <div>
                  {/* Top Row: Squircle Icon + Subtle Arrow */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-xs transition-transform duration-300 group-hover:scale-105 ${item.accent}`}
                    >
                      <Icon size={22} />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 group-hover:bg-brand-light group-hover:text-brand transition-colors">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title in Sora */}
                  <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description in Montserrat */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Expanding Brand Line */}
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 font-sans group-hover:text-brand transition-colors">
                    View Details
                  </span>
                  <div className="h-1 w-8 rounded-full bg-slate-200 group-hover:w-14 group-hover:bg-brand transition-all duration-300" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Action Button */}
        <div className="mt-8 text-center">
          <Link
            href="/services/household"
            className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans"
          >
            <span>View All Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
