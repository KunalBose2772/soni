import type { ComponentType } from "react";
import { BadgeCheck, HandCoins, Rocket, ShieldCheck } from "lucide-react";
import { siteAssets } from "@/lib/site-assets";

type FAQItem = {
  question: string;
  answer: string;
};

export type DistrictProfile = {
  introCopy: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  serviceHighlights: {
    title: string;
    description: string;
    icon: ComponentType<{ className?: string; size?: number }>;
    tone: string;
  }[];
  localities: string[];
  localityNote: string;
  nearbyDistricts: string[];
  nearbyNote: string;
  quoteTitle: string;
  quoteCopy: string;
  popularRoutes: string[];
  pincodeCoverage: string[];
  faqs: FAQItem[];
  faqImages: string[];
  heroImage: string;
};

export type LocalityProfile = {
  areaDisplayName: string;
  mapQuery: string;
  mapHeading: string;
  introCopy: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  localityNote: string;
  quoteTitle: string;
  quoteCopy: string;
  faqs: FAQItem[];
  popularRoutes: string[];
  pincodeCoverage: string[];
  localities: string[];
};

type DistrictConfig = {
  introCopy?: string;
  localities: string[];
  nearbyDistricts: string[];
  heroImage: string;
  faqs?: FAQItem[];
  popularRoutes?: string[];
  pincodeCoverage?: string[];
};

const serviceHighlights: DistrictProfile["serviceHighlights"] = [
  {
    title: "Free Visit",
    description: "Quick inspection and local route guidance before you confirm the booking.",
    icon: BadgeCheck,
    tone: "bg-pink-500",
  },
  {
    title: "Affordable Price",
    description: "Transparent quotes for local shifting, loading, and intercity routes.",
    icon: HandCoins,
    tone: "bg-blue-600",
  },
  {
    title: "Fast Delivery",
    description: "Efficient packing and dispatch planning for smooth, on-time movement.",
    icon: Rocket,
    tone: "bg-orange-500",
  },
  {
    title: "24x7 Support",
    description: "Call and WhatsApp help whenever you need an update or booking help.",
    icon: ShieldCheck,
    tone: "bg-slate-900",
  },
];

const defaultFaqs = (districtName: string): FAQItem[] => [
  {
    question: `Do you offer local shifting in ${districtName}?`,
    answer: `Yes, we handle local packing and moving work in ${districtName} for homes, offices, shops, and vehicles.`,
  },
  {
    question: `Can I book same-day service in ${districtName}?`,
    answer: `Same-day service is possible in some cases depending on crew availability and move size. Call us for confirmation.`,
  },
  {
    question: `Do you also handle intercity moves from ${districtName}?`,
    answer: `Yes, we support intercity relocation from ${districtName} to other districts and cities across India.`,
  },
  {
    question: "How do I get a quote?",
    answer: "Call or WhatsApp us with your pickup and drop details, and we will share a quick estimate.",
  },
];

