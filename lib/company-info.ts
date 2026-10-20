/**
 * Centralized Company Contact & Location Information.
 * Single source of truth across all components, metadata, SEO schemas, and CTAs.
 */

export const companyInfo = {
  name: "Sony Packers and Movers",
  legalName: "Sony Packers & Movers Moving Company",
  tagline: "Trusted Relocation & Logistics in Ranchi & Across India",
  description:
    "Professional household, office, vehicle, and local shifting services in Ranchi and all over India. Reliable packing, careful handling, and on-time delivery from Ratu Road, Ranchi.",
  phone: "9835983331",
  formattedPhone: "+91 9835983331",
  telLink: "tel:+919835983331",
  email: "sonypackersranchi@gmail.com",
  whatsappNumber: "919835983331",
  whatsappLink: (message = "Hello! I need a shifting quote.") =>
    `https://wa.me/919835983331?text=${encodeURIComponent(message)}`,
  address: {
    line1: "Shop no- 302, Anmol Plaza, Ratu Road",
    landmark: "Opp. Nirvachan Bhawan",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "834001",
    country: "India",
    full: "Shop no- 302, Anmol Plaza, Ratu Road (Opp. Nirvachan Bhawan), Ranchi, Jharkhand - 834001",
    short: "Anmol Plaza, Ratu Road, Ranchi - 834001",
  },
  geo: {
    latitude: 23.3703,
    longitude: 85.3125,
  },
  workingHours: "24x7 Support (Mon - Sun)",
  socials: {
    facebook: "https://www.facebook.com/sonypackersmovers",
    instagram: "https://www.instagram.com/sonypackersmovers",
    youtube: "https://www.youtube.com/@SonyPackersandMovers",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=Sony%20Packers%20and%20Movers%2C%20Shop%20302%20Anmol%20Plaza%20Ratu%20Road%20Ranchi&t=&z=14&ie=UTF8&iwloc=&output=embed",
  gmb: {
    rating: 4.7,
    reviewCount: 136,
    category: "Transportation service in Ranchi, Jharkhand",
    justdialRating: 4.9,
    justdialReviewCount: 144,
    googleSearchUrl: "https://www.google.com/search?q=sony+packers+and+movers+ranchi",
    googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Sony+Packers+And+Movers+Shop+no+302+Ratu+Rd+opposite+Nirwachan+bhawan+Ranchi",
  },
} as const;
