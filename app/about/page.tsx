"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Truck, PhoneCall, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PageHeroBanner from "../components/PageHeroBanner";
import { useInView } from "../components/useInView";
import FactsSection from "../components/FactsSection";
import WhyChooseUs from "../components/WhyChooseUs";
import Process from "../components/Process";
import { siteAssets } from "@/lib/site-assets";
import CallToAction from "../components/CallToAction";
import OperationalCities from "../components/OperationalCities";
import { operationalCities } from "@/lib/operational-cities";
import { companyInfo } from "@/lib/company-info";

const highlights = [
  "Dedicated and full-time trained packing crew",
  "100% transparent pricing with zero hidden delivery day fees",
  "3-layer protective packing with scheduled on-time delivery",
  "Dedicated move manager with GPS route tracking",
];

const zones = [
  "Ranchi", "Jamshedpur", "Bokaro", "Dhanbad", "Hazaribagh",
  "Patna", "Gaya", "Muzaffarpur", "Bhagalpur",
  "Delhi NCR", "Noida", "Kolkata", "Mumbai", "Pune",
  "Ahmedabad", "Surat", "Bangalore", "Hyderabad",
  "Chennai", "Lucknow", "Jaipur", "Bhubaneswar"
];

export default function AboutPage() {
  const { ref: whoRef, isInView: whoInView } = useInView<HTMLDivElement>();
  const { ref: zonesRef, isInView: zonesInView } = useInView<HTMLDivElement>();

  return (
    <main className="overflow-x-clip bg-white">
      <PageHeroBanner
        title="About Sony Packers and Movers"
        subtitle="Ranchi's trusted relocation specialists offering household shifting, office moves, vehicle carrier services, and secure storage across India."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
        badge="Established Relocation Specialists"
        backgroundImage={siteAssets.pages.about.heroBanner}
      />

      {/* =========================================================================
          SECTION 1: WHO WE ARE (COLLAGE + VALUE PROPOSITION)
          ========================================================================= */}
      <section ref={whoRef} className="section-spacing bg-white border-b border-slate-100">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Visual Collage with Floating Badges */}
            <div
              className={`lg:col-span-6 grid gap-4 transition-all duration-700 sm:grid-cols-2 ${
                whoInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              <div className="space-y-4">
                <div className="group overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-md">
                  <img
                    src={siteAssets.common.aboutCollageOne}
                    alt="Sony Packers and Movers team handling loading"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl bg-blue-600 p-5 text-white shadow-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                      <Truck size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Headquartered in Ranchi</p>
                      <p className="text-base font-bold font-heading">Ratu Road Central Hub</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-0 space-y-4 sm:mt-10">
                <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-md transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src={siteAssets.common.aboutCollageTwo}
                    alt="Safe household and office packing"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50 p-4 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                    What We Do
                  </span>
                  <p className="mt-2 text-xs text-slate-600 font-sans leading-relaxed">
                    From 3-layer protective packing to GPS-monitored transit and room setup, we ensure zero-stress moving.
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-md transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src={siteAssets.common.aboutCollageThree}
                    alt="Sony Packers transportation fleet"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Company Story & Highlights */}
            <div
              className={`lg:col-span-6 flex flex-col justify-center transition-all duration-700 ${
                whoInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-950 leading-tight tracking-tight mb-4">
                Welcome to Sony Packers and Movers{" "}
                <span className="text-brand">in Ranchi</span>
              </h2>

              <div className="flex items-start gap-3.5 rounded-2xl border-l-4 border-brand bg-slate-50 p-4 shadow-xs mb-4">
                <div className="mt-0.5 text-brand shrink-0">
                  <MapPin size={20} />
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-sans font-medium leading-relaxed">
                  Headquartered at <strong className="text-slate-950 font-semibold">{companyInfo.address.short}</strong>. Delivering seamless local moves in Ranchi and daily dedicated routes across India.
                </p>
              </div>

              <p className="text-xs sm:text-sm md:text-base text-slate-600 font-sans leading-relaxed mb-6">
                Sony Packers and Movers is recognized as one of Jharkhand&apos;s most reliable relocation partners. We provide complete end-to-end packing, loading, transit insurance, and unpacking solutions tailored for apartments, bungalows, corporate offices, vehicles, and long-term warehousing.
              </p>

              {/* 4 Key Checklist Points */}
              <div className="space-y-2.5 mb-7">
                {highlights.map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white px-3.5 py-2.5 shadow-xs"
                    style={{ transitionDelay: `${150 + idx * 80}ms` }}
                  >
                    <CheckCircle2 size={16} className="text-brand shrink-0" strokeWidth={2.2} />
                    <span className="text-xs sm:text-sm font-medium font-sans text-slate-800">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Unified Rounded-Full */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/#quote"
                  className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href={companyInfo.telLink}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 hover:border-slate-950 text-slate-800 hover:text-slate-950 bg-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 font-sans"
                >
                  <PhoneCall size={13} className="text-brand" />
                  <span>Call {companyInfo.formattedPhone}</span>
                </a>

                <a
                  href={companyInfo.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 font-sans"
                >
                  <FaWhatsapp size={15} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: FACTS & IMPACT (MODERNIZED DARK RIBBON)
          ========================================================================= */}
      <FactsSection />

      {/* =========================================================================
          SECTION 3: STEP-BY-STEP PROCESS
          ========================================================================= */}
      <Process />

      {/* =========================================================================
          SECTION 4: SERVICE COVERAGE & NATIONAL ROUTES
          ========================================================================= */}
      <section ref={zonesRef} className="section-spacing bg-slate-50/70 border-b border-slate-100">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Left Box: India-Wide Network */}
            <div
              className={`lg:col-span-7 rounded-3xl bg-brand-primary p-6 sm:p-8 text-white shadow-xl border border-blue-400/20 transition-all duration-700 ${
                zonesInView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading leading-tight mb-2">
                Reliable Relocation Routes Across India
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 font-sans leading-relaxed mb-6">
                From local shifting within Ranchi to scheduled intercity runs across all major state capitals, our dedicated container vehicles guarantee on-time transit.
              </p>

              {/* City Grid Pills */}
              <div className="grid gap-2 sm:grid-cols-3">
                {zones.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-sans text-slate-200 backdrop-blur-xs hover:border-white/20 hover:bg-white/10 transition-all"
                  >
                    <span className="w-5 h-5 rounded-full bg-white/10 text-brand flex items-center justify-center shrink-0">
                      <MapPin size={11} />
                    </span>
                    <span className="font-medium truncate">{city}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Box: Coverage Snapshot */}
            <div
              className={`lg:col-span-5 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-700 ${
                zonesInView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-950 mb-2">
                Service Coverage Snapshot
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed mb-5">
                Full-service relocation infrastructure backed by physical survey teams, heavy packaging supplies, and dedicated customer coordinators.
              </p>

              <div className="space-y-3.5">
                <div className="rounded-2xl bg-brand-light border border-brand-light p-4 transition-transform hover:-translate-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand font-heading">
                    Local Shifting in Ranchi
                  </p>
                  <p className="mt-1 text-xs text-slate-700 font-sans leading-relaxed">
                    Ratu Road, Harmu, Lalpur, Doranda, Morabadi, Bariatu, Booty More, Kanke, Dhurwa, and all Ranchi localities.
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 transition-transform hover:-translate-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700 font-heading">
                    Intercity & Interstate Express
                  </p>
                  <p className="mt-1 text-xs text-slate-700 font-sans leading-relaxed">
                    Daily scheduled container routes to Patna, Kolkata, Delhi NCR, Bangalore, Pune, Mumbai, Hyderabad, and 50+ tier 1/2 hubs.
                  </p>
                </div>

                <div className="rounded-2xl bg-brand-primary text-white p-4 border border-blue-400/20 transition-transform hover:-translate-y-0.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-300 font-heading">
                    Our Quality Promise
                  </p>
                  <p className="mt-1 text-xs text-blue-100 font-sans leading-relaxed">
                    Zero hidden charges, comprehensive written estimates, verified crew, and 24x7 phone/WhatsApp move updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: WHY CHOOSE US
          ========================================================================= */}
      <WhyChooseUs />

      {/* =========================================================================
          SECTION 6: OPERATIONAL CITIES
          ========================================================================= */}
      <OperationalCities
        title="Operational Cities &"
        subtitle="Browse the key city-wise service branches and district hubs we support across India."
        cities={operationalCities}
      />

      {/* =========================================================================
          SECTION 5: FINAL CALL TO ACTION
          ========================================================================= */}
      <CallToAction />
    </main>
  );
}