const districtPopularRoutes: Record<string, string[]> = {
  ranchi: ["Ranchi → Hazaribagh", "Ranchi → Bokaro", "Ranchi → Jamshedpur", "Ranchi → Ramgarh", "Ranchi → Dhanbad"],
  bokaro: ["Bokaro → Dhanbad", "Bokaro → Ranchi", "Bokaro → Hazaribagh", "Bokaro → Ramgarh", "Bokaro → Giridih"],
  ramgarh: ["Ramgarh → Ranchi", "Ramgarh → Hazaribagh", "Ramgarh → Bokaro", "Ramgarh → Chatra", "Ramgarh → Dhanbad"],
  hazaribagh: ["Hazaribagh → Ranchi", "Hazaribagh → Bokaro", "Hazaribagh → Dhanbad", "Hazaribagh → Ramgarh", "Hazaribagh → Giridih"],
  dhanbad: ["Dhanbad → Bokaro", "Dhanbad → Ranchi", "Dhanbad → Jamshedpur", "Dhanbad → Giridih", "Dhanbad → Hazaribagh"],
  jamshedpur: ["Jamshedpur → Ranchi", "Jamshedpur → Jamtara", "Jamshedpur → Chaibasa", "Jamshedpur → Ghatshila", "Jamshedpur → East Singhbhum"],
  deoghar: ["Deoghar → Dumka", "Deoghar → Jamtara", "Deoghar → Godda", "Deoghar → Giridih", "Deoghar → Ranchi"],
  dumka: ["Dumka → Deoghar", "Dumka → Godda", "Dumka → Pakur", "Dumka → Ranchi", "Dumka → Jamshedpur"],
  giridih: ["Giridih → Dhanbad", "Giridih → Hazaribagh", "Giridih → Koderma", "Giridih → Ranchi", "Giridih → Deoghar"],
  godda: ["Godda → Dumka", "Godda → Deoghar", "Godda → Pakur", "Godda → Bhagalpur", "Godda → Ranchi"],
  gumla: ["Gumla → Ranchi", "Gumla → Khunti", "Gumla → Simdega", "Gumla → West Singhbhum", "Gumla → Ranchi via Gumla Road"],
  chatra: ["Chatra → Hazaribagh", "Chatra → Ramgarh", "Chatra → Daltonganj", "Chatra → Ranchi", "Chatra → Gaya route"],
  garhwa: ["Garhwa → Palamu", "Garhwa → Latehar", "Garhwa → Daltonganj", "Garhwa → Ranchi", "Garhwa → Sonbhadra route"],
  jamtara: ["Jamtara → Deoghar", "Jamtara → Dumka", "Jamtara → Giridih", "Jamtara → Ranchi", "Jamtara → Dhanbad"],
  khunti: ["Khunti → Ranchi", "Khunti → Gumla", "Khunti → Simdega", "Khunti → West Singhbhum", "Khunti → Bokaro"],
  koderma: ["Koderma → Hazaribagh", "Koderma → Giridih", "Koderma → Ranchi", "Koderma → Gaya route", "Koderma → Dhanbad"],
  latehar: ["Latehar → Palamu", "Latehar → Garhwa", "Latehar → Ranchi", "Latehar → Daltonganj", "Latehar → Chatra"],
  lohardaga: ["Lohardaga → Ranchi", "Lohardaga → Gumla", "Lohardaga → Khunti", "Lohardaga → Simdega", "Lohardaga → Ranchi via Kisko"],
  pakur: ["Pakur → Godda", "Pakur → Sahebganj", "Pakur → Dumka", "Pakur → Bhagalpur", "Pakur → Ranchi"],
  palamu: ["Palamu → Daltonganj", "Palamu → Garhwa", "Palamu → Latehar", "Palamu → Ranchi", "Palamu → Aurangabad route"],
  sahebganj: ["Sahebganj → Pakur", "Sahebganj → Godda", "Sahebganj → Dumka", "Sahebganj → Bhagalpur", "Sahebganj → Ranchi"],
  "seraikela-kharsawan": [
    "Seraikela Kharsawan → Jamshedpur",
    "Seraikela Kharsawan → Chaibasa",
    "Seraikela Kharsawan → Ranchi",
    "Seraikela Kharsawan → West Singhbhum",
    "Seraikela Kharsawan → East Singhbhum",
  ],
  simdega: ["Simdega → Ranchi", "Simdega → Khunti", "Simdega → Gumla", "Simdega → West Singhbhum", "Simdega → Jamshedpur"],
  "west-singhbhum": ["West Singhbhum → Chaibasa", "West Singhbhum → Jamshedpur", "West Singhbhum → Ranchi", "West Singhbhum → Simdega", "West Singhbhum → Ghatshila"],
  "east-singhbhum": ["East Singhbhum → Jamshedpur", "East Singhbhum → Ghatshila", "East Singhbhum → Ranchi", "East Singhbhum → West Singhbhum", "East Singhbhum → Chaibasa"],
};

