import type { Metadata } from "next";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  FileText,
  BadgeCheck,
} from "lucide-react";
import PageHeroBanner from "../components/PageHeroBanner";
import QuoteForm from "../components/QuoteForm";
import FAQSection from "../components/FAQSection";
import WhyChooseUs from "../components/WhyChooseUs";
import { siteAssets } from "@/lib/site-assets";
import { companyInfo } from "@/lib/company-info";

export const metadata: Metadata = {
  title: "Get a Free Moving Quote | Sony Packers and Movers Ranchi",
  description:
    "Request an instant shifting estimate for household, office, vehicle, or intercity relocation with transparent, fixed pricing and zero hidden fees.",
};

const quoteFaqs = [
  {
    question: "How is my shifting quotation calculated?",
    answer:
      "Our estimate is based on the volume of goods (BHK size or inventory list), travel distance, floor levels, lift availability, and protective packing materials needed.",
  },
  {
    question: "Are there any hidden costs added on delivery day?",
    answer:
      "No. Once our moving coordinator confirms the written quotation after surveying your items, the price is 100% fixed with zero surprise charges.",
  },
  {
    question: "Can I request a free physical survey in Ranchi?",
    answer:
      "Yes! For full household or office shifting in Ranchi and surrounding areas, our field supervisor visits your location at no charge to provide an accurate on-spot estimate.",
  },
  {
    question: "How early should I book my move?",
    answer:
      "We recommend booking 2 to 4 days in advance for local shifting, and 5 to 7 days ahead for intercity interstate relocations to secure your preferred container vehicle.",
  },
];

export default function GetQuotePage() {
  return (
    <main className="overflow-x-clip bg-white">
      {/* SSOT Page Hero Banner */}
      <PageHeroBanner
        title="Get a Free, Guaranteed Moving Quote"
        subtitle="Tell us your shifting requirements. Our Ranchi dispatch team will provide a transparent, all-inclusive estimate within 15 minutes."
        badge="Zero Obligation • 100% Fixed Price"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Get Free Quote" },
        ]}
        backgroundImage={siteAssets.pages.getQuote.heroBanner}
      />

      {/* Main Form & Benefits Section */}
      <section className="section-spacing bg-slate-50/70 border-b border-slate-100">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Column: Value Proposition & Direct Support */}
            <div className="lg:col-span-5 space-y-5">
              {/* Royal Blue Trust Box */}
              <div className="rounded-3xl bg-brand-primary p-6 sm:p-7 text-white shadow-xl border border-blue-400/25 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/40 text-[10px] font-bold uppercase tracking-wider text-blue-200 mb-3">
                  <BadgeCheck size={12} className="text-amber-400" />
                  <span>Fixed Written Estimate</span>
                </span>

                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight mb-2">
                  Transparent Pricing with Zero Hidden Surprises
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 font-sans leading-relaxed mb-6">
                  Every quote includes dedicated packing materials, loading-unloading labor, transit insurance options, and doorstep delivery.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      title: "15-Minute Rapid Response",
                      desc: "Dedicated moving coordinator assigned instantly to your request.",
                    },
                    {
                      title: "Free Pre-Move Inspection",
                      desc: "Complimentary home survey anywhere across Ranchi and nearby regions.",
                    },
                    {
                      title: "All-Inclusive Written Bill",
                      desc: "No sudden extra fees for stairs, heavy cartons, or transit tolls.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-2xl bg-white/5 border border-white/10 p-3.5 backdrop-blur-xs"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold font-heading text-white">
                          {item.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-blue-100/90 font-sans mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Call Assistance Box */}
              <div className="rounded-2xl bg-white border border-slate-200/90 p-5 shadow-xs flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-heading text-slate-950">
                    Prefer to talk directly?
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-sans mt-0.5">
                    Speak with our dispatch team right now.
                  </p>
                </div>
                <a
                  href={companyInfo.telLink}
                  className="btn-brand-primary inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold font-heading shrink-0 shadow-xs"
                >
                  <PhoneCall size={13} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>

            {/* Right Column: Lead Form Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 p-4 sm:p-7 shadow-xl relative overflow-hidden">
                <div className="mb-4 sm:mb-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-slate-950">
                      Step-by-Step Moving Quote
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      Enter pickup, drop, and contact information
                    </p>
                  </div>
                  <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-brand-light text-brand text-[11px] font-bold font-heading">
                    Free Consultation
                  </span>
                </div>

                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reusable Why Choose Us Section */}
      <WhyChooseUs />

      {/* Reusable FAQs Section */}
      <FAQSection
        title="Frequently Asked Questions on"
        subtitle="Clear answers about moving charges, survey visits, packing supplies, and transit guarantees."
        faqs={quoteFaqs}
      />
    </main>
  );
}
