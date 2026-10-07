"use client";

import { MapPin, Globe2, ShieldCheck } from "lucide-react";
import { useInView } from "./useInView";

type ServiceCoverageSectionProps = {
  heading: string;
  intro: string;
  local: string[];
  intercity: string[];
  promise: string;
};

export default function ServiceCoverageSection({
  heading,
  intro,
  local,
  intercity,
  promise,
}: ServiceCoverageSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Box: Where We Operate */}
          <div
            className={`lg:col-span-7 rounded-3xl bg-brand-primary p-6 sm:p-8 text-white shadow-xl border border-blue-400/25 transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-3">
              <Globe2 size={12} />
              <span>Operational Coverage</span>
            </span>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading leading-tight mb-2">
              {heading}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 font-sans leading-relaxed mb-6">
              {intro}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {local.map((city, idx) => (
                <div
                  key={city}
                  className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-xs font-sans text-slate-200 backdrop-blur-xs hover:border-blue-400/40 hover:bg-white/10 transition-all"
                  style={{ transitionDelay: `${150 + idx * 50}ms` }}
                >
                  <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center shrink-0">
                    <MapPin size={12} />
                  </span>
                  <span className="font-medium truncate">{city}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Box: Coverage Snapshot & Quality Promise */}
          <div
            className={`lg:col-span-5 rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-xs transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-950 mb-2">
              Route Coverage Snapshot
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-5">
              From local Ranchi neighborhoods to nationwide interstate logistics, we maintain the highest standard of safety and punctuality.
            </p>

            <div className="space-y-3.5">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 font-heading">
                  Local Shifting Coverage
                </p>
                <p className="mt-1 text-xs text-slate-700 font-sans leading-relaxed">
                  {local.join(", ")}.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-xs">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 font-heading">
                  Intercity Highway Routes
                </p>
                <p className="mt-1 text-xs text-slate-700 font-sans leading-relaxed">
                  {intercity.join(", ")}.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-primary-dark text-white p-4 border border-blue-400/20">
                <div className="flex items-center gap-1.5 text-blue-300 mb-1">
                  <ShieldCheck size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-wider font-heading">
                    Quality Promise
                  </p>
                </div>
                <p className="text-xs text-blue-100 font-sans leading-relaxed">
                  {promise}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