const districtPincodes: Record<string, string[]> = {
  ranchi: ["834001", "834002", "834003", "834004", "834005", "834006", "834007", "834008", "834009", "834010", "834011", "834012", "834013", "835217"],
  bokaro: ["827001", "827004", "827005", "827006", "827009", "827010", "827011", "827012", "827013", "827014", "827015", "827016", "827017", "827302", "827303", "827304", "827306", "827307", "827009", "829301"],
  ramgarh: ["829101", "829102", "829103", "829104", "829105", "829106", "829107", "829108", "829109", "829110", "829111", "829112", "829113", "829114", "829115", "829116", "829117", "829118", "829119", "829120", "829121", "829122", "829123", "829124", "829125", "829126", "829127", "829128", "829129", "825101"],
  hazaribagh: ["825301", "825302", "825303", "825304", "825311", "825312", "825313", "825314", "825315", "825316", "825317", "825318", "825319", "825320", "825321", "825322", "825323", "825324", "825325", "825326", "825327", "825328", "825329", "825330", "825402", "825403", "825404", "825405", "825406", "825407", "825408", "825409"],
  dhanbad: ["826001", "826002", "826003", "826004", "826005", "826006", "826007", "826008", "826009", "826010", "826011", "826012", "826013", "828101", "828102", "828103", "828104", "828105", "828106", "828107", "828108", "828109", "828110", "828111", "828112", "828113", "828114", "828115", "828116", "828117", "828118", "828119", "828120", "828121", "828122", "828123", "828124", "828125", "828126", "828127", "828128", "828129", "828130", "828131", "828132", "828133", "828134", "828135"],
  jamshedpur: ["831001", "831002", "831003", "831004", "831005", "831006", "831007", "831008", "831009", "831010", "831011", "831012", "831013", "831014", "831015", "831016", "831017", "831018", "831019"],
  deoghar: ["814112", "814113", "814114", "814115", "814116", "814117", "814118", "814119", "814120", "814121", "814122", "814123", "814124", "814125", "814126", "814127", "814128", "814129", "814130", "814131", "814132", "814133", "814143", "814152", "814153", "814154"],
  dumka: ["814101", "814102", "814103", "814104", "814105", "814106", "814107", "814108", "814109", "814110", "814111", "814112", "814113", "814114", "814115", "814116", "814117", "814118", "814119", "814120", "814121", "814122"],
  giridih: ["815301", "815302", "815303", "815304", "815305", "815306", "815307", "815308", "815309", "815310", "815311", "815312", "815313", "815314", "815315", "815316", "815317", "815318", "815319", "815320", "815321", "815322", "815323", "815324", "815325", "815326", "815327", "815328", "815329", "815330", "815331", "815332", "815351", "815353"],
  godda: ["814133", "814141", "814142", "814143", "814144", "814145", "814146", "814147", "814148", "814149", "814150", "814151", "814152", "814153", "814154", "814155", "814156", "814157", "814158", "814159", "814160", "814161"],
  gumla: ["835207", "835208", "835209", "835210", "835211", "835212", "835213", "835214", "835215", "835216", "835217", "835218", "835219", "835220", "835221", "835222", "835223", "835224", "835225", "835226", "835227", "835228", "835229", "835230", "835231", "835232", "835233", "835234"],
  chatra: ["825401", "825402", "825403", "825404", "825405", "825406", "825407", "825408", "825409", "825410", "825411", "825412", "825413", "825414", "825415"],
  garhwa: ["822101", "822102", "822103", "822104", "822105", "822106", "822107", "822108", "822109", "822110", "822111", "822112", "822113", "822114", "822115", "822116", "822117", "822118", "822119", "822120", "822121"],
  jamtara: ["815351", "815352", "815353", "815354", "815355", "815356", "815357", "815358", "815359", "815360", "815361", "815362", "815363", "815364", "815365", "815366", "815367", "815384", "815385", "815387"],
  khunti: ["835210", "835211", "835212", "835213", "835214", "835215", "835216", "835217", "835218", "835219", "835220", "835221", "835222", "835223", "835224", "835225", "835226", "835227", "835228", "835229", "835230", "835231", "835232", "835403"],
  koderma: ["825409", "825410", "825411", "825412", "825413", "825414", "825415", "825416", "825417", "825418"],
  latehar: ["822101", "822102", "822103", "822104", "822105", "822106", "822107", "822108", "822109", "822110", "822111", "822112", "822113", "822114", "822115", "822116", "822117", "822118", "822119", "822120", "822121", "822122", "822123", "822124", "822125", "822126"],
  lohardaga: ["835302", "835303", "835304", "835305", "835306", "835307", "835308", "835309", "835310", "835311", "835312", "835313", "835314", "835315"],
  pakur: ["816101", "816102", "816103", "816104", "816105", "816106", "816107", "816108", "816109", "816110", "816111", "816112", "816113", "816114", "816115", "816116", "816117", "816118", "816119", "816120", "816121", "816122", "816123", "816124"],
  palamu: ["822101", "822102", "822103", "822104", "822105", "822106", "822107", "822108", "822109", "822110", "822111", "822112", "822113", "822114", "822115"],
  sahebganj: ["816101", "816102", "816103", "816104", "816105", "816106", "816107", "816108", "816109", "816110", "816111", "816112", "816113", "816114", "816115", "816116", "816117", "816118", "816119", "816120", "816121", "816122", "816123", "816124", "816125", "816126", "816127"],
  "seraikela-kharsawan": ["832401", "832402", "832403", "832404", "832405", "832406", "832407", "832408", "832409", "832410"],
  simdega: ["835223", "835224", "835225", "835226", "835227", "835228", "835229", "835230", "835231", "835232"],
  "west-singhbhum": ["833201", "833202", "833203", "833204", "833205", "833206", "833207", "833208", "833209", "833210", "833211", "833212"],
  "east-singhbhum": ["831001", "831002", "831003", "831004", "831005", "831006", "831007", "831008", "831009", "831010", "831011", "831012", "831013", "831014", "831015", "831016", "831017", "831018", "831019"],
};

