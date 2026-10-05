"use client";

import { Star, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import SectionHeader from "./ui/SectionHeader";
import { companyInfo } from "@/lib/company-info";

type Review = {
  name: string;
  initial: string;
  avatarBg: string;
  role: string;
  route: string;
  rating: number;
  timeAgo: string;
  text: string;
};

// Row 1 Reviews (Moves Left)
const rowOneReviews: Review[] = [
  {
    name: "Lalit Prasad",
    initial: "L",
    avatarBg: "bg-[#1a73e8]", // Google Blue
    role: "Household Relocation",
    route: "Ranchi ➔ Delhi",
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "I had an excellent experience transporting my belongings from Ranchi to Delhi. The team was professional, the manager was responsible, and the packing materials were of top quality. Reasonable rates and completely stress-free!",
  },
  {
    name: "Biswajit Guchait",
    initial: "B",
    avatarBg: "bg-[#1e8e3e]", // Google Green
    role: "Office Relocation",
    route: "Hazaribagh ➔ Kolkata",
    rating: 5,
    timeAgo: "1 month ago",
    text: "A huge shoutout to the team for making my move from Hazaribagh to Kolkata seamless. Their behavior was wonderful, explained the entire logistics process clearly, and kept me in the loop with regular updates.",
  },
  {
    name: "Prakash Kumar",
    initial: "P",
    avatarBg: "bg-[#d93025]", // Google Red
    role: "Home & Car Move",
    route: "Ranchi ➔ Thane, Mumbai",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "I moved to Thane, Maharashtra with my family. I chose Sony Packers for relocating my household goods and car. They packed each and every good with safety and relocated everything safely without a single scratch.",
  },
  {
    name: "Mukesh Patel",
    initial: "M",
    avatarBg: "bg-[#f9ab00]", // Google Amber
    role: "Intercity Shifting",
    route: "Ranchi ➔ Patna",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Most reliable and efficient service. I was worried about my delicate and expensive household items, but after all things arrived and were assembled perfectly, I know I made the right choice.",
  },
  {
    name: "Priyanka Singh",
    initial: "P",
    avatarBg: "bg-[#9334e6]", // Google Purple
    role: "Local Household Move",
    route: "Local Ranchi (Morabadi ➔ Doranda)",
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Very happy with the service quality. Having a designated movement manager assigned made the entire shifting process convenient and hassle-free. Courteous crew and fast delivery. Highly recommended!",
  },
  {
    name: "K Kumar",
    initial: "K",
    avatarBg: "bg-[#0097a7]", // Google Teal
    role: "Bike & Household Move",
    route: "Ranchi ➔ Jamshedpur",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Outstanding service from start to finish. The team was incredibly professional, efficient, and courteous throughout the entire moving process from Ranchi to Jamshedpur. Thank you Sony Packers!",
  },
];

// Row 2 Reviews (Moves Right)
const rowTwoReviews: Review[] = [
  {
    name: "Sunita Kumari",
    initial: "S",
    avatarBg: "bg-[#e52592]", // Google Magenta
    role: "Residential Shifting",
    route: "Local Ranchi (Ratu Road)",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Nice service. Manoj ji very-very helpful. Mera saman acche se aagya, kuch bhi damage nahi hua hai. Sabhi workers ne bahut mehnat ki aur safely deliver kiya.",
  },
  {
    name: "Binti Kumar Khusi",
    initial: "B",
    avatarBg: "bg-[#e8710a]", // Google Orange
    role: "Office Supplies Relocation",
    route: "Gumla ➔ New Delhi",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Sony Packers & Movers provides exceptional service. Friendly and professional. The expert team helped me safely move our office supplies from Gumla to Delhi without delays.",
  },
  {
    name: "Utkarsh Lal",
    initial: "U",
    avatarBg: "bg-[#1a73e8]", // Google Blue
    role: "Vehicle & Goods Move",
    route: "Local Ranchi (Bariatu)",
    rating: 5,
    timeAgo: "4 weeks ago",
    text: "Very nice service received, they shipped my scooty and household items safely. The staff was polite and punctual. Real-time driver updates throughout transit.",
  },
  {
    name: "Mukul Verma",
    initial: "M",
    avatarBg: "bg-[#1e8e3e]", // Google Green
    role: "Complete Household Move",
    route: "Ranchi ➔ Tata Motors, Jamshedpur",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Helped me move my entire household from Ranchi to Tata Motors. Packing, loading, and transportation were excellent. My experience was completely satisfactory and damage-free.",
  },
  {
    name: "Arvind Mishra",
    initial: "A",
    avatarBg: "bg-[#d93025]", // Google Red
    role: "Domestic Shifting",
    route: "Ranchi ➔ Bengaluru",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Relocated all 3BHK household goods from Ranchi to Bangalore. Packing was done with multiple layers and container arrived on committed date. Zero hassle, superb coordination!",
  },
  {
    name: "Rakesh Sharma",
    initial: "R",
    avatarBg: "bg-[#9334e6]", // Google Purple
    role: "Corporate Office Shifting",
    route: "Ranchi ➔ Dhanbad",
    rating: 5,
    timeAgo: "1 month ago",
    text: "Commercial shifting handled with great care. All IT equipment, monitors, and furniture were wrapped properly and unboxed on the other side seamlessly. Highly satisfied.",
  },
];

// Single Google Review Card Component
function GoogleReviewCard({ review }: { review: Review }) {
  return (
    <article className="w-[330px] sm:w-[400px] shrink-0 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-red-200 transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between select-none">
      <div>
        {/* Card Header: Avatar + Name + Google Logo */}
        <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            {/* Colored Google Initial Avatar */}
            <div
              className={`w-10 h-10 rounded-full ${review.avatarBg} flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0`}
            >
              {review.initial}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate font-heading leading-tight">
                {review.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-sans leading-tight mt-0.5">
                {review.timeAgo}
              </p>
            </div>
          </div>
          {/* Google Icon */}
          <div className="shrink-0 flex items-center gap-1 bg-slate-50 border border-slate-200/60 rounded-full px-2 py-1">
            <FcGoogle size={18} />
          </div>
        </div>

        {/* Rating Stars & Route Pill */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 truncate max-w-[190px]">
            <MapPin size={10} className="text-brand shrink-0" />
            <span className="truncate">{review.route}</span>
          </span>
        </div>

        {/* Review Text */}
        <p className="text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed line-clamp-3 mb-2">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Footer: Verified Badge */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
          <span>Verified Google Review</span>
        </div>
        <span className="text-[10px] text-slate-400 font-medium">{review.role}</span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  return (
    <section className="section-spacing bg-slate-50/60 relative overflow-hidden border-b border-slate-100">
      {/* Top Section Header */}
      <div className="site-container mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <SectionHeader
            align="left"
            title="What Our Customers Say"
            highlight="on Google Reviews"
            description="Real reviews from families and businesses who moved with Sony Packers and Movers in Ranchi and across India."
            className="mb-0 max-w-2xl"
          />

          {/* Google GMB Trust Snapshot Card (Aligned on the same line) */}
          <div className="shrink-0 flex items-center gap-4 bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs self-start lg:self-center">
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
              <FcGoogle size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-950 font-heading leading-none">
                  {companyInfo.gmb.rating}
                </span>
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-500 mt-1">
                Based on <strong className="text-slate-900">{companyInfo.gmb.reviewCount}+ verified reviews</strong>
              </p>
            </div>
            <a
              href={companyInfo.gmb.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 text-xs font-semibold transition-colors shrink-0 ml-1"
            >
              <span>View Google Maps</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          DUAL CONTINUOUS MARQUEE SLIDERS (Left & Right with Pause on Hover)
          ========================================================================= */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-5">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10" />

        {/* Row 1: Smooth Continuous Marquee Moving Left */}
        <div className="animate-marquee-left gap-4 sm:gap-5">
          {rowOneReviews.map((rev, idx) => (
            <GoogleReviewCard key={`r1-a-${idx}`} review={rev} />
          ))}
          {/* Duplicate set for seamless infinite loop */}
          {rowOneReviews.map((rev, idx) => (
            <GoogleReviewCard key={`r1-b-${idx}`} review={rev} />
          ))}
        </div>

        {/* Row 2: Smooth Continuous Marquee Moving Right */}
        <div className="animate-marquee-right gap-4 sm:gap-5">
          {rowTwoReviews.map((rev, idx) => (
            <GoogleReviewCard key={`r2-a-${idx}`} review={rev} />
          ))}
          {/* Duplicate set for seamless infinite loop */}
          {rowTwoReviews.map((rev, idx) => (
            <GoogleReviewCard key={`r2-b-${idx}`} review={rev} />
          ))}
        </div>
      </div>

      {/* Mobile Direct Google Review Link */}
      <div className="site-container mt-6 text-center sm:hidden">
        <a
          href={companyInfo.gmb.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white px-5 py-2.5 text-xs font-semibold"
        >
          <FcGoogle size={16} />
          <span>View all {companyInfo.gmb.reviewCount}+ Google Reviews</span>
          <ExternalLink size={12} />
        </a>
      </div>
    </section>
  );
}
