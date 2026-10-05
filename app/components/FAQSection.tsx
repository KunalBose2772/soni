"use client";

import { useState } from "react";
import { ChevronDown, PhoneCall, MessageCircle } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { companyInfo } from "@/lib/company-info";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  images?: string[];
};

const defaultFaqs: FAQItem[] = [
  {
    question: "How many days in advance should I book my move?",
    answer:
      "For local shifting within Ranchi, 1 to 2 days prior notice is usually enough. For moving to other cities like Patna, Kolkata, Delhi, or Bangalore, we recommend booking 3 to 5 days ahead so we can reserve a dedicated container truck for your date. For urgent moves, call us directly at +91 9835983331.",
  },
  {
    question: "Do you provide packing materials and labour?",
    answer:
      "Yes, we bring all packing supplies — bubble wrap, corrugated sheets, foam rolls, heavy cartons, and tape. Our own trained staff takes care of dismantling double beds, packing, loading, transport, unloading, and reassembly.",
  },
  {
    question: "Will there be any extra or hidden charges on moving day?",
    answer:
      "No. We provide a clear written estimate before the move starts. The quote includes packing material, labour, truck freight, and unloading. You will not face unexpected extra demands on delivery day.",
  },
  {
    question: "How do you protect fragile items like LED TV, fridge, and glassware?",
    answer:
      "Fragile items get multi-layer protection: first a soft foam wrap, followed by thick bubble wrap, corner guards, and sturdy cartons marked 'FRAGILE' so our crew handles them with extra care.",
  },
  {
    question: "Can I transport my bike or car along with household goods?",
    answer:
      "Yes. Two-wheelers and cars are inspected, mirrors and headlamps wrapped with protective foam, and securely fastened inside closed container carriers to prevent scratches or transit damage.",
  },
  {
    question: "Is transit insurance available for long-distance shifting?",
    answer:
      "Yes. For intercity moves across India, we arrange full transit insurance for household goods and vehicles for complete peace of mind.",
  },
];

export default function FAQSection({
  title = "Frequently Asked",
  subtitle = "Simple answers to common questions about shifting costs, packing materials, vehicle transport, and schedules.",
  faqs = defaultFaqs,
}: FAQSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading + Direct Contact Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <SectionHeader
                align="left"
                title={title}
                highlight="Questions"
                description={subtitle}
                className="mb-6 max-w-xl"
              />

              {/* Direct Help & Support Card */}
              <div className="rounded-2xl bg-[#0B132B] text-white p-6 border border-white/10 shadow-lg mt-6">
                <h4 className="text-base font-bold text-white font-heading mb-1">
                  Have a specific question about your move?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-5">
                  Our Ranchi office is open 24x7 to provide free consultation, custom route estimates, and packing advice.
                </p>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={companyInfo.telLink}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 py-2.5 px-4 text-xs font-semibold transition-colors font-sans shadow-xs"
                  >
                    <PhoneCall size={13} className="text-brand" />
                    <span>Call {companyInfo.formattedPhone}</span>
                  </a>
                  <a
                    href={companyInfo.whatsappLink("Hello! I have a question regarding relocation.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-4 text-xs font-semibold transition-colors font-sans shadow-xs"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp 24x7</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-2.5">
            {faqs.map((item, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-brand/40 bg-white shadow-xs ring-1 ring-brand/10"
                      : "border-slate-200/90 bg-white hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base font-heading leading-tight">
                      {item.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isOpen ? "bg-brand text-white rotate-180" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown size={14} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 mt-1">
                      <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed pt-3">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