function buildDistrictProfile(districtName: string, slug: string, config: DistrictConfig): DistrictProfile {
  return {
    introCopy:
      config.introCopy ??
      `We provide packers and movers support in ${districtName} for household shifting, office relocation, vehicle transport, and loading work with careful planning and transparent communication.`,
    overviewTitle: `Packers and Movers in <span class="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">${districtName}</span>`,
    overviewParagraphs: [
      `Looking for the <strong>best packers and movers in ${districtName}</strong> We provide trusted household shifting, office relocation, bike transport, car transport, and complete moving solutions at affordable prices.`,
      `Our experienced team offers <strong>safe packing</strong>, <strong>loading</strong>, <strong>unloading</strong>, <strong>transportation</strong>, and <strong>unpacking services</strong> across <strong>${districtName}</strong> and nearby areas with timely delivery support.`,
      `As one of the <strong>top-rated packers and movers near ${districtName}</strong>, we help families and businesses relocate locally and across Jharkhand without hassle.`,
      `We cover major localities including <strong>${config.localities.slice(0, 3).join(", ")}</strong> along with nearby residential and commercial areas for fast and reliable shifting services.`,
      `Whether you need local shifting in <strong>${districtName}</strong>, <strong>intercity relocation</strong>, <strong>office moving</strong>, or <strong>vehicle transportation</strong>, our trained staff ensures secure handling and professional support.`,
      `Customers choose our <strong>movers and packers service in ${districtName}</strong> for transparent pricing, careful goods handling, quick booking assistance, and dependable relocation planning.`,
      `We also provide <strong>nearby packers and movers support</strong> with <strong>pincode-based scheduling</strong>, <strong>same-day shifting assistance</strong>, floor-to-floor handling, and flexible moving options.`,
      `From small apartments to large office setups, our <strong>packing and moving company in ${districtName}</strong> delivers affordable, safe, and stress-free relocation services.`,
      `If you are searching for <strong>reliable movers and packers near me in ${districtName}</strong>, our local team is available for home shifting, storage, transport, and complete relocation assistance.`,
      `Our professional <strong>packers and movers service in ${districtName}</strong> is designed for safe household shifting, commercial relocation, furniture moving and long-distance transportation.`,
    ],
    serviceHighlights,
    localities: config.localities,
    localityNote: `Local pickup and delivery can be arranged across ${config.localities.join(", ")}. We can also coordinate quick surveys and packing support based on your location.`,
    nearbyDistricts: config.nearbyDistricts,
    nearbyNote: `Intercity relocation from ${districtName} to ${config.nearbyDistricts.join(", ")} is handled with route planning, careful loading, and regular updates.`,
    quoteTitle: `Request a ${districtName} moving quote`,
    quoteCopy: `Tell us your pickup location, destination, and move type. We will prepare a simple quote for ${districtName} and nearby routes.`,
    popularRoutes: config.popularRoutes ?? districtPopularRoutes[slug] ?? [],
    pincodeCoverage: config.pincodeCoverage ?? districtPincodes[slug] ?? [],
    faqs: config.faqs ?? defaultFaqs(districtName),
    faqImages: [
      siteAssets.common.movingTeamOne,
      siteAssets.common.movingTeamTwo,
      siteAssets.common.movingTeamThree,
    ],
    heroImage: config.heroImage,
  };
}

