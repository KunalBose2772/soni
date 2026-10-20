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
  ArrowLeft,
} from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { siteAssets } from "@/lib/site-assets";

const steps = [
  {
    no: "01",
    shortTitle: "Survey",
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
    shortTitle: "Packing",
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
    shortTitle: "Transit",
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
    shortTitle: "Delivery",
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-6 sm:mb-8">
          <SectionHeader
            align="left"
            title="How We Handle Your Move"
            highlight="Step by Step"
            description="From your first phone call to placing double beds and cupboards in your new rooms, here is our straightforward 4-step process."
            className="mb-0 max-w-2xl"
          />

          <Link
            href="/#quote"
            className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shrink-0 font-sans shadow-md shadow-brand/20 self-start sm:self-end"
          >
            <span>Start Your Move</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* =========================================================================
            DEDICATED MOBILE-OPTIMIZED PROCESS (lg:hidden)
            Interactive step pills + unified visual card + clear navigation
            ========================================================================= */}
        <div className="block lg:hidden">
          {/* Step Selector Segmented Pills */}
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/60 mb-4">
            {steps.map((step, idx) => {
              const isCurrent = activeStep === idx;
              return (
                <button
                  key={step.no}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`py-2 px-1 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                    isCurrent
                      ? "bg-brand text-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 bg-transparent font-medium"
                  }`}
                >
                  <span className={`text-[10px] font-mono tracking-wider ${isCurrent ? "text-white/80" : "text-slate-400"}`}>
                    {step.no}
                  </span>
                  <span className="text-xs font-heading font-bold truncate max-w-full">
                    {step.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Unified Mobile Step Card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm space-y-4">
            {/* Step Photo with Stage Overlay */}
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-100 shadow-inner">
              <img
                src={steps[activeStep].image}
                alt={steps[activeStep].title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold font-mono border border-white/20">
                Phase {steps[activeStep].no} of 04
              </div>
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <span className="text-xs font-bold font-heading line-clamp-1">
                  {steps[activeStep].title}
                </span>
              </div>
            </div>

            {/* Step Info */}
            <div>
              <h3 className="text-base font-bold font-heading text-slate-950 mb-1.5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-brand text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {steps[activeStep].no}
                </span>
                <span>{steps[activeStep].title}</span>
              </h3>
              <p className="text-xs text-slate-600 font-sans leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading block mb-1">
                Included in this step:
              </span>
              {steps[activeStep].checklist.map((pt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-slate-700 font-sans bg-slate-50/80 rounded-lg p-2 border border-slate-100"
                >
                  <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  <span className="font-medium">{pt}</span>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                disabled={activeStep === 0}
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                className="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 py-2.5 px-3.5 text-xs font-semibold font-sans transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} />
                <span>Prev</span>
              </button>

              {activeStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setActiveStep((prev) => Math.min(3, prev + 1))}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-3 text-xs font-bold font-heading transition-all cursor-pointer shadow-xs"
                >
                  <span>Next: {steps[activeStep + 1].shortTitle}</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <Link
                  href="/#quote"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand hover:bg-brand-red-hover text-white py-2.5 px-3 text-xs font-bold font-heading transition-all cursor-pointer shadow-md shadow-brand/20"
                >
                  <span>Get Shifting Quote</span>
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP 2-COLUMN VIEW (hidden lg:grid)
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Step Cards */}
          <div className="lg:col-span-7 space-y-3">
            {steps.map((step, idx) => {
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
