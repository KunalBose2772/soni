"use client";

import { ShieldCheck, Clock, Users, BadgeCheck, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionHeader from "./ui/SectionHeader";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Careful Multi-Layer Packing",
    desc: "We use thick bubble wrap, foam sheets, corner protectors, and strong cartons so your TV, fridge, crockery, and furniture stay scratch-free.",
    points: [
      "Special care for LED TVs & glassware",
      "Protective foam for wooden furniture",
      "Sturdy 5-ply cartons for clothes & books",
    ],
  },
  {
    icon: Clock,
    title: "Punctual Doorstep Delivery",
    desc: "Direct closed container trucks dispatched from Ratu Road, Ranchi on fixed schedules with direct phone updates on truck location.",
    points: [
      "Closed weatherproof container trucks",
      "On-time pickup and delivery schedule",
      "Direct phone coordination with driver",
    ],
  },
  {
    icon: Users,
    title: "Trained & Respectful Crew",
    desc: "Our own experienced team handles lifting, dismantling double beds, packing appliances, and placing furniture in your new rooms.",
    points: [
      "Disciplined, experienced packing crew",
      "Careful lifting down tight staircases",
      "Bed & wardrobe reassembly help",
    ],
  },
  {
    icon: BadgeCheck,
    title: "Honest & Upfront Rates",
    desc: "What we quote is what you pay. No sudden charges on delivery day, no labour arguments, and no hidden fees.",
    points: [
      "Clear written quotation",
      "Zero hidden or surprise costs",
      "Competitive Ranchi & intercity rates",
    ],
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-spacing bg-white border-b border-slate-100">
      <div className="site-container">
        {/* Header Block with Left Alignment and Quick CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <SectionHeader
            align="left"
            title="Why Families in Ranchi Trust"
            highlight="Sony Packers and Movers"
            description="We treat your household goods with the same care as our own. No rough handling, no careless transport, and no hidden charges."
            className="mb-0 max-w-2xl"
          />

          <Link
            href="/#quote"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 shrink-0 font-sans shadow-none self-start lg:self-end"
          >
            <span>Book Your Shifting Date</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 hover:border-slate-350 p-5 shadow-xs transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-11 h-11 rounded-xl bg-brand-light text-brand flex items-center justify-center mb-4 transition-colors">
                    <Icon size={20} strokeWidth={2.2} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-slate-950 font-heading leading-tight mb-2 group-hover:text-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed mb-4">
                    {item.desc}
                  </p>

                  {/* Benefit Checklist */}
                  <ul className="space-y-2 border-t border-slate-100 pt-3">
                    {item.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-sans">
                        <Check size={13} className="text-brand shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Trust Metrics Ribbon */}
        <div className="rounded-2xl bg-[#0B132B] text-white p-5 sm:p-6 border border-white/10 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            <div className="pt-2 sm:pt-0 sm:px-4 first:pl-0">
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none">
                1,500<span className="text-brand font-bold">+</span>
              </p>
              <p className="text-xs text-slate-300 font-medium font-sans mt-1.5">
                Homes &amp; Offices Shifted
              </p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none">
                4.7<span className="text-amber-400 font-bold">★</span>
              </p>
              <p className="text-xs text-slate-300 font-medium font-sans mt-1.5">
                Verified Google Rating
              </p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none">
                100<span className="text-brand font-bold">%</span>
              </p>
              <p className="text-xs text-slate-300 font-medium font-sans mt-1.5">
                Safe Doorstep Delivery
              </p>
            </div>

            <div className="pt-2 sm:pt-0 sm:px-4">
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white leading-none">
                10<span className="text-brand font-bold">+</span>
              </p>
              <p className="text-xs text-slate-300 font-medium font-sans mt-1.5">
                Years Serving Ranchi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
