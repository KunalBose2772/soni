import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge?: string;
  badgeIcon?: LucideIcon;
  title: string;
  highlight?: string;
  description?: string;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlight,
  description,
  align = "center",
  dark = false,
  className = "",
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col ${
        isCentered ? "items-center text-center mx-auto" : "items-start text-left"
      } max-w-3xl mb-8 sm:mb-10 ${className}`}
    >
      {/* Subtle, understated badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-all ${
            dark
              ? "bg-white/10 border border-white/15 text-brand"
              : "bg-brand-light border border-brand-light text-brand"
          }`}
        >
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5 shrink-0" />}
          <span>{badge}</span>
        </div>
      )}

      {/* Standardized Dual-Colored Sora Heading */}
      <h2
        className={`font-heading font-extrabold tracking-tight text-2xl sm:text-3xl lg:text-4xl leading-tight ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        <span>{title}</span>
        {highlight && (
          <>
            {" "}
            <span className="text-brand">
              {highlight}
            </span>
          </>
        )}
      </h2>

      {/* Natural Montserrat Description */}
      {description && (
        <p
          className={`mt-3 font-sans text-sm sm:text-base leading-relaxed max-w-2xl ${
            dark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
