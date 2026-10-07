"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Home,
  Car,
  Warehouse,
  Package,
  Truck,
  Globe2,
  Star,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { siteAssets } from "@/lib/site-assets";
import { companyInfo } from "@/lib/company-info";
import { topLocationLinks } from "../packers-movers-jharkhand/locationData";
import { topBiharLocationLinks } from "../packers-movers-bihar/locationData";

// Core Relocation Services matching the screenshot's iconic squircle styles
const servicesMegaList = [
  {
    label: "Household Shifting",
    desc: "Complete home shifting with multi-layer packing and safe handling.",
    href: "/services/household",
    icon: Home,
    iconBg: "bg-blue-600",
  },
  {
    label: "Office Relocation",
    desc: "Fast and organized office shifting with minimal business downtime.",
    href: "/services/office",
    icon: Briefcase,
    iconBg: "bg-indigo-600",
  },
  {
    label: "Vehicle Transport",
    desc: "Safe bike and car carrier service with secure hydraulic loading.",
    href: "/services/vehicle",
    icon: Car,
    iconBg: "bg-blue-600",
  },
  {
    label: "Warehousing Services",
    desc: "Short-term and long-term secure, moisture-free storage spaces.",
    href: "/services/storage",
    icon: Warehouse,
    iconBg: "bg-cyan-600",
  },
  {
    label: "Loading & Unloading",
    desc: "Skilled moving manpower with specialized gear to keep goods safe.",
    href: "/services/loading",
    icon: Package,
    iconBg: "bg-emerald-600",
  },
  {
    label: "Domestic Relocation",
    desc: "Intercity and interstate shifting with direct container transport.",
    href: "/services/domestic",
    icon: Truck,
    iconBg: "bg-slate-900",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track scroll position to hide top bar on scroll.
  // Uses hysteresis: hide when scrollY > 50, show again only when scrollY < 10.
  // This prevents flickering when the user stops scrolling near the boundary.
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (prev && y < 10) return false;   // already hidden → show only when well at top
        if (!prev && y > 50) return true;   // already shown → hide only when scrolled enough
        return prev;                         // within dead-zone: keep current state
      });
    };
    // Set initial state without hysteresis
    setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  const prevPathnameRef = useRef(pathname);
  if (prevPathnameRef.current !== pathname) {
    prevPathnameRef.current = pathname;
    if (mobileOpen) setMobileOpen(false);
    if (megaOpen) setMegaOpen(null);
  }

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const onMegaEnter = (label: string) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(label);
  };

  const onMegaLeave = () => {
    megaTimer.current = setTimeout(() => {
      setMegaOpen(null);
    }, 180);
  };

  const toggleMobileAccordion = (key: string) => {
    setMobileSectionOpen((prev) => (prev === key ? null : key));
  };

  return (
    <header className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
      isScrolled ? "shadow-md" : "shadow-xs"
    }`}>
      {/* =========================================================================
          LEVEL 1: EXECUTIVE SLATE TOP BAR
          Clean Midnight Navy with Complete Verified Address + Google Trust + Contacts
          Hides smoothly when page is scrolled down!
          Uses clip + opacity (no max-h) to avoid layout-shift jitter.
          ========================================================================= */}
      <div
        className={`hidden lg:block border-b border-blue-900/40 bg-brand-primary-dark text-blue-100 transition-[opacity,transform] duration-300 ease-in-out ${
          isScrolled
            ? "opacity-0 -translate-y-full h-0 overflow-hidden border-b-0 pointer-events-none"
            : "opacity-100 translate-y-0 h-10"
        }`}
        aria-hidden={isScrolled}
      >
        <div className="mx-auto flex h-10 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 text-[12.5px] font-sans">
          {/* Left: Complete Verified Office Address */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 shrink-0">
              <MapPin size={11} />
            </div>
            <span className="text-slate-300 font-medium truncate">
              <strong className="text-white font-semibold">Registered Office:</strong>{" "}
              {companyInfo.address.full}
            </span>
          </div>

          {/* Right: Phone, Google Rating Badge, WhatsApp Pill */}
          <div className="flex items-center gap-5 shrink-0 pl-6">
            {/* Google Rating Pill */}
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-0.5 rounded-full text-[11px] font-medium text-slate-300">
              <Star size={11} className="fill-amber-400 text-amber-400 shrink-0" />
              <span>
                <strong className="text-amber-400 font-bold">{companyInfo.gmb.rating}</strong> / 5 on Google ({companyInfo.gmb.reviewCount}+ Reviews)
              </span>
            </div>

            {/* Direct Phone Call */}
            <a
              href={companyInfo.telLink}
              className="flex items-center gap-1.5 text-white hover:text-blue-400 transition-colors font-semibold"
            >
              <Phone size={11} className="text-blue-400 fill-current" />
              <span>{companyInfo.formattedPhone}</span>
            </a>

            {/* WhatsApp Support Pill */}
            <a
              href={companyInfo.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 text-[11px] font-extrabold tracking-wide transition-all shadow-none hover:scale-105 active:scale-95"
            >
              <FaWhatsapp size={12} />
              <span>WhatsApp 24x7</span>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          LEVEL 2: MAIN BRAND NAVIGATION BAR
          Logo + Nav Menu + Clean Buttons (Zero Fuzzy Shadow)
          ========================================================================= */}
      <nav className="border-b border-slate-200/80 bg-white relative">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center shrink-0 group">
            <div className="relative h-14 w-52 sm:h-16 sm:w-64 transition-transform duration-200 group-hover:scale-[1.01]">
              <Image
                src={siteAssets.logo}
                alt={companyInfo.name}
                fill
                className="object-contain object-left"
                priority
                unoptimized
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-1 xl:gap-2 lg:flex h-full">
            {/* 1. Home */}
            <Link
              href="/"
              className={`px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                pathname === "/"
                  ? "text-blue-700 bg-blue-50/80 font-extrabold"
                  : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            {/* 2. Services Trigger */}
            <div
              className="flex items-center h-full"
              onMouseEnter={() => onMegaEnter("Services")}
              onMouseLeave={onMegaLeave}
            >
              <Link
                href="/services/household"
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                  pathname.startsWith("/services")
                    ? "text-blue-700 bg-blue-50/80 font-extrabold"
                    : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
                }`}
                aria-expanded={megaOpen === "Services"}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-slate-500 ${
                    megaOpen === "Services" ? "rotate-180 text-blue-700" : ""
                  }`}
                />
              </Link>
            </div>

            {/* 3. Location Trigger */}
            <div
              className="flex items-center h-full"
              onMouseEnter={() => onMegaEnter("Location")}
              onMouseLeave={onMegaLeave}
            >
              <Link
                href="/packers-movers-jharkhand"
                className={`inline-flex items-center gap-1 px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                  pathname.startsWith("/packers-movers-")
                    ? "text-blue-700 bg-blue-50/80 font-extrabold"
                    : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
                }`}
                aria-expanded={megaOpen === "Location"}
              >
                <span>Locations</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 text-slate-500 ${
                    megaOpen === "Location" ? "rotate-180 text-blue-700" : ""
                  }`}
                />
              </Link>
            </div>

            {/* 4. Gallery */}
            <Link
              href="/gallery"
              className={`px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                pathname === "/gallery"
                  ? "text-blue-700 bg-blue-50/80 font-extrabold"
                  : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
              }`}
            >
              Gallery
            </Link>

            {/* 5. About */}
            <Link
              href="/about"
              className={`px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                pathname === "/about"
                  ? "text-blue-700 bg-blue-50/80 font-extrabold"
                  : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
              }`}
            >
              About
            </Link>

            {/* 6. Contact */}
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-full text-[13.5px] font-bold font-sans tracking-wide transition-all ${
                pathname === "/contact"
                  ? "text-blue-700 bg-blue-50/80 font-extrabold"
                  : "text-slate-800 hover:text-blue-700 hover:bg-slate-50"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Right CTAs: Crisp, Professional, Zero Shadows */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Quick Call Pill */}
            <a
              href={companyInfo.telLink}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 transition-all text-slate-800 text-xs font-bold font-heading hover:border-brand/40 hover:text-brand"
            >
              <Phone size={12} className="text-brand fill-current" />
              <span>{companyInfo.formattedPhone}</span>
            </a>

            {/* High-Converting Red Pill CTA Button (Clean Solid, Zero Fuzzy Shadow) */}
            <Link
              href="/#quote"
              className="btn-brand-primary px-5 py-2.5 rounded-full text-xs font-bold font-heading flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 shrink-0 cursor-pointer shadow-none"
            >
              <span>Get A Quote</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile Bar: Logo + Compact Quote Pill + Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/#quote"
              className="btn-brand-primary px-3.5 py-1.5 rounded-full text-[11px] font-bold font-heading transition-all shrink-0 cursor-pointer shadow-none"
            >
              Get A Quote
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="w-9 h-9 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-700 hover:text-slate-900 transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>

        {/* =========================================================================
            FULL-WIDTH CENTERED SERVICES MEGA MENU
            Direct child of nav: Exactly centered across viewport, never cut off!
            ========================================================================= */}
        {megaOpen === "Services" && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-slate-200 border-b border-slate-200 rounded-b-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50 animate-pop-in"
            onMouseEnter={() => onMegaEnter("Services")}
            onMouseLeave={onMegaLeave}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
              {/* Left Pane: 6 Service Cards with Iconic Rounded Squircles */}
              <div>
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                    Verified Shifting & Relocation Solutions
                  </span>
                  <Link
                    href="/services/household"
                    className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1 font-heading"
                  >
                    View All Services <ArrowRight size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {servicesMegaList.map((service) => {
                    const IconComp = service.icon;
                    return (
                      <Link
                        key={service.label}
                        href={service.href}
                        className="group/card flex flex-col justify-between p-4 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50/60 hover:border-slate-350 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <div>
                          {/* Top Row: Squircle Icon + Subtle Arrow */}
                          <div className="flex items-center justify-between mb-3.5">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white ${service.iconBg} shadow-xs transition-transform duration-300 group-hover/card:scale-105`}
                            >
                              <IconComp className="w-5 h-5" />
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover/card:text-blue-700 group-hover/card:translate-x-1 transition-all" />
                          </div>

                          {/* Title in Sora */}
                          <h4 className="text-sm font-bold text-slate-900 font-heading group-hover/card:text-blue-700 transition-colors mb-1.5 leading-snug">
                            {service.label}
                          </h4>

                          {/* Description in Montserrat */}
                          <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-2">
                            {service.desc}
                          </p>
                        </div>

                        {/* Bottom Indicator Bar (Expands on hover) */}
                        <div className="mt-4 h-1 w-8 rounded-full bg-slate-200 group-hover/card:w-14 group-hover/card:bg-blue-600 transition-all duration-300" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Pane: Executive Trust Showcase Card */}
              <div className="rounded-2xl bg-brand-primary p-6 text-white flex flex-col justify-between border border-blue-400/25">
                <div>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4 font-heading">
                    <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                    <span>Google 4.7★ Verified Moving Agency</span>
                  </div>

                  <h3 className="text-xl font-black font-heading leading-tight tracking-tight text-white mb-2.5">
                    Zero Damage, <span className="text-blue-400">Fast & Safe</span> Relocation
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed font-sans mb-5">
                    Multi-layer protective packing, trained loading crew, and dedicated container trucks for stress-free shifting across Ranchi and Pan India.
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>100% Free Pre-Move Estimation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>All-India Transit Insurance Available</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                      <span>GPS-Tracked Real-Time Fleet</span>
                    </div>
                  </div>
                </div>

                {/* Clean Solid Red Pill Button */}
                <Link
                  href="/#quote"
                  className="btn-brand-primary w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-xs font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 font-heading shadow-none"
                >
                  <span>Get Instant Quote</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            FULL-WIDTH CENTERED LOCATIONS MEGA MENU
            Direct child of nav: Exactly centered across viewport
            ========================================================================= */}
        {megaOpen === "Location" && (
          <div
            className="absolute top-full left-0 right-0 w-full bg-white border-t border-slate-200 border-b border-slate-200 rounded-b-[28px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] z-50 animate-pop-in"
            onMouseEnter={() => onMegaEnter("Location")}
            onMouseLeave={onMegaLeave}
          >
            <div className="max-w-[1400px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
              {/* Left Pane: Jharkhand & Bihar Hubs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Jharkhand Hubs */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5">
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-700" />
                      Jharkhand Operational Hubs
                    </span>
                    <Link href="/packers-movers-jharkhand" className="text-[11px] font-bold text-blue-700 hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {topLocationLinks.slice(0, 10).map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition truncate"
                      >
                        {loc.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bihar Hubs */}
                <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5">
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-heading flex items-center gap-1.5">
                      <MapPin size={14} className="text-blue-600" />
                      Bihar Operational Hubs
                    </span>
                    <Link href="/packers-movers-bihar" className="text-[11px] font-bold text-blue-600 hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {topBiharLocationLinks.slice(0, 10).map((loc) => (
                      <Link
                        key={loc.href}
                        href={loc.href}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition truncate"
                      >
                        {loc.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Pane: Pan India Callout */}
              <div className="rounded-2xl bg-brand-primary p-6 text-white flex flex-col justify-between border border-blue-400/25">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-sky-400 bg-sky-400/10 border border-sky-400/20 mb-3 font-heading">
                    <Globe2 className="w-3 h-3 text-sky-400" />
                    <span>Pan-India Coverage</span>
                  </div>
                  <h4 className="text-lg font-extrabold font-heading text-white mb-2">
                    Daily Direct Interstate Routes
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans mb-4">
                    Regular container moving routes connecting Ranchi and Patna with Kolkata, Delhi NCR, Bengaluru, Mumbai, Pune, and Hyderabad.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all font-heading shadow-none"
                >
                  <span>Check Custom Route</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* =========================================================================
          MOBILE OFF-CANVAS DRAWER
          Smooth backdrop + slide-in panel + pill buttons
          ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation Drawer">
          {/* Backdrop with fade */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ease-out"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Off-Canvas Panel */}
          <aside className="fixed right-0 top-0 bottom-0 z-50 w-[85%] max-w-sm bg-white border-l border-slate-200 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header: Brand & Close */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center">
                <div className="relative h-11 w-40">
                  <Image
                    src={siteAssets.logo}
                    alt={companyInfo.name}
                    fill
                    className="object-contain object-left"
                    priority
                    unoptimized
                  />
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-200/80 text-slate-700 flex items-center justify-center hover:bg-slate-300 transition"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-sm font-bold transition ${
                  pathname === "/" ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>Home</span>
                <ArrowRight size={14} className="opacity-40" />
              </Link>

              {/* Mobile Services Accordion */}
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("services")}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-slate-800 text-left"
                >
                  <span>Our Relocation Services</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-slate-400 ${
                      mobileSectionOpen === "services" ? "rotate-180 text-blue-700" : ""
                    }`}
                  />
                </button>
                {mobileSectionOpen === "services" && (
                  <div className="border-t border-slate-200 bg-white p-2 space-y-1">
                    {servicesMegaList.map((service) => (
                      <Link
                        key={service.label}
                        href={service.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        <span>{service.label}</span>
                        <ArrowRight size={12} className="opacity-30" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Locations Accordion */}
              <div className="rounded-2xl border border-slate-200/80 overflow-hidden bg-slate-50/40">
                <button
                  type="button"
                  onClick={() => toggleMobileAccordion("locations")}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold text-slate-800 text-left"
                >
                  <span>Operational Hubs</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 text-slate-400 ${
                      mobileSectionOpen === "locations" ? "rotate-180 text-blue-700" : ""
                    }`}
                  />
                </button>
                {mobileSectionOpen === "locations" && (
                  <div className="border-t border-slate-200 bg-white p-3 space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-700 mb-1">Jharkhand Hubs</p>
                      <div className="grid grid-cols-2 gap-1">
                        {topLocationLinks.slice(0, 8).map((loc) => (
                          <Link
                            key={loc.href}
                            href={loc.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-2 py-1 text-xs text-slate-700 hover:text-blue-700"
                          >
                            {loc.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-1">Bihar Hubs</p>
                      <div className="grid grid-cols-2 gap-1">
                        {topBiharLocationLinks.slice(0, 8).map((loc) => (
                          <Link
                            key={loc.href}
                            href={loc.href}
                            onClick={() => setMobileOpen(false)}
                            className="px-2 py-1 text-xs text-slate-700 hover:text-blue-600"
                          >
                            {loc.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/gallery"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-sm font-bold transition ${
                  pathname === "/gallery" ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>Gallery</span>
                <ArrowRight size={14} className="opacity-40" />
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-sm font-bold transition ${
                  pathname === "/about" ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>About Us</span>
                <ArrowRight size={14} className="opacity-40" />
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-full text-sm font-bold transition ${
                  pathname === "/contact" ? "bg-blue-50 text-blue-700 font-extrabold" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>Contact</span>
                <ArrowRight size={14} className="opacity-40" />
              </Link>

              <Link
                href="/#quote"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-full text-sm font-bold btn-brand-primary transition mt-2 shadow-xs"
              >
                <span>Get Free Moving Quote</span>
                <ArrowRight size={14} />
              </Link>

              {/* Complete Address & Verified Card in Drawer */}
              <div className="mt-4 rounded-2xl bg-brand-primary p-4 text-white text-xs space-y-3 border border-blue-400/20">
                <div className="flex items-start gap-2.5 text-blue-100">
                  <MapPin size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{companyInfo.address.full}</span>
                </div>
                <div className="flex items-center gap-2.5 text-blue-100">
                  <Phone size={14} className="text-amber-400 shrink-0 fill-current" />
                  <span className="font-extrabold text-white">{companyInfo.formattedPhone}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-400">
                  <Star size={13} className="fill-amber-400 text-amber-400 shrink-0" />
                  <span className="font-bold">★ {companyInfo.gmb.rating} (136+ Google Reviews)</span>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Bottom Action Buttons (Zero Shadow) */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={companyInfo.whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 py-2.5 text-center text-xs font-bold text-white transition-colors shadow-none"
                >
                  <FaWhatsapp size={15} />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={companyInfo.telLink}
                  className="btn-brand-primary flex items-center justify-center gap-1.5 rounded-full py-2.5 text-center text-xs font-bold transition-colors shadow-none"
                >
                  <Phone size={13} className="fill-current" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
