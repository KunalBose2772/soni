import Link from "next/link";
import type { ComponentType, ReactNode } from "react";
import { Clock3, MapPin, PhoneCall, Truck, Warehouse } from "lucide-react";
import FactsSection from "./FactsSection";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import QuoteForm from "./QuoteForm";
import CallToAction from "./CallToAction";
import OperationalCities from "../components/OperationalCities";
import { operationalCities } from "@/lib/operational-cities";
import DistrictServiceAreaMap from "./DistrictServiceAreaMap";

import type { BiharDistrict } from "../packers-movers-bihar/locationData";
import { biharDistrictRoute as districtRoute, biharLocalityRoute as localityRoute } from "../packers-movers-bihar/locationData";
import { localitySlug } from "../packers-movers-bihar/districtProfiles";

type Highlight = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  accentClass: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

type StatePageProps = {
  title: string;
  eyebrow: string;
  subtitle: string;
  heroImage: string;
  introTitle: string;
  introCopy: string;
  highlights: Highlight[];
  districts: BiharDistrict[];
  faqTitle: string;
  faqSubtitle: string;
  faqs: FAQItem[];
  faqImages: string[];
};

type DistrictPageProps = {
  district: BiharDistrict;
  areaDisplayName?: string;
  areaEyebrow?: string;
  mapQuery?: string;
  mapHeading?: string;
  heroImage: string;
  introCopy: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  serviceHighlights: {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string; size?: number }>;
    tone: string;
  }[];
  localities: string[];
  localityNote: string;
  nearbyDistricts: string[];
  nearbyNote: string;
  quoteTitle: string;
  quoteCopy: string;
  popularRoutes: string[];
  pincodeCoverage: string[];
  faqs: FAQItem[];
  faqImages: string[];
};

