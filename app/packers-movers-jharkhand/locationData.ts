export type JharkhandDistrict = {
  name: string;
  slug: string;
  aliases?: string[];
};

export const jharkhandDistricts: JharkhandDistrict[] = [
  { name: "Ranchi", slug: "ranchi" },
  { name: "Bokaro", slug: "bokaro" },
  { name: "Ramgarh", slug: "ramgarh", aliases: ["ramgharh"] },
  { name: "Hazaribagh", slug: "hazaribagh" },
  { name: "Dhanbad", slug: "dhanbad" },
  { name: "Jamshedpur", slug: "jamshedpur" },
  { name: "Deoghar", slug: "deoghar" },
  { name: "Dumka", slug: "dumka" },
  { name: "Giridih", slug: "giridih" },
  { name: "Godda", slug: "godda" },
  { name: "Gumla", slug: "gumla" },
  { name: "Chatra", slug: "chatra" },
  { name: "Garhwa", slug: "garhwa" },
  { name: "Jamtara", slug: "jamtara" },
  { name: "Khunti", slug: "khunti" },
  { name: "Koderma", slug: "koderma" },
  { name: "Latehar", slug: "latehar" },
  { name: "Lohardaga", slug: "lohardaga" },
  { name: "Pakur", slug: "pakur" },
  { name: "Palamu", slug: "palamu" },
  { name: "Sahebganj", slug: "sahebganj" },
  { name: "Seraikela Kharsawan", slug: "seraikela-kharsawan" },
  { name: "Simdega", slug: "simdega" },
  { name: "West Singhbhum", slug: "west-singhbhum" },
  { name: "East Singhbhum", slug: "east-singhbhum" },
];

export const topLocationLinks = [
  { label: "All Jharkhand", href: "/packers-movers-jharkhand" },
  { label: "Ranchi", href: "/packers-movers-jharkhand/ranchi" },
  { label: "Bokaro", href: "/packers-movers-jharkhand/bokaro" },
  { label: "Ramgarh", href: "/packers-movers-jharkhand/ramgarh" },
  { label: "Hazaribagh", href: "/packers-movers-jharkhand/hazaribagh" },
  { label: "View-more", href: "/packers-movers-jharkhand/view-more" },
] as const;

export function getDistrictBySlug(slug: string) {
  return jharkhandDistricts.find(
    (district) => district.slug === slug || district.aliases?.includes(slug),
  );
}

export function districtRoute(slug: string) {
  return `/packers-movers-jharkhand/${slug}`;
}

export function localityRoute(districtSlug: string, localitySlug: string) {
  return `${districtRoute(districtSlug)}/${localitySlug}`;
}
