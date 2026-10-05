import type { Metadata } from "next";
import { Globe2, HandCoins, LifeBuoy, MapPinned, Rocket, Star } from "lucide-react";
import { JharkhandStatePage } from "../../components/JharkhandPages";
import { jharkhandDistricts } from "../locationData";
import { siteAssets } from "@/lib/site-assets";

export const metadata: Metadata = {
  title: "More Jharkhand Districts | Sony Packers and Movers",
  description:
    "Explore more packers and movers service areas across Jharkhand and open district-specific pages for local relocation support.",
};

export default function ViewMoreJharkhandPage() {
  return (
    <JharkhandStatePage
      title="Explore More Jharkhand Districts"
      eyebrow="District coverage"
      subtitle="Open any district page below to see local shifting support, service areas, and SEO-friendly location details."
      heroImage={siteAssets.pages.jharkhandViewMore.heroBanner}
      introTitle="All Jharkhand districts in one place"
      introCopy="The main location menu shows our top service areas, and this page keeps every Jharkhand district within one click. Each district page can be expanded later with its own city-specific content, while the URL structure stays clean for SEO."
      highlights={[
        {
          title: "District Pages",
          description: "Each district has a dedicated URL for future SEO expansion.",
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
          description: "Jharkhand district coverage from Ranchi to West Singhbhum.",
          icon: Globe2,
          accentClass: "bg-slate-800",
        },
      ]}
      districts={jharkhandDistricts}
      faqTitle="Questions about more Jharkhand districts"
      faqSubtitle="Use this page to open the district that matches your move location."
      faqs={[
        {
          question: "Will every district have its own page?",
          answer:
            "Yes, the structure is ready for separate district pages so you can expand content as you add more city-specific SEO pages.",
        },
        {
          question: "Can I start from this page and then move to a district page?",
          answer:
            "Yes, every district chip below opens a dedicated district page with the same core service structure.",
        },
        {
          question: "Why keep a view-more page?",
          answer:
            "It helps users discover the full coverage list while keeping the top menu clean and focused on the main service areas.",
        },
        {
          question: "Can I request a new district page later?",
          answer:
            "Absolutely. We can add a separate SEO page for any district or city whenever you are ready.",
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