export function localitySlug(localityName: string) {
  return localityName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function pickPincodesForLocality(pincodes: string[], localityName: string) {
  if (pincodes.length <= 8) {
    return pincodes;
  }

  const seed = localityName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const start = seed % pincodes.length;
  const selection: string[] = [];

  for (let i = 0; i < 8; i += 1) {
    selection.push(pincodes[(start + i) % pincodes.length]);
  }

  return [...new Set(selection)];
}

function pickNearbyLocalities(localities: string[], localityName: string) {
  if (localities.length <= 5) {
    return localities;
  }

  const currentIndex = Math.max(
    0,
    localities.findIndex((item) => item.toLowerCase() === localityName.toLowerCase()),
  );

  const nearby: string[] = [];

  for (let offset = -2; offset <= 2; offset += 1) {
    const index = currentIndex + offset;
    if (index >= 0 && index < localities.length) {
      nearby.push(localities[index]);
    }
  }

  return [...new Set([localityName, ...nearby])];
}

export function getLocalityProfile(districtName: string, districtSlug: string, localityName: string): LocalityProfile {
  const districtProfile = getDistrictProfile(districtName, districtSlug);
  const localities = pickNearbyLocalities(districtProfile.localities, localityName);
  const pincodeCoverage = pickPincodesForLocality(districtProfile.pincodeCoverage, localityName);
  const popularRoutes = [
    `${localityName} → ${districtName} Railway Station`,
    `${localityName} → ${districtName} Bus Stand`,
    `${localityName} → ${districtProfile.localities.find((item) => item !== localityName) ?? districtName} `,
    `${localityName} → ${districtProfile.nearbyDistricts[0] ?? "Ranchi"}`,
    `${localityName} → ${districtProfile.nearbyDistricts[1] ?? "Bokaro"}`,
  ].map((route) => route.trim());

  return {
    areaDisplayName: `${localityName}, ${districtName}`,
    mapQuery: `${localityName}, ${districtName}, Jharkhand`,
    mapHeading: `Our Service Area in ${localityName}, ${districtName}`,
    introCopy: `Need packers and movers in ${localityName}, ${districtName}? We provide home shifting, office relocation, loading-unloading, and vehicle transport with local route planning and quick support.`,
    overviewTitle: `Packers and Movers in <span class="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">${localityName}</span>, ${districtName}`,
    overviewParagraphs: [
      `Looking for <strong>best packers and movers in ${localityName}</strong>? We provide trusted and affordable shifting services for households, offices, shops, and commercial spaces across <strong>${districtName}</strong>.`,
    
      `Our experienced movers and packers team handles <strong>packing, loading, transportation, unloading, unpacking, and furniture setup</strong> using quality packing materials and safe handling methods.`,
    
      `Whether you are moving within <strong>${localityName}</strong>, relocating to another area in <strong>${districtName}</strong>, or planning an intercity shift, we ensure organized transport and timely delivery support.`,
    
      `We offer reliable <strong>home shifting services in ${localityName}</strong> with proper route planning, trained manpower, careful packaging, and transparent moving charges without hidden costs.`,
    
      `Customers searching for <strong>packers and movers near ${localityName}</strong> trust our team for fast response, secure transportation, damage-free handling, and professional relocation assistance.`,
    
      `Our services include <strong>household shifting, office relocation, bike transport, car transport, loading-unloading, storage support, and local moving services</strong> throughout ${districtName}.`,
    
      `We also support nearby pickup and delivery points around <strong>${localityName}</strong> with same-day survey availability, flexible scheduling, and WhatsApp booking support for quick assistance.`,
    
      `As one of the trusted <strong>moving companies in ${districtName}</strong>, we focus on safe packing, careful loading, and smooth relocation experiences for families, students, and businesses.`,
    
      `If you are searching for <strong>affordable movers and packers in ${localityName}</strong>, our local relocation experts are available for both short-distance and long-distance shifting needs.`,
    
      `Our professional team ensures every move from <strong>${localityName}</strong> is managed with attention to safety, delivery timelines, transportation planning, and customer satisfaction.`,
    ],
    localityNote: `Primary service focus for this page is ${localityName}, and we also support nearby areas across ${districtName} for local and intercity relocation.`,
    quoteTitle: `Request a moving quote for ${localityName}`,
    quoteCopy: `Share your pickup point in ${localityName}, destination, and move size. Our team will provide a quick quote and booking support.`,
    faqs: [
      {
        question: `Do you provide home shifting in ${localityName}?`,
        answer: `Yes, we provide complete household shifting in ${localityName} with packing, loading, transportation, and unloading support.`,
      },
      {
        question: `Can I book office relocation in ${localityName}, ${districtName}?`,
        answer: `Yes, we handle office relocation in ${localityName} with careful handling of workstations, documents, and equipment.`,
      },
      {
        question: `Do you offer intercity moves from ${localityName}?`,
        answer: `Yes, we arrange intercity and interstate shifting from ${localityName} with route planning and regular updates.`,
      },
      {
        question: "How can I get a quick estimate?",
        answer: `Call or WhatsApp us with your move details from ${localityName} and we will share a quick estimate.`,
      },
    ],
    popularRoutes,
    pincodeCoverage,
    localities,
  };
}

export function getDistrictProfile(districtName: string, slug: string): DistrictProfile {
  const profiles: Record<string, DistrictConfig> = {
    ranchi: {
      introCopy:
        "Based in Ranchi, we provide home shifting, office relocation, vehicle transport, and loading support across Ratu Road, Lalpur, Doranda, Harmu, Kanke, Booty More, and nearby routes.",
      localities: ["Hatia", "Harmu", "Lalpur", "Doranda", "Kanke", "Booty More", "Namkum", "Ratu Road"],
      nearbyDistricts: ["Ramgarh", "Hazaribagh", "Bokaro", "Khunti"],
      heroImage: siteAssets.common.movingTeamOne,
      faqs: [
        {
          question: "Do you provide packing and moving in Ranchi city?",
          answer: "Yes, we support Ranchi city moves with trained packing, loading, transport, and careful unloading at the destination.",
        },
        {
          question: "Can you handle office relocation in Ranchi?",
          answer: "Yes, we can plan office relocation in Ranchi with minimal downtime and proper handling of files, devices, and furniture.",
        },
        {
          question: "Do you serve nearby Ranchi localities too?",
          answer: "Yes, we work across nearby Ranchi localities and also help with intercity moves from the city.",
        },
        {
          question: "How fast can I book?",
          answer: "Call us or send a WhatsApp message for a quick survey and booking confirmation.",
        },
      ],
    },
    bokaro: {
      introCopy: "We offer Bokaro packers and movers support for household shifting, office moves, vehicle transport, and loading with safe handling and route planning.",
      localities: ["Bokaro Steel City", "Sector 4", "Sector 9", "Chas", "Balidih", "Bermo", "Gomia", "Chandankyari"],
      nearbyDistricts: ["Dhanbad", "Giridih", "Ramgarh", "Hazaribagh"],
      heroImage: siteAssets.services.office.faqSlideOne,
    },
    ramgarh: {
      introCopy: "We provide Ramgarh packers and movers service for local shifting, office relocation, vehicle transport, and loading with careful planning and verified manpower.",
      localities: ["Ramgarh Cantt", "Bara", "Rajrappa", "Patratu", "Gola", "Mandu", "Kuju", "Barkakana"],
      nearbyDistricts: ["Ranchi", "Hazaribagh", "Bokaro", "Chatra"],
      heroImage: siteAssets.services.vehicle.cardImage,
    },
    hazaribagh: {
      introCopy: "We support Hazaribagh moves with household packing, office relocation, storage coordination, and safe transport across local areas and nearby districts.",
      localities: ["Hazaribagh town", "Barkagaon", "Ichak", "Katkamsandi", "Katkamdag", "Bishnugarh", "Padma"],
      nearbyDistricts: ["Ramgarh", "Chatra", "Koderma", "Giridih"],
      heroImage: siteAssets.services.storage.cardImage,
    },
    dhanbad: {
      introCopy: "We support packers and movers work in Dhanbad with house shifting, office relocation, vehicle transport, and loading help across the city and nearby coal-belt routes.",
      localities: ["Bank More", "Hirapur", "Saraidhela", "Jharia", "Sindri", "Katras", "Govindpur", "Dhaiya"],
      nearbyDistricts: ["Bokaro", "Giridih", "Jamtara", "Deoghar"],
      heroImage: siteAssets.common.routePlanning,
    },
    jamshedpur: {
      introCopy: "For Jamshedpur, we arrange local and intercity shifting with careful packing across major commercial and residential belts of the steel city.",
      localities: ["Bistupur", "Sakchi", "Sonari", "Kadma", "Mango", "Telco", "Jugsalai", "Adityapur"],
      nearbyDistricts: ["Seraikela Kharsawan", "East Singhbhum", "West Singhbhum", "Bokaro"],
      heroImage: siteAssets.common.districtDispatchPlanning,
    },
    deoghar: {
      introCopy: "We handle Deoghar packers and movers service for household relocation, office shifting, and vehicle transport around the temple town and nearby routes.",
      localities: ["Baidyanath Dham", "Jasidih", "Madhupur", "Rohini", "Castair's Town", "Sarath"],
      nearbyDistricts: ["Jamtara", "Giridih", "Dumka", "Godda"],
      heroImage: siteAssets.common.districtLoadingWorkflow,
    },
    dumka: {
      introCopy: "In Dumka, we provide smooth packing and moving support with local pickup planning for homes, shops, and office movement across the district.",
      localities: ["Dumka town", "Hansdiha", "Kathikund", "Masalia", "Shikaripara", "Jarmundi"],
      nearbyDistricts: ["Deoghar", "Godda", "Pakur", "Sahebganj"],
      heroImage: siteAssets.common.districtMovePlanning,
    },
    giridih: {
      introCopy: "We provide Giridih packers and movers service with careful packing, loading, and transport across town and nearby market belts.",
      localities: ["Giridih town", "Bagodar", "Dumri", "Tisri", "Khandoli", "Bengabad"],
      nearbyDistricts: ["Dhanbad", "Deoghar", "Koderma", "Hazaribagh"],
      heroImage: siteAssets.services.domestic.cardImage,
    },
    godda: {
      introCopy: "Godda moves are handled with district-wise route planning for homes, offices, and vehicle transport across the town and rural service points.",
      localities: ["Godda town", "Mahagama", "Pathargama", "Poraiyahat", "Boarijor", "Meharma"],
      nearbyDistricts: ["Dumka", "Pakur", "Sahebganj", "Deoghar"],
      heroImage: siteAssets.common.logisticsWarehouse,
    },
    gumla: {
      introCopy: "In Gumla, our packers and movers team supports residential shifting, office moves, and loading work with route planning for district and nearby village belts.",
      localities: ["Gumla town", "Bishunpur", "Raidih", "Basia", "Ghaghra", "Chainpur", "Dumri"],
      nearbyDistricts: ["Simdega", "Khunti", "Lohardaga", "West Singhbhum"],
      heroImage: siteAssets.services.loading.faqSlideThree,
    },
    chatra: {
      introCopy: "Chatra packers and movers support is available for local shifting, office relocation, and vehicle movement with planning around town and connecting road routes.",
      localities: ["Chatra town", "Itkhori", "Simaria", "Hunterganj", "Tandwa", "Kanhachatti"],
      nearbyDistricts: ["Hazaribagh", "Koderma", "Latehar", "Ranchi"],
      heroImage: siteAssets.common.movingTeamThree,
    },
    garhwa: {
      introCopy: "We offer Garhwa packers and movers service for household shifting and office relocation with reliable support for town and nearby transport routes.",
      localities: ["Garhwa town", "Nagar Untari", "Ranka", "Meral", "Bhawanathpur", "Ramna"],
      nearbyDistricts: ["Palamu", "Latehar", "Ranchi", "Lohardaga"],
      heroImage: siteAssets.services.office.faqSlideOne,
    },
    jamtara: {
      introCopy: "Jamtara moves are planned with local and intercity support for households, offices, loading, and vehicle shifting across the district.",
      localities: ["Jamtara town", "Narayanpur", "Kundahit", "Nala", "Fatehpur", "Karma"],
      nearbyDistricts: ["Deoghar", "Dumka", "Giridih", "Dhanbad"],
      heroImage: siteAssets.pages.gallery.heroBanner,
    },
    khunti: {
      introCopy: "We support Khunti packers and movers work for local shifting, office movement, and transport planning across the town and nearby routes.",
      localities: ["Khunti town", "Murhu", "Torpa", "Rania", "Arki", "Karra"],
      nearbyDistricts: ["Ranchi", "Simdega", "Gumla", "West Singhbhum"],
      heroImage: siteAssets.services.office.faqSlideThree,
    },
    koderma: {
      introCopy: "Koderma packers and movers service covers home shifting, office relocation, and vehicle transport with safe loading across town and nearby belts.",
      localities: ["Koderma town", "Jhumri Telaiya", "Chandwara", "Domchanch", "Jainagar", "Markacho"],
      nearbyDistricts: ["Hazaribagh", "Giridih", "Chatra", "Ranchi"],
      heroImage: siteAssets.services.loading.faqSlideTwo,
    },
    latehar: {
      introCopy: "Latehar shifting support is available for homes, offices, and vehicle transport with careful route planning for the district and forest-side routes.",
      localities: ["Latehar town", "Balumath", "Chandwa", "Barwadih", "Manika", "Mahuadanr"],
      nearbyDistricts: ["Palamu", "Garhwa", "Chatra", "Lohardaga"],
      heroImage: siteAssets.services.domestic.faqSlideThree,
    },
    lohardaga: {
      introCopy: "We provide Lohardaga packers and movers support for residential shifting and office relocation with local route planning and quick support.",
      localities: ["Lohardaga town", "Kuru", "Bhandra", "Senha", "Kisko", "Peshrar"],
      nearbyDistricts: ["Ranchi", "Gumla", "Khunti", "Latehar"],
      heroImage: siteAssets.common.districtCustomerSupport,
    },
    pakur: {
      introCopy: "Pakur packers and movers service is ideal for local shifting, loading, and vehicle movement across town, railway-side pockets, and nearby routes.",
      localities: ["Pakur town", "Malpahari", "Hiranpur", "Littipara", "Maheshpur", "Amrapara"],
      nearbyDistricts: ["Godda", "Sahebganj", "Dumka", "Deoghar"],
      heroImage: siteAssets.services.household.faqSlideTwo,
    },
    palamu: {
      introCopy: "Palamu moves are handled with support for Medininagar and nearby towns, including household shifting, office relocation, and vehicle transport.",
      localities: ["Medininagar", "Daltonganj", "Hussainabad", "Haidernagar", "Chhatarpur", "Bishrampur", "Japla"],
      nearbyDistricts: ["Garhwa", "Latehar", "Chatra", "Ranchi"],
      heroImage: siteAssets.services.vehicle.cardImage,
    },
    sahebganj: {
      introCopy: "Sahebganj packers and movers support covers the river-town belt, market areas, and nearby pickup points for home and office moves.",
      localities: ["Sahibganj town", "Rajmahal", "Borio", "Mandro", "Barharwa", "Pathna"],
      nearbyDistricts: ["Pakur", "Godda", "Deoghar", "Dumka"],
      heroImage: siteAssets.services.office.faqSlideOne,
    },
    "seraikela-kharsawan": {
      introCopy: "Seraikela Kharsawan shifting service is arranged across Seraikela, Kharsawan, Chandil, Gamharia, and nearby industrial routes.",
      localities: ["Seraikela", "Kharsawan", "Chandil", "Gamharia", "Adityapur", "Ichagarh", "Nimdih"],
      nearbyDistricts: ["Jamshedpur", "West Singhbhum", "East Singhbhum", "Ranchi"],
      heroImage: siteAssets.common.routePlanning,
    },
    simdega: {
      introCopy: "Simdega packers and movers support covers the district town and surrounding blocks with safe packing, loading, and route coordination.",
      localities: ["Simdega town", "Bano", "Kolebira", "Kurdeg", "Bolba", "Thethaitanger"],
      nearbyDistricts: ["Khunti", "Gumla", "West Singhbhum", "Khunti"],
      heroImage: siteAssets.common.districtTruckLoading,
    },
    "west-singhbhum": {
      introCopy: "West Singhbhum moves are supported across Chaibasa and nearby mining and forest-side routes with careful packing and planned dispatch.",
      localities: ["Chaibasa", "Noamundi", "Manoharpur", "Chakradharpur", "Goilkera", "Jagannathpur", "Tonto"],
      nearbyDistricts: ["Seraikela Kharsawan", "East Singhbhum", "Simdega", "Ranchi"],
      heroImage: siteAssets.common.logisticsWarehouse,
    },
    "east-singhbhum": {
      introCopy: "East Singhbhum shifting support covers Jamshedpur city and surrounding blocks with local packing, transport, and vehicle delivery planning.",
      localities: ["Jamshedpur", "Ghatshila", "Musabani", "Dumaria", "Baharagora", "Patamda", "Potka"],
      nearbyDistricts: ["Seraikela Kharsawan", "West Singhbhum", "Dhanbad", "Jamshedpur"],
      heroImage: siteAssets.common.districtLoadingWorkflow,
    },
  };

  const profile = profiles[slug];

  if (!profile) {
    return buildDistrictProfile(districtName, slug, {
      localities: [`${districtName} town center`, `${districtName} market area`, `${districtName} residential belt`, `${districtName} bus stand`],
      nearbyDistricts: ["Ranchi", "Bokaro", "Hazaribagh", "Dhanbad"],
      heroImage: siteAssets.common.districtDispatchPlanning,
    });
  }

  return buildDistrictProfile(districtName, slug, profile);
}





