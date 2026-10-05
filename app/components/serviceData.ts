import type { ComponentType } from "react";
import { Briefcase, Home, Package, Shield, Truck, Warehouse } from "lucide-react";
import { siteAssets } from "@/lib/site-assets";

const SERVICE_HOUSE_BANNER = siteAssets.services.household.heroBanner;
const SERVICE_OFFICE_BANNER = siteAssets.services.office.heroBanner;

export type ServiceData = {
  slug: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  shortTitle: string;
  desc: string;
  description: string;
  details: string[];
  image: string;
  accent: string;
  coverage: {
    heading: string;
    intro: string;
    local: string[];
    intercity: string[];
    promise: string;
  };
  booking: {
    title: string;
    leftLabel: string;
    leftItems: string[];
    rightLabel: string;
    rightItems: string[];
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  faqImages: string[];
  cta: {
    title: string;
    subtitle: string;
  };
};

const genericFaqs = [
  {
    question: "How early should I book my move?",
    answer:
      "For better slot availability, book at least 3 to 5 days in advance. For urgent moves, contact us and we will try to arrange support quickly.",
  },
  {
    question: "Do you provide packing materials and labor?",
    answer:
      "Yes, we provide packing materials, trained labor, loading, transport, unloading, and coordination support for a smooth move.",
  },
  {
    question: "Can I track my goods during transit?",
    answer:
      "Yes, our team provides movement updates and route coordination so you stay informed during the shift.",
  },
  {
    question: "Do you offer insurance support?",
    answer:
      "Transit insurance options are available based on the type of move and distance. Our team can explain the coverage before booking.",
  },
];

export const services: ServiceData[] = [
  {
    slug: "household",
    icon: Home,
    title: "Household Shifting",
    shortTitle: "Household",
    desc: "Complete home relocation with careful packing, safe loading, transport, and unloading.",
    description:
      "Complete home relocation with careful packing, safe loading, transport, and unloading for a smooth family move.",
    details: ["Furniture dismantling and packing", "Fragile item protection", "Floor-to-floor shifting support"],
    image: SERVICE_HOUSE_BANNER,
    accent: "bg-sky-600",
    coverage: {
      heading: "Reliable packing and moving support across key Jharkhand cities",
      intro:
        "Based in Ranchi, we support household moves across local neighborhoods and intercity routes with careful planning and timely execution.",
      local: ["Ranchi city", "Ratu Road", "Lalpur", "Doranda", "Harmu", "Kanke", "Booty More"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Ramgarh", "Deoghar", "Dumka"],
      promise: "Packing guidance, route coordination, loading support, and delivery follow-up with a customer-first approach.",
    },
    booking: {
      title: "What's Included in Every Household Move",
      leftLabel: "Included in booking",
      leftItems: ["Professional packing with quality materials", "GPS-tracked transport vehicles", "Door-to-door service"],
      rightLabel: "Why choose our household team?",
      rightItems: [
        "Trained and background-checked crew",
        "Bubble wrap, cartons, and stretch film",
        "Safe handling of furniture and fragile items",
        "Support before, during, and after delivery",
      ],
    },
    faqs: genericFaqs,
    faqImages: [
      siteAssets.services.household.faqSlideOne,
      siteAssets.services.household.faqSlideTwo,
      siteAssets.services.household.faqSlideThree,
    ],
    cta: {
      title: "Ready to move your home without the stress?",
      subtitle: "Call us for a fast survey, careful packing, and a transparent household shifting quote.",
    },
  },
  {
    slug: "office",
    icon: Briefcase,
    title: "Office Relocation",
    shortTitle: "Office",
    desc: "Fast and organized office shifting with minimal downtime and careful handling.",
    description:
      "Fast and organized office shifting with minimal downtime, careful handling of documents, electronics, and furniture.",
    details: ["IT equipment handling", "Weekend relocation options", "Workspace setup support"],
    image: SERVICE_OFFICE_BANNER,
    accent: "bg-indigo-600",
    coverage: {
      heading: "Office relocation support planned around your business hours",
      intro:
        "From single cabins to complete floor shifts, we plan office relocation work around your business hours for minimal downtime.",
      local: ["Ranchi business district", "Harmu", "Lalpur", "Doranda", "Main Road", "Kanke Road"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"],
      promise: "Desk mapping, file handling, IT coordination, and after-move setup support for a smooth restart.",
    },
    booking: {
      title: "What's Included in Every Office Move",
      leftLabel: "Included in booking",
      leftItems: ["Workstation packing and labeling", "Electronics-safe handling", "Weekend move planning"],
      rightLabel: "Why book our office team?",
      rightItems: [
        "Minimal downtime scheduling",
        "Secure handling of files and devices",
        "Quick assembly and placement support",
        "Transparent coordination with your admin team",
      ],
    },
    faqs: [
      {
        question: "Can you relocate our office after business hours?",
        answer: "Yes, we can plan evening or weekend office shifts to reduce disruption to your operations.",
      },
      ...genericFaqs.slice(1),
    ],
    faqImages: [
      siteAssets.services.office.faqSlideOne,
      siteAssets.services.office.faqSlideTwo,
      siteAssets.services.office.faqSlideThree,
    ],
    cta: {
      title: "Need a smooth office relocation plan?",
      subtitle: "We can schedule a quick survey and prepare a practical moving plan that fits your office hours.",
    },
  },
  {
    slug: "domestic",
    icon: Truck,
    title: "Domestic Relocation",
    shortTitle: "Domestic",
    desc: "Smooth city-to-city and state-to-state relocation with route planning and live coordination.",
    description:
      "Smooth city-to-city and state-to-state relocation with route planning, secure transport, and live coordination.",
    details: ["Jharkhand intercity routes", "Route planning and dispatch", "Real-time update support"],
    image: siteAssets.services.domestic.cardImage,
    accent: "bg-orange-600",
    coverage: {
      heading: "Domestic moving coverage with route planning and live coordination",
      intro:
        "We manage domestic moves from Ranchi to major Jharkhand cities and beyond, with route planning and packed loading control.",
      local: ["Ranchi", "Nearby suburbs", "Warehouse pickup points", "Apartment complexes"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Giridih", "Deoghar", "Medininagar", "Dumka"],
      promise: "Route monitoring, timely dispatch, safe transit, and delivery updates for long-distance moves.",
    },
    booking: {
      title: "What's Included in Every Domestic Move",
      leftLabel: "Included in booking",
      leftItems: ["Route planning and dispatch support", "Safe packing for long-distance travel", "Driver coordination"],
      rightLabel: "Why book our domestic team?",
      rightItems: [
        "Reliable intercity movement planning",
        "Secure handling across long routes",
        "Regular progress updates",
        "Flexible coordination for different cities",
      ],
    },
    faqs: [
      {
        question: "Do you handle moves outside Jharkhand?",
        answer: "Yes, domestic relocation support is available for intercity and interstate moves based on route and schedule.",
      },
      ...genericFaqs.slice(1),
    ],
    faqImages: [
      siteAssets.services.domestic.faqSlideOne,
      siteAssets.services.domestic.faqSlideTwo,
      siteAssets.services.domestic.faqSlideThree,
    ],
    cta: {
      title: "Planning a city-to-city move?",
      subtitle: "Let us coordinate the packing, route, and delivery timeline so your domestic shift stays simple.",
    },
  },
  {
    slug: "loading",
    icon: Package,
    title: "Loading & Unloading",
    shortTitle: "Loading",
    desc: "Skilled loading and unloading service with experienced manpower to keep goods safe.",
    description:
      "Skilled loading and unloading service with experienced manpower to keep your goods safe during every transfer.",
    details: ["Trained labour team", "Heavy item handling", "Damage-free unloading"],
    image: siteAssets.services.loading.cardImage,
    accent: "bg-emerald-600",
    coverage: {
      heading: "Loading and unloading support for homes, shops, and offices",
      intro:
        "We provide loading and unloading support for homes, shops, and offices with careful manpower deployment and safe handling.",
      local: ["Ranchi", "Business hubs", "Residential complexes", "Storage points"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar"],
      promise: "Proper lifting support, item stacking, and careful unloading to reduce damage risk.",
    },
    booking: {
      title: "What's Included in Every Loading Job",
      leftLabel: "Included in booking",
      leftItems: ["Trained labour support", "Heavy item handling", "Safe stacking and placement"],
      rightLabel: "Why book our loading team?",
      rightItems: [
        "Faster operations with experienced manpower",
        "Reduced handling damage",
        "Suitable for home and commercial goods",
        "Can be combined with transport service",
      ],
    },
    faqs: [
      {
        question: "Can I book only loading or only unloading?",
        answer: "Yes, we can provide loading-only or unloading-only assistance based on your move requirements.",
      },
      ...genericFaqs.slice(1),
    ],
    faqImages: [
      siteAssets.services.loading.faqSlideOne,
      siteAssets.services.loading.faqSlideTwo,
      siteAssets.services.loading.faqSlideThree,
    ],
    cta: {
      title: "Need a trained labour team for loading?",
      subtitle: "We can send manpower for safe lifting, stacking, and unloading at your chosen location.",
    },
  },
  {
    slug: "storage",
    icon: Warehouse,
    title: "Warehousing Services",
    shortTitle: "Storage",
    desc: "Short-term and long-term storage for household and commercial goods in secure spaces.",
    description:
      "Short-term and long-term storage for household and commercial goods in secure, organized warehouse spaces.",
    details: ["Clean storage space", "Inventory-safe handling", "Flexible storage periods"],
    image: siteAssets.services.storage.cardImage,
    accent: "bg-cyan-600",
    coverage: {
      heading: "Safe storage coverage for household and commercial goods",
      intro:
        "When you need a safe pause between moving out and moving in, our storage support keeps your goods secure and organized.",
      local: ["Ranchi warehouse zone", "Nearby pickup areas", "Business storage points"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
      promise: "Clean space, proper labeling, and controlled handling for short-term or long-term storage.",
    },
    booking: {
      title: "What's Included in Every Storage Plan",
      leftLabel: "Included in booking",
      leftItems: ["Secure warehouse space", "Inventory-safe handling", "Flexible storage duration"],
      rightLabel: "Why book our storage service?",
      rightItems: [
        "Suitable for household and commercial goods",
        "Organized placement and retrieval support",
        "Easy coordination for pickup and return",
        "Reliable for short or long holding periods",
      ],
    },
    faqs: [
      {
        question: "Can I store goods for a few weeks only?",
        answer: "Yes, storage can be arranged for short-term or long-term needs based on your schedule.",
      },
      ...genericFaqs.slice(1),
    ],
    faqImages: [
      siteAssets.services.storage.faqSlideOne,
      siteAssets.services.storage.faqSlideTwo,
      siteAssets.services.storage.faqSlideThree,
    ],
    cta: {
      title: "Need secure storage for your goods?",
      subtitle: "Talk to us about short-term or long-term warehouse support for household or commercial items.",
    },
  },
  {
    slug: "vehicle",
    icon: Shield,
    title: "Vehicle Transportation",
    shortTitle: "Vehicle",
    desc: "Safe bike and car transport with proper loading, padding, and transit attention.",
    description:
      "Safe bike and car transport with proper loading, padding, and transit attention so your vehicle reaches securely.",
    details: ["Bike and car shifting", "Protective packaging support", "Door-to-door vehicle delivery"],
    image: siteAssets.services.vehicle.cardImage,
    accent: "bg-slate-900",
    coverage: {
      heading: "Vehicle transport coverage with careful route planning",
      intro:
        "We coordinate vehicle transportation with careful loading, route planning, and delivery follow-up so your vehicle stays protected.",
      local: ["Ranchi", "Nearby service points", "Residential pickup zones"],
      intercity: ["Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Medininagar"],
      promise: "Padding, secure fastening, and door-to-door movement support for two-wheelers and cars.",
    },
    booking: {
      title: "What's Included in Every Vehicle Move",
      leftLabel: "Included in booking",
      leftItems: ["Protective packing support", "Safe loading and fastening", "Door-to-door vehicle delivery"],
      rightLabel: "Why book our vehicle team?",
      rightItems: [
        "Special care for bikes and cars",
        "Reduced transit risk with proper handling",
        "Clear delivery coordination",
        "Works for local and long-distance transport",
      ],
    },
    faqs: [
      {
        question: "Do you shift bikes and cars separately?",
        answer: "Yes, we can arrange transport for bikes, scooters, and cars based on the vehicle type and destination.",
      },
      ...genericFaqs.slice(1),
    ],
    faqImages: [
      siteAssets.services.vehicle.faqSlideOne,
      siteAssets.services.vehicle.faqSlideTwo,
      siteAssets.services.vehicle.faqSlideThree,
    ],
    cta: {
      title: "Need safe transport for your car or bike?",
      subtitle: "We’ll plan the loading, padding, and delivery so your vehicle reaches the destination safely.",
    },
  },
];

export const defaultServiceSlug = "household";

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
