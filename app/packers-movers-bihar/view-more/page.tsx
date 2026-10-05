import type { Metadata } from "next";
import { Globe2, HandCoins, LifeBuoy, MapPinned, Rocket, Star } from "lucide-react";
import { BiharStatePage } from "../../components/BiharPages";
import { biharDistricts } from "../locationData";
import { siteAssets } from "@/lib/site-assets";

export const metadata: Metadata = {
  title: "More Bihar Districts | Sony Packers and Movers",
  description:
    "Explore more packers and movers service areas across Bihar and open district-specific pages for local relocation support.",
};

export default function ViewMoreBiharPage() {
  return (
    <BiharStatePage
      title="Explore More Bihar Districts"
      eyebrow="District coverage"
      subtitle="Open any district page below to see local shifting support, service areas, and SEO-friendly location details."
      heroImage={siteAssets.pages.biharViewMore.heroBanner}
      introTitle="All Bihar districts in one place"
      introCopy="The main location menu shows our top service areas, and this page lists every Bihar district we cover. Each district page includes localities, nearby districts, maps, and booking support."
      highlights={[
        {
          title: "District Pages",
          description: "Each district has a dedicated URL for SEO and local search.",
          icon: MapPinned,
          accentClass: "bg-sky-500",
        },
        {
          title: "Clear Pricing",
          description: "Useful for comparing local and intercity moving requirements.",
          icon: HandCoins,
          accentClass: "bg-orange-500",
        },
        {
          title: "Fast Response",
          description: "Call and WhatsApp support for quick enquiries in any district.",
          icon: LifeBuoy,
          accentClass: "bg-emerald-500",
        },
        {
          title: "Timely Delivery",
          description: "Planned transport support for local and outstation movement.",
          icon: Rocket,
          accentClass: "bg-violet-500",
        },
        {
          title: "Trust Factor",
          description: "A strong service network built for reliable relocation support.",
          icon: Star,
          accentClass: "bg-amber-500",
        },
        {
          title: "Statewide Reach",
          description: "Bihar district coverage from Patna to Kishanganj.",
          icon: Globe2,
          accentClass: "bg-slate-800",
        },
      ]}
      districts={biharDistricts}
      faqTitle="Questions about more Bihar districts"
      faqSubtitle="Use this page to open the district that matches your move location."
      faqs={[
        {
          question: "Will every district have its own page?",
          answer:
            "Yes, each district has a dedicated page with localities, nearby areas, and service details you can expand over time.",
        },
        {
          question: "Can I start from this page and then move to a district page?",
          answer: "Yes, every district chip below opens a dedicated district page.",
        },
        {
          question: "Why keep a view-more page?",
          answer: "It helps users discover full coverage while keeping the top menu focused on main cities.",
        },
        {
          question: "Can I request a new district page later?",
          answer: "Absolutely. We can add more city-specific SEO pages whenever you are ready.",
        },
      ]}
      faqImages={[
        siteAssets.common.routePlanning,
        siteAssets.common.movingTeamThree,
        siteAssets.common.packingMaterials,
      ]}
    />
  );
}
