"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useInView } from "./useInView";
import { companyInfo } from "@/lib/company-info";

type CallToActionProps = {
  title?: string;
  subtitle?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function CallToAction({
  title = "Planning to Shift Your Home or Office?",
  subtitle = "Talk directly with our Ranchi team for an upfront quotation with zero hidden costs, or book a free home survey before deciding.",
  primaryHref = "/#quote",
  primaryLabel = "Get Free Quote",
  secondaryHref = companyInfo.whatsappLink("Hello! I'd like an estimate for relocation."),
  secondaryLabel = "WhatsApp Us",
}: CallToActionProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section ref={ref} className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        <div
          className={`relative rounded-3xl bg-[#0B132B] text-white p-7 sm:p-10 md:p-12 overflow-hidden border border-white/10 shadow-xl transition-all duration-700 ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Subtle Ambient Decorative Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Natural Human Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-white leading-tight mb-3">
              {title.includes("?") ? (
                <>
                  {title.replace("?", "")}
                  <span className="text-brand">?</span>
                </>
              ) : (
                <>
                  {title}{" "}
                  <span className="text-brand">with Confidence</span>
                </>
              )}
            </h2>

            {/* Subtitle in Montserrat */}
            <p className="text-slate-300 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-7">
              {subtitle}
            </p>

            {/* Clean Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full">
              <Link
                href={primaryHref}
                className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans"
              >
                <span>{primaryLabel}</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href={companyInfo.telLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans shadow-xs"
              >
                <PhoneCall size={14} className="text-brand" />
                <span>Call {companyInfo.formattedPhone}</span>
              </a>

              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans shadow-xs"
              >
                <FaWhatsapp size={15} />
                <span>{secondaryLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
