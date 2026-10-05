export type BiharDistrict = {
  name: string;
  slug: string;
  aliases?: string[];
};

export const biharDistricts: BiharDistrict[] = [
  { name: "Patna", slug: "patna" },
  { name: "Gaya", slug: "gaya" },
  { name: "Muzaffarpur", slug: "muzaffarpur" },
  { name: "Bhagalpur", slug: "bhagalpur" },
  { name: "Darbhanga", slug: "darbhanga" },
  { name: "Purnia", slug: "purnia" },
  { name: "Begusarai", slug: "begusarai" },
  { name: "Munger", slug: "munger" },
  { name: "Nalanda", slug: "nalanda" },
  { name: "Samastipur", slug: "samastipur" },
  { name: "Rohtas", slug: "rohtas", aliases: ["sasaram"] },
  { name: "Vaishali", slug: "vaishali", aliases: ["hajipur"] },
  { name: "West Champaran", slug: "west-champaran" },
  { name: "Madhubani", slug: "madhubani" },
  { name: "Siwan", slug: "siwan" },
  { name: "Saran", slug: "saran", aliases: ["chhapra"] },
  { name: "Aurangabad", slug: "aurangabad" },
  { name: "Jehanabad", slug: "jehanabad" },
  { name: "Nawada", slug: "nawada" },
  { name: "Katihar", slug: "katihar" },
  { name: "Sitamarhi", slug: "sitamarhi" },
  { name: "East Champaran", slug: "east-champaran", aliases: ["motihari"] },
  { name: "Kishanganj", slug: "kishanganj" },
  { name: "Jamui", slug: "jamui" },
  { name: "Sheikhpura", slug: "sheikhpura" },
  { name: "Lakhisarai", slug: "lakhisarai" },
  { name: "Khagaria", slug: "khagaria" },
  { name: "Supaul", slug: "supaul" },
  { name: "Araria", slug: "araria" },
  { name: "Banka", slug: "banka" },
  { name: "Buxar", slug: "buxar" },
  { name: "Kaimur", slug: "kaimur" },
  { name: "Sheohar", slug: "sheohar" },
  { name: "Bhojpur", slug: "bhojpur", aliases: ["arra"] },
  { name: "Saharsa", slug: "saharsa" },
];

export const topBiharLocationLinks = [
  { label: "All Bihar", href: "/packers-movers-bihar" },
  { label: "Patna", href: "/packers-movers-bihar/patna" },
  { label: "Gaya", href: "/packers-movers-bihar/gaya" },
  { label: "Muzaffarpur", href: "/packers-movers-bihar/muzaffarpur" },
  { label: "Bhagalpur", href: "/packers-movers-bihar/bhagalpur" },
  { label: "View-more", href: "/packers-movers-bihar/view-more" },
] as const;

export function getBiharDistrictBySlug(slug: string) {
  return biharDistricts.find((district) => district.slug === slug || district.aliases?.includes(slug));
}

export function biharDistrictRoute(slug: string) {
  return `/packers-movers-bihar/${slug}`;
}

export function biharLocalityRoute(districtSlug: string, localitySlug: string) {
  return `${biharDistrictRoute(districtSlug)}/${localitySlug}`;
}
