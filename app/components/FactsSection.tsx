"use client";

import type { ComponentType, ReactNode } from "react";
import { ShieldCheck, Truck, Users2, Star } from "lucide-react";
import { useInView } from "./useInView";

export type FactItem = {
  value: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  tone: string;
};

type FactsSectionProps = {
  title?: ReactNode;
  intro?: string;
  facts?: FactItem[];
  eyebrow?: string;
};

export const defaultFacts: FactItem[] = [
  { value: "100+", label: "Verified Families Relocated", icon: Users2, tone: "bg-brand text-white" },
  { value: "4.7★", label: "Google Customer Rating", icon: Star, tone: "bg-amber-500 text-slate-950" },
  { value: "100%", label: "Damage-Free Delivery Record", icon: ShieldCheck, tone: "bg-emerald-600 text-white" },
  { value: "Pan-India", label: "Dedicated Highway Fleet", icon: Truck, tone: "bg-slate-900 text-white" },
];

export default function FactsSection({
  title = "Key Relocation Milestones & Trust Metrics",
  intro = "We keep every relocation simple, transparent, and completely stress-free. From multi-layer protective packaging in Ranchi to scheduled nationwide dispatch, our record speaks for itself.",
  facts = defaultFacts,
  eyebrow = "Proven Track Record",
}: FactsSectionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="section-spacing bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Ambient Decorative Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          {/* Left Column: Heading + Story */}
          <div
            className={`lg:col-span-5 transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-semibold text-brand mb-3.5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span>{eyebrow}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-white leading-tight tracking-tight mb-4">
              {title}
            </h2>

            <div className="h-1 w-20 rounded-full bg-brand mb-4" />

            <p className="text-slate-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
              {intro}
            </p>
          </div>

          {/* Right Column: 4 Stat Cards Grid */}
          <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
            {facts.map((item, idx) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.label}
                  className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 sm:p-6 transition-all duration-500 hover:bg-white/10 hover:border-red-500/30 hover:-translate-y-1 ${
                    isInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${120 + idx * 80}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${item.tone}`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight leading-none">
                        {item.value}
                      </p>
                      <p className="text-xs sm:text-[13px] font-sans text-slate-300 mt-1.5 leading-snug">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
