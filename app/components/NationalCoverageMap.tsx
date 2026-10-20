"use client";

import { MapPin, Phone, ArrowRight, ExternalLink } from "lucide-react";
import { useInView } from "./useInView";
import { companyInfo } from "@/lib/company-info";
import SectionHeader from "./ui/SectionHeader";

const keyRoutes = [
  { from: "Ranchi", to: "Delhi NCR", duration: "3-4 Days" },
  { from: "Ranchi", to: "Bangalore", duration: "4-5 Days" },
  { from: "Ranchi", to: "Kolkata", duration: "1-2 Days" },
  { from: "Ranchi", to: "Mumbai / Pune", duration: "3-4 Days" },
  { from: "Ranchi", to: "Patna", duration: "1-2 Days" },
];

export default function NationalCoverageMap() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="section-spacing bg-slate-50/70 border-b border-slate-100">
      <div className="site-container">
        {/* Subtle, human-written header */}
        <SectionHeader
          title="Serving Ranchi &"
          highlight="Destinations Across India"
          description="From our office on Ratu Road, Ranchi, we handle daily local relocations across Jharkhand as well as scheduled intercity moves nationwide."
          align="center"
        />

        {/* Clean 2-column layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Left Column: Office & Routes */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between space-y-5 transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
            }`}
          >
            {/* Office Info Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-light text-brand flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950 font-heading">
                    Ranchi Office
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    Anmol Plaza, Ratu Road
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                {companyInfo.address.full}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-sans text-slate-600 border-t border-slate-100 pt-3.5">
                <a
                  href={companyInfo.telLink}
                  className="flex items-center gap-1.5 font-semibold text-slate-900 hover:text-brand transition-colors"
                >
                  <Phone size={13} className="text-brand" />
                  <span>{companyInfo.formattedPhone}</span>
                </a>
                <span className="text-slate-400">•</span>
                <span className="text-slate-600">Open 24x7</span>
              </div>
            </div>

            {/* Popular Routes Panel */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-heading mb-3">
                  Frequent Direct Routes
                </h4>
                <div className="space-y-2">
                  {keyRoutes.map((route, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2 text-xs font-medium font-sans text-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-600">{route.from}</span>
                        <ArrowRight size={11} className="text-brand" />
                        <span className="text-slate-950 font-semibold">{route.to}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full">
                        {route.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-sans mt-3">
                Need shifting to another city? Call our team for custom route estimates.
              </p>
            </div>
          </div>

          {/* Right Column: Clean Map */}
          <div
            className={`lg:col-span-7 flex flex-col transition-all duration-700 ${
              isInView ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
            }`}
          >
            <div className="relative flex-1 min-h-[380px] sm:min-h-[420px] rounded-3xl border border-slate-200/90 bg-white p-2 sm:p-2.5 shadow-md overflow-hidden">
              <iframe
                title="Sony Packers and Movers Ranchi Location"
                src={companyInfo.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "1rem" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px] rounded-2xl"
              />

              {/* Simple subtle map action button */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={companyInfo.gmb.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md transition-colors shadow-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
