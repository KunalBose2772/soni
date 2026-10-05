"use client";

import { useEffect, useState } from "react";
import { PhoneCall } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { companyInfo } from "@/lib/company-info";

export default function FloatingContactButtons() {
  const [isScrollActive, setIsScrollActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsScrollActive(true);
      } else {
        setIsScrollActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${companyInfo.whatsappNumber}?text=${encodeURIComponent(
    "Hello Sony Packers & Movers! I need a quote for shifting."
  )}`;
  const callUrl = `tel:${companyInfo.phone}`;

  return (
    <div
      className="fixed right-5 sm:right-6 z-45 flex flex-col gap-3.5 items-end transition-all duration-300 ease-out"
      style={{ bottom: isScrollActive ? "84px" : "24px" }}
    >
      {/* Call Button */}
      <a
        href={callUrl}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label={`Call Sony Packers: ${companyInfo.formattedPhone}`}
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping opacity-75 pointer-events-none" />
        <PhoneCall className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md hidden sm:block">
          Call {companyInfo.formattedPhone}
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 text-white shadow-xl shadow-green-600/30 hover:shadow-green-600/50 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Ring */}
        <span
          className="absolute inset-0 rounded-full bg-green-500/30 animate-ping opacity-75 pointer-events-none"
          style={{ animationDelay: "0.5s" }}
        />
        <FaWhatsapp className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />

        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-[11px] font-bold tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-md hidden sm:block">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
