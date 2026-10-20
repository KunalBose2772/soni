"use client";

import { Check, Sparkles } from "lucide-react";
import { useInView } from "./useInView";

type ServiceBookingSectionProps = {
  title: string;
  leftLabel: string;
  leftItems: string[];
  rightLabel: string;
  rightItems: string[];
};

export default function ServiceBookingSection({
  title,
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
}: ServiceBookingSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="section-spacing bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Shifting Scope / Inclusions */}
          <div
            className={`lg:col-span-6 flex flex-col justify-between rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2.5 py-1 rounded-full w-fit">
                Service Scope & Execution
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-heading text-slate-950 leading-tight mt-3 mb-2">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-6">
                {leftLabel}
              </p>

              <div className="space-y-3">
                {leftItems.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-slate-800 transition-all hover:bg-white hover:border-slate-300"
                    style={{ transitionDelay: `${150 + idx * 70}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <span className="text-[11px] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Why Book with Sony Packers */}
          <div
            className={`lg:col-span-6 flex flex-col justify-between rounded-3xl bg-brand-primary text-white border border-blue-400/20 p-6 sm:p-8 shadow-xl transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
            }`}
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-blue-300 mb-3 backdrop-blur-sm">
                <Sparkles size={12} className="text-blue-300" />
                <span>Verified Moving Advantage</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-tight mb-2">
                Why Book with Sony Packers and Movers?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-6">
                {rightLabel}
              </p>

              <div className="space-y-3">
                {rightItems.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 text-slate-200 transition-all hover:bg-white/10 hover:border-blue-400/30"
                    style={{ transitionDelay: `${200 + idx * 70}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <p className="text-xs sm:text-sm font-sans leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
