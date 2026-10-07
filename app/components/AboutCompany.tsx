"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  PackageCheck,
  Clock,
  ArrowRight,
  PhoneCall,
  Star,
} from "lucide-react";
import { companyInfo } from "@/lib/company-info";

const keyHighlights = [
  {
    icon: PackageCheck,
    title: "Safe Multi-Layer Packing",
    desc: "Quality bubble wrap, corrugated sheets, and foam padding to protect glass, electronics, and furniture.",
  },
  {
    icon: Truck,
    title: "Dedicated Container Trucks",
    desc: "Weatherproof container vehicles running directly from Ratu Road, Ranchi to destinations across India.",
  },
  {
    icon: Clock,
    title: "Punctual Delivery Timelines",
    desc: "We pick up and deliver on the committed schedule with direct phone updates from our move supervisor.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Written Estimates",
    desc: "Complete cost breakup with no surprise charges, labour disputes, or hidden fees on delivery day.",
  },
];

export default function AboutCompany() {
  return (
    <section className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Clean Heading, Story Copy, 4 Features, CTAs
              ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Standardized Dual-Colored Sora Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl xl:text-[40px] font-extrabold font-heading text-slate-950 leading-[1.2] tracking-tight mb-4">
              Dependable Packers &amp; Movers in{" "}
              <span className="text-brand">Ranchi &amp; Across India</span>
            </h2>

            {/* Descriptive Content in Montserrat */}
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-6">
              Based at{" "}
              <strong className="text-slate-900 font-semibold">
                Ratu Road, Ranchi
              </strong>
              , Sony Packers and Movers has been helping families and businesses move safely for over a decade. Whether you are moving a 1 BHK flat within Ranchi or shifting your entire home and car to Patna, Kolkata, Delhi, or Bangalore, our own trained crew handles every item with personal care.
            </p>

            {/* 4 Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
              {keyHighlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-slate-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} strokeWidth={2.2} />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-950 font-heading leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons: Unified Rounded-Full */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/#quote"
                className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans text-center"
              >
                <span>Get Instant Quote</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href={companyInfo.telLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-950 text-slate-800 hover:text-slate-950 bg-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans text-center"
              >
                <PhoneCall size={14} className="text-brand shrink-0" />
                <span>Call {companyInfo.formattedPhone}</span>
              </a>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Moving Team Image with Subtle Rating Badge
              ========================================================================= */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 group">
              <Image
                src="/assets/about/movers-team.jpg"
                alt="Sony Packers and Movers crew in Ranchi"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Social Proof Badge (Clean, Natural) */}
            <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-2 max-w-[calc(100%-1rem)] z-10 rounded-2xl bg-brand-primary text-white border border-blue-400/20 shadow-lg p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 shrink-0">
                <Star size={16} className="fill-slate-950 text-slate-950" />
              </div>
              <div>
                <p className="text-xs font-bold text-white font-heading leading-tight">
                  4.7 / 5 on Google
                </p>
                <p className="text-[10px] text-blue-100 font-sans leading-tight mt-0.5">
                  136+ Verified Customer Reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}