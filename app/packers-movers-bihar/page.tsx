import type { Metadata } from "next";
import { Globe2, HandCoins, LifeBuoy, MapPinned, Rocket, Star } from "lucide-react";
import CallToAction from "../components/CallToAction";
import OperationalCities from "../components/OperationalCities";
import { operationalCities } from "@/lib/operational-cities";
import { BiharStatePage } from "../components/BiharPages";
import { biharDistricts } from "./locationData";
import { siteAssets } from "@/lib/site-assets";

export const metadata: Metadata = {
  title: "Packers and Movers in Bihar | Sony Packers and Movers",
  description:
    "Trusted packers and movers across Bihar with support for Patna, Gaya, Muzaffarpur, Bhagalpur, and all major districts.",
};

export default function BiharLandingPage() {
  return (
    <>
      <BiharStatePage
        title="Packers and Movers Across All of Bihar"
        eyebrow="Bihar's Trusted Shifting Partner"
        subtitle="We help families and businesses shift safely across Bihar with reliable packing, loading, transportation, and on-time delivery support."
        heroImage={siteAssets.pages.bihar.heroBanner}
        introTitle="Packers and Movers Across All of Bihar"
        introCopy="We provide safe, affordable, and reliable packing and moving services across Bihar. From Patna to Gaya, Muzaffarpur to Bhagalpur, our team handles household shifting, office relocation, bike and car transport, loading-unloading, and storage support in every major district. Whether you are moving locally within your city or relocating to another part of Bihar, we ensure proper packing, careful handling, timely transportation, and smooth delivery from start to finish."
        highlights={[
          {
            title: "Free Visit",
            description: "Quick inspection and moving guidance before you confirm the booking.",
            icon: MapPinned,
            accentClass: "bg-sky-500",
          },
          {
            title: "Competitive Price",
            description: "Clear pricing with no hidden surprises on local or district moves.",
            icon: HandCoins,
            accentClass: "bg-orange-500",
          },
          {
            title: "Fast Delivery",
            description: "Efficient packing and route planning for smooth and timely shifting.",
            icon: Rocket,
            accentClass: "bg-emerald-500",
          },
          {
            title: "24x7 Support",
            description: "Call and WhatsApp help whenever you need a quick update or booking.",
            icon: LifeBuoy,
            accentClass: "bg-amber-500",
          },
          {
            title: "5 Star Rated",
            description: "Trusted by customers for careful handling and reliable service.",
            icon: Star,
            accentClass: "bg-violet-500",
          },
          {
            title: "Statewide Network",
            description: "Local and intercity support across all major Bihar districts.",
            icon: Globe2,
            accentClass: "bg-slate-800",
          },
        ]}
        districts={biharDistricts}
        faqTitle="Bihar Moving FAQs"
        faqSubtitle="Helpful answers for families and businesses booking a move anywhere in Bihar."
        faqs={[
          {
            question: "Do you provide service across all districts in Bihar?",
            answer:
              "Yes, we support moves across major Bihar districts, including Patna, Gaya, Muzaffarpur, Bhagalpur, and many more.",
          },
          {
            question: "Can I get local shifting support in my district?",
            answer:
              "Yes, we provide local packers and movers service for household, office, and vehicle shifting based on your district and pickup point.",
          },
          {
            question: "Do you handle intercity moves from Bihar?",
            answer:
              "Yes, we arrange intercity relocation from Bihar to nearby cities and across India with route planning and packed loading control.",
          },
          {
            question: "How do I book quickly?",
            answer:
              "You can call us directly or send a WhatsApp message for a quick survey, quotation, and schedule confirmation.",
          },
        ]}
        faqImages={[
          siteAssets.sections.faq.faqSlideOne,
          siteAssets.sections.faq.faqSlideTwo,
          siteAssets.sections.faq.faqSlideThree,
        ]}
      />
       <OperationalCities
              title="Operational Cities"
              subtitle="Browse the key city-wise service pages we support across India."
              cities={operationalCities}
            />
      <CallToAction />
    </>
  );
}
