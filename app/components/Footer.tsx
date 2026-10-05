"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Star,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { companyInfo } from "@/lib/company-info";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#070D1E] text-slate-300 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Decorative Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-light/5 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          TOP BANNER: Quick Pre-Footer Assistance Bar
          ========================================================================= */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="site-container py-6 sm:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                Planning a relocation in Ranchi or across India?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
                Speak directly with our moving coordinators for a free home survey and transparent quote.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={companyInfo.telLink}
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans shadow-xs"
              >
                <Phone size={14} className="text-brand" />
                <span>Call {companyInfo.formattedPhone}</span>
              </a>

              <a
                href={companyInfo.whatsappLink("Hello! I need assistance with moving.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans shadow-xs"
              >
                <FaWhatsapp size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN FOOTER COLUMNS
          ========================================================================= */}
      <div className="site-container py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Trust (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Brand Logo - Bigger, on Clean White Background, without redundant text */}
              <Link href="/" className="inline-block mb-5 group">
                <div className="bg-white rounded-2xl p-2.5 px-4 inline-flex items-center shadow-sm border border-white/20 transition-transform duration-200 group-hover:scale-[1.02]">
                  <div className="relative h-12 w-52 sm:h-14 sm:w-60">
                    <Image
                      src="/assets/logo/logo.png"
                      alt={companyInfo.name}
                      fill
                      sizes="(max-width: 640px) 208px, 240px"
                      className="object-contain object-left"
                      priority
                      unoptimized
                    />
                  </div>
                </div>
              </Link>

              {/* Natural Human Company Description */}
              <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-sans mb-5 max-w-sm">
                Headquartered on Ratu Road, Ranchi. We provide careful household shifting, corporate office moves, vehicle carrier services, and secure warehouse storage across India.
              </p>

              {/* Verified Google Rating Pill */}
              <a
                href={companyInfo.gmb.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors mb-6 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
                  <FcGoogle size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white font-heading">
                      {companyInfo.gmb.rating} / 5 Rating
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
                    {companyInfo.gmb.reviewCount}+ Verified Google Reviews
                  </p>
                </div>
              </a>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-heading mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={companyInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
                >
                  <FaFacebookF size={13} />
                </a>

                <a
                  href={companyInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 hover:border-pink-600 transition-all"
                >
                  <FaInstagram size={14} />
                </a>

                <a
                  href={companyInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-red-600 hover:border-red-600 transition-all"
                >
                  <FaYoutube size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Relocation Services (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans">
              <li>
                <Link href="/services/household" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Household Shifting</span>
                </Link>
              </li>
              <li>
                <Link href="/services/office" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Office Relocation</span>
                </Link>
              </li>
              <li>
                <Link href="/services/vehicle" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Car &amp; Bike Carrier</span>
                </Link>
              </li>
              <li>
                <Link href="/services/loading" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Loading &amp; Unloading</span>
                </Link>
              </li>
              <li>
                <Link href="/services/storage" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Warehousing &amp; Storage</span>
                </Link>
              </li>
              <li>
                <Link href="/services/domestic" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight size={11} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>All-India Shifting</span>
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mt-6 mb-3 pb-2 border-b border-white/10">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#quote" className="text-slate-400 hover:text-white transition-colors">
                  Get Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Regional Hubs & Key Routes (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Key Routes
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-slate-400">
              <li>Ranchi ➔ Delhi NCR</li>
              <li>Ranchi ➔ Kolkata</li>
              <li>Ranchi ➔ Bangalore</li>
              <li>Ranchi ➔ Patna</li>
              <li>Ranchi ➔ Mumbai</li>
              <li>Ranchi ➔ Pune</li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mt-6 mb-3 pb-2 border-b border-white/10">
              State Hubs
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <Link href="/packers-movers-jharkhand" className="text-slate-400 hover:text-white transition-colors">
                  24 Jharkhand Districts
                </Link>
              </li>
              <li>
                <Link href="/packers-movers-bihar" className="text-slate-400 hover:text-white transition-colors">
                  38 Bihar Districts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Office & Contact Info (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading mb-4 pb-2 border-b border-white/10">
              Ranchi Office
            </h4>
            <div className="space-y-3.5 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                <span className="text-slate-400 leading-relaxed">
                  {companyInfo.address.full}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-brand" />
                <a
                  href={companyInfo.telLink}
                  className="text-slate-200 hover:text-white font-semibold transition-colors"
                >
                  {companyInfo.formattedPhone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <FaWhatsapp size={16} className="shrink-0 text-emerald-400" />
                <a
                  href={companyInfo.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-emerald-400 font-semibold transition-colors"
                >
                  WhatsApp 24x7 Support
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-sky-400" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-slate-400 hover:text-slate-200 transition-colors truncate"
                >
                  {companyInfo.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock size={15} className="shrink-0 text-amber-400" />
                <span className="text-slate-400">{companyInfo.workingHours}</span>
              </div>
            </div>

            {/* Damage-Free Guarantee Chip */}
            <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-3 flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
              <p className="text-[11px] text-slate-300 font-sans leading-tight">
                Transparent price lock with zero hidden delivery day charges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM COPYRIGHT & LEGAL BAR
          ========================================================================= */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="site-container py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500 font-sans">
            <p>
              &copy; {year} {companyInfo.name}. All rights reserved.
            </p>
            <p className="text-slate-400">
              Registered Packing &amp; Moving Agency • Ratu Road, Ranchi, Jharkhand
            </p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-slate-300 transition-colors">
                About
              </Link>
              <Link href="/contact" className="hover:text-slate-300 transition-colors">
                Contact
              </Link>
              <a
                href={companyInfo.gmb.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-300 transition-colors flex items-center gap-1"
              >
                <span>Directions</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
