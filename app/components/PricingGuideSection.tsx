"use client";

import { useState } from "react";
import { ArrowRight, Check, HelpCircle, ShieldCheck } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { useQuoteModal } from "./QuoteModalContext";

type PricingItem = {
  service: string;
  packingCost: string;
  transportCost: string;
  totalEstimate: string;
  idealFor: string;
};

const localRates: PricingItem[] = [
  {
    service: "1 BHK Household",
    packingCost: "₹1,500 – ₹2,500",
    transportCost: "₹2,500 – ₹4,000",
    totalEstimate: "₹4,000 – ₹6,500",
    idealFor: "Singles or couples with essential furniture & appliances",
  },
  {
    service: "2 BHK Household",
    packingCost: "₹2,500 – ₹4,500",
    transportCost: "₹4,000 – ₹6,500",
    totalEstimate: "₹6,500 – ₹11,000",
    idealFor: "Small families with complete living, dining, & bed sets",
  },
  {
    service: "3 BHK Household",
    packingCost: "₹4,000 – ₹7,000",
    transportCost: "₹6,000 – ₹10,000",
    totalEstimate: "₹10,000 – ₹17,000",
    idealFor: "Large families with multiple wardrobes & delicate items",
  },
  {
    service: "Two-Wheeler (Bike/Scooter)",
    packingCost: "₹500 – ₹800",
    transportCost: "₹1,000 – ₹1,800",
    totalEstimate: "₹1,500 – ₹2,600",
    idealFor: "Doorstep pickup & drop with protective wrapping",
  },
];

const intercityRates: PricingItem[] = [
  {
    service: "Ranchi ➔ Patna",
    packingCost: "₹3,000 – ₹5,000",
    transportCost: "₹8,000 – ₹14,000",
    totalEstimate: "₹11,000 – ₹19,000",
    idealFor: "Direct container transit within 1-2 days",
  },
  {
    service: "Ranchi ➔ Kolkata",
    packingCost: "₹3,500 – ₹6,000",
    transportCost: "₹10,000 – ₹16,000",
    totalEstimate: "₹13,500 – ₹22,000",
    idealFor: "Direct container transit within 1-2 days",
  },
  {
    service: "Ranchi ➔ Delhi NCR",
    packingCost: "₹4,500 – ₹8,000",
    transportCost: "₹18,000 – ₹28,000",
    totalEstimate: "₹22,500 – ₹36,000",
    idealFor: "Dedicated interstate container within 3-4 days",
  },
  {
    service: "Ranchi ➔ Bangalore",
    packingCost: "₹5,000 – ₹9,000",
    transportCost: "₹24,000 – ₹38,000",
    totalEstimate: "₹29,000 – ₹47,000",
    idealFor: "Long-distance multi-layer packing within 4-5 days",
  },
];

export default function PricingGuideSection() {
  const [activeTab, setActiveTab] = useState<"local" | "intercity">("local");
  const { openQuoteModal } = useQuoteModal();

  const rates = activeTab === "local" ? localRates : intercityRates;

  return (
    <section className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            title="Estimated Shifting Rates in"
            highlight="Ranchi & Across India"
            description="Realistic price chart for household and vehicle shifting so you can plan your budget without any guesswork."
            className="mb-0 max-w-2xl"
          />

          {/* Rate Selector Tab */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-full border border-slate-200 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setActiveTab("local")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
                activeTab === "local"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Local Shifting (Ranchi)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("intercity")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer font-sans ${
                activeTab === "intercity"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Intercity Routes
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {rates.map((item, idx) => (
            <div
              key={item.service}
              className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-xs hover:shadow-md transition-all duration-200 relative ${
                idx === 1
                  ? "border-brand/40 ring-1 ring-brand/20"
                  : "border-slate-200/90 hover:border-slate-350"
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-brand text-white text-[10px] font-bold font-heading tracking-wide uppercase shadow-xs">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-base font-bold font-heading text-slate-950 mb-1">
                  {item.service}
                </h3>
                <p className="text-xs text-slate-500 font-sans mb-4 min-h-[32px]">
                  {item.idealFor}
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs font-sans">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Packing Material</span>
                    <span className="font-semibold text-slate-800">{item.packingCost}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Transport &amp; Labor</span>
                    <span className="font-semibold text-slate-800">{item.transportCost}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading block">
                    Estimated Range
                  </span>
                  <p className="text-lg font-extrabold font-heading text-slate-950 mt-0.5">
                    {item.totalEstimate}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openQuoteModal()}
                className="mt-5 w-full bg-brand hover:bg-brand-red-hover text-white inline-flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs sm:text-sm font-bold font-heading transition-all hover:-translate-y-0.5 shadow-md shadow-brand/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Check Exact Price</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* SEO Note & Price Lock Guarantee */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-900 font-heading">
                100% Fixed Written Price Guarantee
              </p>
              <p className="text-xs text-slate-600 font-sans mt-0.5 leading-relaxed">
                Prices depend on floor level, lift availability, and fragile items. Once our surveyor confirms the quotation in writing, the price is 100% locked.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => openQuoteModal()}
            className="btn-brand-primary w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold font-sans transition-all hover:-translate-y-0.5 cursor-pointer shadow-xs"
          >
            <span>Request Fixed Quote</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}
