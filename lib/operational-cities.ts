export type OperationalCity = {
  name: string;
  slug: string;
  pincode: string;
  href: string;
  featured?: boolean;
  aliases?: string[];
};

const stateCityRoutes: Record<string, string> = {
  patna: "/packers-movers-bihar/patna",
  muzaffarpur: "/packers-movers-bihar/muzaffarpur",
  gaya: "/packers-movers-bihar/gaya",
  bhagalpur: "/packers-movers-bihar/bhagalpur",
  ranchi: "/packers-movers-jharkhand/ranchi",
  jamshedpur: "/packers-movers-jharkhand/jamshedpur",
  dhanbad: "/packers-movers-jharkhand/dhanbad",
  bokaro: "/packers-movers-jharkhand/bokaro",
  hazaribagh: "/packers-movers-jharkhand/hazaribagh",
  deoghar: "/packers-movers-jharkhand/deoghar",
};

const makeCity = (
  name: string,
  slug: string,
  pincode: string,
  featured = false,
  aliases?: string[],
  hrefOverride?: string,
): OperationalCity => ({
  name,
  slug,
  pincode,
  href: hrefOverride ?? `/packers-movers/${slug}`,
  featured,
  aliases,
});

export const featuredOperationalCities: OperationalCity[] = [
  makeCity("Patna", "patna", "800001", true, undefined, stateCityRoutes.patna),
  makeCity("Ranchi", "ranchi", "834001", true, undefined, stateCityRoutes.ranchi),
  makeCity("Jamshedpur", "jamshedpur", "831001", true, undefined, stateCityRoutes.jamshedpur),
  makeCity("Dhanbad", "dhanbad", "826001", true, undefined, stateCityRoutes.dhanbad),
  makeCity("Bokaro", "bokaro", "827001", true, undefined, stateCityRoutes.bokaro),
  makeCity("Muzaffarpur", "muzaffarpur", "842001", true, undefined, stateCityRoutes.muzaffarpur),
  makeCity("Gaya", "gaya", "823001", true, undefined, stateCityRoutes.gaya),
  makeCity("Bhagalpur", "bhagalpur", "812001", true, undefined, stateCityRoutes.bhagalpur),
  makeCity("Hazaribagh", "hazaribagh", "825301", true, undefined, stateCityRoutes.hazaribagh),
  makeCity("Deoghar", "deoghar", "814112", true, undefined, stateCityRoutes.deoghar),
];

export const operationalCities: OperationalCity[] = [
  ...featuredOperationalCities,
  makeCity("Banaras (Varanasi)", "banaras-varanasi", "221001"),
  makeCity("Agra", "agra", "282001"),
  makeCity("Noida", "noida", "201301"),
  makeCity("Delhi", "delhi", "110001"),
  makeCity("Haryana", "haryana", "122001"),
  makeCity("Chandigarh", "chandigarh", "160017"),
  makeCity("Uttarakhand", "uttarakhand", "248001"),
  makeCity("Punjab", "punjab", "141001"),
  makeCity("Kolkata", "kolkata", "700001"),
  makeCity("Chennai", "chennai", "600001"),
  makeCity("Mumbai", "mumbai", "400001"),
  makeCity("Bangalore", "bangalore", "560001"),
  makeCity("Hyderabad", "hyderabad", "500001"),
  makeCity("Ahmedabad", "ahmedabad", "380001"),
  makeCity("Pune", "pune", "411001"),
  makeCity("Surat", "surat", "395003"),
  makeCity("Kanpur", "kanpur", "208001"),
  makeCity("Jaipur", "jaipur", "302001"),
  makeCity("Lucknow", "lucknow", "226001"),
  makeCity("Nagpur", "nagpur", "440001"),
  makeCity("Raipur", "raipur", "492001"),
  makeCity("Indore", "indore", "452001"),
  makeCity("Baroda (Vadodara)", "baroda-vadodara", "390001"),
  makeCity("Bhopal", "bhopal", "462001"),
  makeCity("Coimbatore", "coimbatore", "641001"),
  makeCity("Ludhiana", "ludhiana", "141001"),
  makeCity("Kochi", "kochi", "682001"),
  makeCity("Meerut", "meerut", "250001"),
  makeCity("Asansol", "asansol", "713301"),
  makeCity("Visakhapatnam", "visakhapatnam", "530001"),
  makeCity("Bhubaneswar", "bhubaneswar", "751001"),
  makeCity("Nashik", "nashik", "422001"),
  makeCity("Kolhapur", "kolhapur", "416003"),
  makeCity("Madurai", "madurai", "625001"),
  makeCity("Rajkot", "rajkot", "360001"),
  makeCity("Jabalpur", "jabalpur", "482001"),
  makeCity("Amritsar", "amritsar", "143001"),
  makeCity("Allahabad (Prayagraj)", "allahabad-prayagraj", "211001"),
  makeCity("Vijayawada", "vijayawada", "520001"),
  makeCity("Aurangabad", "aurangabad", "431001"),
  makeCity("Srinagar", "srinagar", "190001"),
  makeCity("Cuttack", "cuttack", "753001"),
  makeCity("Howrah (Hawra)", "howrah-hawra", "711101"),
];

export function getOperationalCityBySlug(slug: string) {
  return operationalCities.find((city) => city.slug === slug || city.aliases?.includes(slug));
}

export function getOperationalCityRoute(slug: string) {
  return `/packers-movers/${slug}`;
}

export function getNearbyOperationalCities(currentSlug: string, count = 6) {
  const currentIndex = operationalCities.findIndex((city) => city.slug === currentSlug || city.aliases?.includes(currentSlug));

  if (currentIndex === -1) {
    return featuredOperationalCities.slice(0, count);
  }

  const nearby: OperationalCity[] = [];
  const total = operationalCities.length;

  for (let offset = 1; nearby.length < count && offset < total; offset += 1) {
    const nextCity = operationalCities[(currentIndex + offset) % total];
    const prevCity = operationalCities[(currentIndex - offset + total) % total];

    if (nextCity.slug !== currentSlug && !nearby.some((city) => city.slug === nextCity.slug)) {
      nearby.push(nextCity);
    }

    if (nearby.length >= count) break;

    if (prevCity.slug !== currentSlug && !nearby.some((city) => city.slug === prevCity.slug)) {
      nearby.push(prevCity);
    }
  }

  return nearby.slice(0, count);
}
