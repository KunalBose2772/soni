"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Shield,
  Star,
  ArrowRight,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteAssets } from "@/lib/site-assets";
import { companyInfo } from "@/lib/company-info";

type MediaItem = {
  type: "image" | "video";
  src: string;
  tag: string;
  title: string;
  highlightText: string;
  subtitle: string;
  mobileObjectPosition?: string;
};

const slides: MediaItem[] = [
  {
    type: "image",
    src: siteAssets.sections.heroSlider.slideOne,
    tag: "Ranchi's Trusted Relocation Service",
    title: "Safe & Reliable Packers and Movers in",
    highlightText: "Ranchi",
    subtitle: "Complete home shifting, office relocation, and vehicle transport. Careful packing, respectful staff, and honest pricing.",
    mobileObjectPosition: "object-[58%_center]",
  },
  {
    type: "video",
    src: siteAssets.sections.heroSlider.video,
    tag: "Multi-Layer Packing Protection",
    title: "Careful Packing for All Your",
    highlightText: "Valuable Goods",
    subtitle: "Quality bubble wrap, foam, and strong cartons so your TV, sofa, fridge, and kitchenware reach safely without a scratch.",
    mobileObjectPosition: "object-center",
  },
  {
    type: "image",
    src: siteAssets.sections.heroSlider.slideTwo,
    tag: "Local & All-India Service",
    title: "Door-to-Door Shifting Across",
    highlightText: "India",
    subtitle: "Direct container trucks from Ratu Road, Ranchi to Patna, Kolkata, Delhi NCR, Bangalore, and every district of Jharkhand & Bihar.",
    mobileObjectPosition: "object-[70%_center]",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[current];

  return (
    /* =========================================================================
       EXACT 1-SCREEN VIEWPORT FIT:
       Desktop: 100dvh minus 120px (40px top bar + 80px navbar)
       Mobile: 100dvh minus 72px (mobile navbar)
       No fixed min-height traps so Header + Hero fits in EXACTLY one viewport!
       ========================================================================= */
    <section className="relative h-[calc(100dvh-72px)] lg:h-[calc(100dvh-120px)] w-full overflow-hidden bg-slate-950 flex flex-col justify-between select-none">
      {/* Background Slides with Cinematic Ken-Burns Zoom/Move Effect */}
      {slides.map((s, idx) => (
        <div
          key={s.title}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? "z-10 opacity-100 pointer-events-auto" : "z-0 opacity-0 pointer-events-none"
          }`}
        >
          {s.type === "image" ? (
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={s.src}
                alt={s.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover ${s.mobileObjectPosition ?? "object-center"} sm:object-center ${
                  idx === current ? "animate-hero-ken-burns" : "scale-100"
                }`}
              />
            </div>
          ) : (
            <video
              src={s.src}
              className="h-full w-full object-cover object-center"
              autoPlay
              muted
              loop
              playsInline
            />
          )}

          {/* Clean Filmic Gradient Overlays for High Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
        </div>
      ))}

      {/* =========================================================================
          MAIN HERO CONTENT (Mathematically Vertically Centered Between Header & Bottom Bar)
          ========================================================================= */}
      <div className="relative z-20 flex-1 flex items-center w-full min-h-0">
        <div className="site-container w-full">
          <div className="max-w-3xl text-white">
            {/* Google Rating Pill */}
            <div className="min-h-[28px] sm:min-h-[32px] flex items-center mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md px-3.5 py-1 text-[11px] sm:text-xs font-medium text-white border border-white/15">
                <Star size={12} className="fill-amber-400 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white font-bold">{companyInfo.gmb.rating}</strong>/5 on Google ({companyInfo.gmb.reviewCount}+ customer reviews)
                </span>
              </div>
            </div>

            {/* Dynamic Sora Heading (Fixed Min-Height to eliminate layout shift) */}
            <div className="min-h-[72px] sm:min-h-[96px] md:min-h-[110px] lg:min-h-[125px] flex items-center mb-2.5 sm:mb-3.5">
              <h1
                key={`title-${current}`}
                className="animate-hero-content text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold font-heading text-white leading-[1.15] tracking-tight"
              >
                {slide.title}{" "}
                <span className="text-brand">{slide.highlightText}</span>
              </h1>
            </div>

            {/* Refined Subtitle (Fixed Min-Height to eliminate layout shift) */}
            <div className="min-h-[40px] sm:min-h-[48px] flex items-center mb-5 sm:mb-7">
              <p
                key={`sub-${current}`}
                className="animate-hero-sub text-xs sm:text-sm md:text-base text-slate-200/90 font-sans leading-relaxed max-w-2xl"
              >
                {slide.subtitle}
              </p>
            </div>

            {/* Action Buttons: Unified Rounded-Full, Title Case, font-semibold (Zero Blurry Shadow) */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-5 sm:mb-7">
              <Link
                href="/#quote"
                className="btn-brand-primary inline-flex items-center justify-center gap-2 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 font-sans"
              >
                <span>Get Free Quote</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href={companyInfo.whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 font-sans shadow-xs"
              >
                <FaWhatsapp className="text-base" />
                <span>WhatsApp Us</span>
              </a>

              <Link
                href="/services/household"
                className="hidden sm:inline-flex items-center justify-center rounded-full border border-white/25 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 font-sans"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Highly Optimized Trust Stats (Visible on All Devices) */}
            <div className="flex items-center gap-3.5 sm:gap-6 lg:gap-8 pt-3 sm:pt-4 border-t border-white/15 max-w-lg">
              <div>
                <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-heading text-white leading-none">
                  10<span className="text-brand font-bold">+</span>
                </p>
                <p className="mt-1 text-[10px] sm:text-xs font-medium text-slate-300 font-sans tracking-wide">
                  Years in Ranchi
                </p>
              </div>

              <div className="h-6 sm:h-7 lg:h-8 w-px bg-white/15 shrink-0" />

              <div>
                <p className="text-lg sm:text-2xl lg:text-3xl font-extrabold font-heading text-white leading-none">
                  1,500<span className="text-brand font-bold">+</span>
                </p>
                <p className="mt-1 text-[10px] sm:text-xs font-medium text-slate-300 font-sans tracking-wide">
                  Moves Completed
                </p>
              </div>

              <div className="h-6 sm:h-7 lg:h-8 w-px bg-white/15 shrink-0" />

              <div>
                <p className="text-base sm:text-xl lg:text-2xl font-bold font-heading text-white leading-none whitespace-nowrap">
                  All-India
                </p>
                <p className="mt-1 text-[10px] sm:text-xs font-medium text-slate-300 font-sans tracking-wide">
                  Direct Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SLIDE CONTROLS (Positioned Absolutely - Responsive on Desktop and Mobile)
          ========================================================================= */}
      <div className="absolute z-30 bottom-3 right-4 lg:bottom-16 lg:right-12 flex items-center gap-2.5 sm:gap-3">
        {/* Slide Indicator Tabs (Interactive Pills) */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === current ? "w-7 sm:w-8 bg-brand" : "w-2 sm:w-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}: ${s.tag}`}
            />
          ))}
        </div>

        {/* Next / Prev Controls */}
        <div className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-white/15 px-2 py-1">
          <button
            type="button"
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/15 transition-all"
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-[10px] sm:text-[11px] font-bold font-mono text-slate-300 px-0.5">
            0{current + 1} / 0{slides.length}
          </span>
          <button
            type="button"
            className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-slate-300 hover:text-white hover:bg-white/15 transition-all"
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM ASSURANCE BAR (Hidden on Mobile, Visible on Tablet / Desktop)
          ========================================================================= */}
      <div className="hidden sm:block relative z-30 w-full border-t border-white/15 bg-brand-primary-dark/95 backdrop-blur-md text-slate-200 py-3 sm:py-3.5 shrink-0">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 items-center">
            {/* 1. Zero Hidden Charges */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm">
                <Check size={16} className="text-white" strokeWidth={2.5} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                Zero Hidden Charges
              </p>
            </div>

            {/* 2. Safe Multi-Layer Packing */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm">
                <Shield size={16} className="text-white" strokeWidth={2.2} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                Multi-Layer Packing
              </p>
            </div>

            {/* 3. Dedicated Container Trucks */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm">
                <MapPin size={16} className="text-white" strokeWidth={2.2} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                Dedicated Container Trucks
              </p>
            </div>

            {/* 4. On-Time Doorstep Delivery */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white shrink-0 shadow-sm">
                <Clock3 size={16} className="text-white" strokeWidth={2.2} />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white leading-tight">
                On-Time Doorstep Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