function HeroShell({
  eyebrow,
  title,
  subtitle,
  heroImage,
  titleClassName = "md:text-7xl",
  centered = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  heroImage: string;
  titleClassName?: string;
  centered?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 min-h-[72vh]">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
        style={{ backgroundImage: `url('${heroImage}')` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-blue-950/65" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-950/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className={`max-w-2xl animate-fade-up ${centered ? "mx-auto text-center" : ""}`}>
          <div
            className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm ${
              centered ? "mx-auto" : ""
            } animate-pop-in`}
            style={{ animationDelay: "80ms" }}
          >
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            {eyebrow}
          </div>
          <h1 className={`text-5xl font-black leading-tight text-white ${titleClassName} animate-fade-up`} style={{ animationDelay: "160ms" }}>
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100 md:text-2xl animate-fade-left" style={{ animationDelay: "240ms" }}>
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}

function DistrictChips({
  districts,
}: {
  districts: BiharDistrict[];
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {districts.map((district) => (
        <Link
          key={district.slug}
          href={districtRoute(district.slug)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-700"
        >
          <MapPin size={14} className="text-orange-600" />
          {district.name}
        </Link>
      ))}
    </div>
  );
}

export function BiharStatePage({
  title,
  eyebrow,
  subtitle,
  heroImage,
  introTitle,
  introCopy,
  highlights,
  districts,
  faqTitle,
  faqSubtitle,
  faqs,
  faqImages,
}: StatePageProps) {
  return (
    <>
      <HeroShell eyebrow={eyebrow} title={title} subtitle={subtitle} heroImage={heroImage} titleClassName="md:text-7xl" />

      <section className="bg-white py-8 md:py-12">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8 animate-fade-up">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-blue-700">Bihar service network</p>
          <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">{introTitle}</h2>
          <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-600 md:text-lg">{introCopy}</p>
        </div>
      </section>

      <section className="bg-slate-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-orange-700">What makes us unique</p>
            <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Why customers book us across Bihar</h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 xl:grid-cols-3">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`group overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    index % 2 === 0 ? "animate-fade-left" : "animate-fade-right"
                  }`}
                  style={{ animationDelay: `${index * 110}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-950">{item.title}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                    <div className={`grid h-14 w-14 place-items-center rounded-2xl ${item.accentClass}`}>
                      <Icon className="text-white" size={26} />
                    </div>
                  </div>
                  <div className={`mt-6 h-1 w-20 rounded-full ${index % 2 === 0 ? "bg-orange-500" : "bg-blue-500"}`} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8 animate-fade-up">
          <p className="text-sm font-bold uppercase tracking-[0.34em] text-orange-700">Available across the state</p>
          <h2 className="mt-3 text-3xl font-black text-slate-950 md:text-4xl">Packers and movers available across Bihar</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Select your district to open a dedicated SEO page for local shifting, nearby routes, and city-specific support.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pop-in">
            <DistrictChips districts={districts} />
          </div>
        </div>
      </section>

      <FactsSection />

      <FAQSection title={faqTitle} subtitle={faqSubtitle} faqs={faqs} images={faqImages} />
      <Testimonials />
    </>
  );
}

export function BiharDistrictPage({
  district,
  areaDisplayName,
  areaEyebrow,
  mapQuery,
  mapHeading,
  heroImage,
  introCopy,
  overviewTitle,
  overviewParagraphs,
  serviceHighlights,
  localities,
  localityNote,
  nearbyDistricts,
  nearbyNote,
  quoteTitle,
  quoteCopy,
  popularRoutes,
  pincodeCoverage,
  faqs,
  faqImages,
}: DistrictPageProps) {
  const displayArea = areaDisplayName ?? district.name;
  const eyebrowText = areaEyebrow ?? `${district.name.toUpperCase()} SERVICE AREA`;

  return (
    <>
      <HeroShell
        eyebrow={eyebrowText}
        title={
          <>
            Packers and Movers in{' '}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              {displayArea}
            </span>
          </>
        }
        subtitle={introCopy}
        heroImage={heroImage}
        titleClassName="md:text-5xl"
        centered
      />

      <section className="bg-white py-10 md:py-16 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
            <div className="space-y-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
              <div className="grid gap-4 sm:grid-cols-2">
                {serviceHighlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article
                      key={item.title}
                      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md ${
                        index % 2 === 0 ? "animate-fade-left" : "animate-fade-right"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`grid h-12 w-16 place-items-center rounded-2xl ${item.tone}`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-extrabold text-slate-950">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="animate-fade-left" style={{ animationDelay: "120ms" }}>
                <p className="text-sm font-bold uppercase tracking-[0.34em] text-blue-700">Local route support</p>
                <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl" dangerouslySetInnerHTML={{ __html: overviewTitle }} />
                <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 md:text-lg [&_strong]:font-bold [&_strong]:text-slate-950">
                  {overviewParagraphs.map((paragraph) => (
                    <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm animate-fade-right" style={{ animationDelay: "180ms" }}>
                <h3 className="text-2xl font-black text-slate-950">Coverage in and around {displayArea}</h3>
                <p className="mt-3 text-slate-600">
                  We serve {displayArea} with location-aware planning, safe loading, and destination tracking for homes,
                  offices, and vehicles.
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-white p-5 shadow-sm animate-pop-in" style={{ animationDelay: "200ms" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Localities & pickup points</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {localities.map((item) => (
                        <Link
                          key={item}
                          href={localityRoute(district.slug, localitySlug(item))}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-orange-100 hover:text-orange-800"
                        >
                          <MapPin size={14} className="text-orange-600" />
                          {item}
                        </Link>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-500">{localityNote}</p>
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-sm animate-fade-up" style={{ animationDelay: "220ms" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Nearby districts we connect with</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {nearbyDistricts.map((item) => {
                        const slug = item.toLowerCase().replace(/\s+/g, '-');
                        return (
                          <Link
                            key={item}
                            href={districtRoute(slug)}
                            className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                          >
                            <MapPin size={14} className="text-blue-600" />
                            {item}
                          </Link>
                        );
                      })}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-500">{nearbyNote}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm animate-fade-right" style={{ animationDelay: "140ms" }}>
                <div className="bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">Get a quick quote</p>
                  <h3 className="mt-3 text-2xl font-black">{quoteTitle}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{quoteCopy}</p>
                  <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-200">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                      <PhoneCall size={14} className="text-orange-300" />
                      Quick callback
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                      <Truck size={14} className="text-orange-300" />
                      Local move planning
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <QuoteForm />
                </div>
              </div>

              <DistrictServiceAreaMap
                districtName={district.name}
                districtSlug={district.slug}
                stateName="Bihar"
                mapQuery={mapQuery}
                mapHeading={mapHeading}
                popularRoutes={popularRoutes}
                pincodeCoverage={pincodeCoverage}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Truck, title: "Household shifting", text: `Safe packing and transport for home moves in ${district.name}.` },
              { icon: Warehouse, title: "Storage support", text: "Short-term and long-term storage options when your move needs a pause." },
              { icon: Clock3, title: "Fast response", text: "Quick site visits, call support, and WhatsApp coordination." },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg animate-fade-up"
                  style={{ animationDelay: `${index * 120 + 240}ms` }}
                >
                  <Icon className="text-orange-600" size={28} />
                  <h4 className="mt-4 text-xl font-bold text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <FactsSection />
      <FAQSection title={`FAQs for ${district.name}`} subtitle={`Common questions people ask before booking a move in ${district.name}.`} faqs={faqs} images={faqImages} />
       <OperationalCities
        title="Operational Cities"
        subtitle="Browse the key city-wise service pages we support across India."
        cities={operationalCities}
      />
      <CallToAction />
    </>
  );
}
