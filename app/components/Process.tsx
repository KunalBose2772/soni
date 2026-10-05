"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardCheck,
  Package,
  Truck,
  Home,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { siteAssets } from "@/lib/site-assets";

const steps = [
  {
    no: "01",
    icon: ClipboardCheck,
    title: "Free Survey & Clear Quotation",
    desc: "Share your list of items by phone or request a free home visit in Ranchi. We inspect the goods and give you a fixed written quote with zero hidden charges.",
    checklist: [
      "Clear item checklist",
      "Fixed written quotation",
      "Confirmed shifting date",
    ],
    image: siteAssets.sections.process.packingInAction,
  },
  {
    no: "02",
    icon: Package,
    title: "Safe Multi-Layer Packing",
    desc: "Our crew arrives on moving day with bubble wrap, foam rolls, corrugated sheets, and heavy carton boxes. Electronics and fragile items get double protection.",
    checklist: [
      "Bubble wrap for TV & glass",
      "Stretch film for sofas & beds",
      "Labeled boxes for easy unboxing",
    ],
    image: siteAssets.sections.process.securePacking,
  },
  {
    no: "03",
    icon: Truck,
    title: "Loading & Container Transport",
    desc: "Belongings are carefully loaded and tied inside a closed container truck so rain, dust, and jerks do not harm anything during the journey.",
    checklist: [
      "Closed weatherproof container truck",
      "Careful stacking & rope fastening",
      "Direct phone coordination on transit",
    ],
    image: siteAssets.sections.process.teamCoordination,
  },
  {
    no: "04",
    icon: Home,
    title: "Unloading & Furniture Placement",
    desc: "At your destination, our staff unloads every carton, places heavy beds and cupboards into their respective rooms, and assists with reassembly.",
    checklist: [
      "Room-by-room box delivery",
      "Double bed & cupboard reassembly",
      "Final check before leaving",
    ],
    image: siteAssets.sections.process.packingInAction,
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-spacing bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            title="How We Handle Your Move"
            highlight="Step by Step"
            description="From your first phone call to placing double beds and cupboards in your new rooms, here is our straightforward 4-step process."
            className="mb-0 max-w-2xl"
          />

          <Link
            href="/#quote"
            className="btn-brand-primary hidden sm:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shrink-0 font-sans shadow-none self-start lg:self-end"
          >
            <span>Start Your Move</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Interactive Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-7 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.no}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-white border-brand shadow-sm ring-1 ring-brand/20"
                      : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number Circle */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-heading shrink-0 transition-colors ${
                        isActive
                          ? "bg-brand text-white shadow-xs"
                          : "bg-slate-100 text-slate-700 group-hover:bg-brand-light group-hover:text-brand"
                      }`}
                    >
                      {step.no}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-slate-950 font-heading leading-tight mb-1">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed mb-2">
                        {step.desc}
                      </p>

                      {/* Checklist visible on active step */}
                      {isActive && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2.5 border-t border-slate-100">
                          {step.checklist.map((pt, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 font-sans">
                              <CheckCircle2 size={12} className="text-brand shrink-0" />
                              <span className="truncate">{pt}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Spotlight */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-lg group">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Floating Stage Label */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-base font-bold font-heading leading-tight mb-0.5">
                  Step {steps[activeStep].no}: {steps[activeStep].title}
                </p>
                <p className="text-xs text-slate-300 font-sans">
                  Sony Packers and Movers Moving Process
                </p>
              </div>
            </div>

            {/* Dotted Accent Indicator */}
            <div className="flex items-center justify-center gap-2 mt-3.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeStep ? "w-7 bg-brand" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Switch to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
