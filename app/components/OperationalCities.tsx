"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Building2, Globe2 } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import type { OperationalCity } from "@/lib/operational-cities";

type OperationalCitiesProps = {
  title?: string;
  subtitle?: string;
  cities: OperationalCity[];
};

export default function OperationalCities({
  title = "Operational Cities &",
  subtitle = "Direct daily transport connecting Jharkhand, Bihar, and all major cities across India.",
  cities,
}: OperationalCitiesProps) {
  const [activeTab, setActiveTab] = useState<"jharkhand" | "bihar" | "panIndia">("jharkhand");

  // Separate into regional groups
  const jharkhandCities = cities.filter(
    (c) =>
      c.href.includes("jharkhand") ||
      ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Ramgarh", "Giridih"].includes(c.name)
  );

  const biharCities = cities.filter(
    (c) =>
      c.href.includes("bihar") ||
      ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Begusarai"].includes(c.name)
  );

  const panIndiaCities = cities.filter(
    (c) => !c.href.includes("jharkhand") && !c.href.includes("bihar")
  );

  const displayedCities =
    activeTab === "jharkhand"
      ? jharkhandCities.slice(0, 8)
      : activeTab === "bihar"
      ? biharCities.slice(0, 8)
      : (panIndiaCities.length > 0 ? panIndiaCities : cities).slice(0, 8);

  return (
    <section className="section-spacing bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            title="Cities We Serve in"
            highlight="Jharkhand, Bihar & India"
            description={subtitle}
            className="mb-0 max-w-2xl"
          />

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-slate-200 shadow-xs self-start lg:self-end max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("jharkhand")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "jharkhand"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Jharkhand
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bihar")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "bihar"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bihar
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("panIndia")}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === "panIndia"
                  ? "bg-brand text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Major Metro Cities
            </button>
          </div>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {displayedCities.map((city) => (
            <Link
              key={city.slug}
              href={city.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-200"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-brand-light text-brand group-hover:bg-brand group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-heading">
                    Pincode {city.pincode}
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand transition-colors truncate font-heading">
                    {city.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans truncate">
                    Service Branch
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-slate-50 group-hover:bg-brand-light text-slate-400 group-hover:text-brand flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Region State Discovery Footer Links */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-4 border-t border-slate-200/80">
          <Link
            href="/packers-movers-jharkhand"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-900 bg-white text-slate-800 hover:text-slate-950 px-5 py-2.5 text-xs font-semibold transition-all"
          >
            <Building2 size={13} className="text-brand" />
            <span>All 24 Jharkhand District Hubs</span>
            <ArrowRight size={12} />
          </Link>
          <Link
            href="/packers-movers-bihar"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-900 bg-white text-slate-800 hover:text-slate-950 px-5 py-2.5 text-xs font-semibold transition-all"
          >
            <Globe2 size={13} className="text-brand" />
            <span>All 38 Bihar District Hubs</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
