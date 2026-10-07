"use client";

import { ShieldCheck, Clock, CheckCircle2, PhoneCall } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import QuoteForm from "./QuoteForm";
import { companyInfo } from "@/lib/company-info";

export default function QuickLeadSection() {
  return (
    <section id="quote" className="section-spacing bg-slate-50/70 border-b border-slate-100 relative">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & Direct Assistance */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionHeader
                align="left"
                title="Get a Quick"
                highlight="Moving Quote"
                description="Tell us your shifting requirements. We will give you a clear, honest estimate including packing, loading, and safe transport."
                className="mb-6 max-w-xl"
              />

              {/* Direct Phone Assistance Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs mb-6">
                <h4 className="text-sm font-bold font-heading text-slate-950 mb-1">
                  Want to discuss your move directly?
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed mb-4">
                  Call our Ranchi branch directly to discuss your household goods, vehicle shifting, or preferred moving date.
                </p>

                <a
                  href={companyInfo.telLink}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 text-xs font-semibold font-sans transition-all hover:-translate-y-0.5 shadow-xs"
                >
                  <PhoneCall size={13} className="text-brand" />
                  <span>Call {companyInfo.formattedPhone}</span>
                </a>
              </div>

              {/* 3 Trust Points */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs font-medium font-sans text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={15} />
                  </div>
                  <span>Fixed Written Quotation — No surprise charges when goods arrive</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium font-sans text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-brand-light text-brand flex items-center justify-center shrink-0">
                    <Clock size={15} />
                  </div>
                  <span>Quick Callback — Our Ranchi team contacts you within 15 minutes</span>
                </div>

                <div className="flex items-center gap-3 text-xs font-medium font-sans text-slate-700">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={15} />
                  </div>
                  <span>Free Home Inspection — Available across Ranchi and nearby areas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Lead Generation Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-slate-950">
                    Request Shifting Quote
                  </h3>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    For local shifting in Ranchi or moving to any city in India
                  </p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold font-heading">
                  Zero Cost Estimate
                </span>
              </div>

              {/* Form Component */}
              <QuoteForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
