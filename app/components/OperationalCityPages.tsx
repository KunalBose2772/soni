import Link from "next/link";
import { Fragment } from "react";
import type { ComponentType } from "react";
import { BadgeCheck, Clock3, HandCoins, MapPin, PhoneCall, Rocket, ShieldCheck, Truck, Warehouse } from "lucide-react";

import CallToAction from "./CallToAction";
import FAQSection from "./FAQSection";
import FactsSection from "./FactsSection";
import OperationalCities from "./OperationalCities";
import QuoteForm from "./QuoteForm";
import DistrictServiceAreaMap from "./DistrictServiceAreaMap";

import type { OperationalCity } from "@/lib/operational-cities";
import { operationalCities } from "@/lib/operational-cities";
import { siteAssets } from "@/lib/site-assets";

type FAQItem = {
  question: string;
  answer: string;
};

type ServiceHighlight = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; size?: number }>;
  tone: string;
};

type OperationalCityPageProps = {
  city: OperationalCity;
  introCopy: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  localAreas: string[];
  localAreaNote?: string;
  nearbyCities: OperationalCity[];
  nearbyCitiesNote?: string;
  routes: string[];
  pincodeCoverage: string[];
  faqs: FAQItem[];
};

const serviceHighlights: ServiceHighlight[] = [
  {
    title: "Free Visit",
    description: "Quick inspection and route guidance before booking.",
    icon: BadgeCheck,
    tone: "bg-pink-500",
  },
  {
    title: "Affordable Price",
    description: "Transparent quotes for local and intercity moves.",
    icon: HandCoins,
    tone: "bg-blue-600",
  },
  {
    title: "Fast Delivery",
    description: "Proper packing and dispatch for on-time delivery.",
    icon: Rocket,
    tone: "bg-orange-500",
  },
  {
    title: "24x7 Support",
    description: "Call and WhatsApp help whenever you need updates.",
    icon: ShieldCheck,
    tone: "bg-slate-900",
  },
];

export default function OperationalCityPages({
  city,
  introCopy,
  overviewTitle,
  overviewParagraphs,
  localAreas,
  localAreaNote,
  nearbyCities,
  nearbyCitiesNote,
  routes,
  pincodeCoverage,
  faqs,
}: OperationalCityPageProps) {
  const cityName = city.name;
  const overviewTitleParts = overviewTitle.split(cityName);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 min-h-[72vh]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35"
          style={{ backgroundImage: `url('${siteAssets.pages.operationalCities.heroBanner}')` }}
        />
        <div className="pointer-events-none absolute inset-0 bg-blue-950/65" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-950/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-20" />

        <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-up mx-auto text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              {cityName} Service Area
            </div>
            <h1 className="text-5xl font-black leading-tight text-white md:text-5xl">
              Packers and Movers in
              <span className="mt-2 block text-orange-500">{cityName}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100 md:text-2xl">{introCopy}</p>
          </div>
        </div>
      </section>

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
                <h2 className="mt-4 text-3xl font-black text-slate-950 md:text-5xl">
                  {overviewTitleParts.length === 1 ? (
                    overviewTitle
                  ) : (
                    overviewTitleParts.map((part, index) => (
                      <Fragment key={`${part}-${index}`}>
                        {part}
                        {index < overviewTitleParts.length - 1 && (
                          <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                            {cityName}
                          </span>
                        )}
                      </Fragment>
                    ))
                  )}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-8 text-slate-600 md:text-lg [&_strong]:font-extrabold [&_strong]:text-slate-950">
                  {overviewParagraphs.map((paragraph) => (
                    <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm animate-fade-right" style={{ animationDelay: "180ms" }}>
                <h3 className="text-2xl font-black text-slate-950">Coverage in and around {cityName}</h3>
                <p className="mt-3 text-slate-600">
                  We serve {cityName} with location-aware planning, safe loading, and destination tracking for homes, offices, and vehicles.
                </p>

                <div className="mt-6 grid gap-4">
                  <div className="rounded-2xl bg-white p-5 shadow-sm animate-pop-in" style={{ animationDelay: "200ms" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Localities & pickup points</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {localAreas.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-slate-700"
                        >
                          <MapPin size={14} className="text-orange-600" />
                          {item}
                        </span>
                      ))}
                    </div>
                    {localAreaNote ? <p className="mt-4 text-sm leading-6 text-slate-500">{localAreaNote}</p> : null}
                  </div>

                  <div className="rounded-2xl bg-white p-5 shadow-sm animate-fade-up" style={{ animationDelay: "220ms" }}>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">Nearby cities we connect with</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {nearbyCities.map((item) => (
                        <Link
                          key={item.slug}
                          href={item.href}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 cursor-pointer"
                        >
                          <MapPin size={14} className="text-blue-600" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    {nearbyCitiesNote ? <p className="mt-4 text-sm leading-6 text-slate-500">{nearbyCitiesNote}</p> : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm animate-fade-right" style={{ animationDelay: "140ms" }}>
                <div className="bg-slate-950 p-6 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-orange-300">Get a quick quote</p>
                  <h3 className="mt-3 text-2xl font-black">Need a move plan for {cityName}?</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Share pickup location, destination, and move date. We will reply with a clear quote and moving guidance.
                  </p>
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
                districtName={cityName}
                districtSlug={city.slug}
                stateName="India"
                mapQuery={`${cityName}, India`}
                mapHeading={`Our Service Area in ${cityName}`}
                popularRoutes={routes}
                pincodeCoverage={pincodeCoverage}
              />
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Truck, title: "Household shifting", text: `Safe packing and transport for home moves in ${cityName}.` },
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

      <FactsSection
        eyebrow="Service facts"
        title={
          <>
            Trusted packers and movers in{" "}
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">{cityName}</span>
          </>
        }
        intro={`Our team supports local shifting, intercity transport, careful packing, and regular follow-up for customers in ${cityName}.`}
      />

      <FAQSection title={`FAQs for ${cityName}`} subtitle={`Common questions people ask before booking a move in ${cityName}.`} faqs={faqs} />
      <OperationalCities
        title="Operational Cities"
        subtitle={`Browse our other service locations while exploring packers and movers in ${cityName}.`}
        cities={operationalCities}
      />
      <CallToAction />
    </>
  );
}
