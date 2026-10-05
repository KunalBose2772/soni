import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import OperationalCityPages from "@/app/components/OperationalCityPages";
import { getNearbyOperationalCities, getOperationalCityBySlug, operationalCities } from "@/lib/operational-cities";

type CityPageParams = {
  city: string;
};

const sharedPincodes = ["221001", "282001", "201301", "110001", "700001", "400001", "560001", "500001", "380001", "411001"];

export function generateStaticParams() {
  return operationalCities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: { params: Promise<CityPageParams> }): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getOperationalCityBySlug(citySlug);

  if (!city) {
    return { title: "Packers and Movers" };
  }

  return {
    title: `Packers and Movers in ${city.name} | Sony Packers and Movers`,
    description: `Trusted packers and movers services in ${city.name} with pincode ${city.pincode}.`,
  };
}

export default async function CityLandingPage({ params }: { params: Promise<CityPageParams> }) {
  const { city: citySlug } = await params;
  const city = getOperationalCityBySlug(citySlug);

  if (!city) notFound();
  if (city.href !== `/packers-movers/${city.slug}`) {
    redirect(city.href);
  }

  const nearbyCities = getNearbyOperationalCities(city.slug, 6);
  const routeDestinations = nearbyCities.slice(0, 5);

  const routes = [
    `${city.name} -> ${routeDestinations[0]?.name ?? "Nearby city"}`,
    `${routeDestinations[1]?.name ?? city.name} -> ${city.name}`,
    `${city.name} Railway Station -> ${routeDestinations[2]?.name ?? "City center"}`,
    `${city.name} Bus Stand -> ${routeDestinations[3]?.name ?? "Nearby locality"}`,
    `${city.name} town -> ${routeDestinations[4]?.name ?? "Surrounding area"}`,
  ];

  const faqs = [
    {
      question: `Do you offer local shifting in ${city.name}?`,
      answer: `Yes, we handle local packing and moving work in ${city.name} for homes, offices, shops, and vehicles.`,
    },
    {
      question: `Can I book same-day service in ${city.name}?`,
      answer: `Same-day service is possible in some cases depending on crew availability and move size. Call us for confirmation.`,
    },
    {
      question: `Do you also handle intercity moves from ${city.name}?`,
      answer: `Yes, we support intercity relocation from ${city.name} to other cities across India.`,
    },
    {
      question: "How do I get a quote?",
      answer: "Call or WhatsApp us with your pickup and drop details, and we will share a quick estimate.",
    },
  ];

  return (
    <main className="overflow-x-clip bg-white">
      <OperationalCityPages
        city={city}
        introCopy={`Based in ${city.name}, we provide trusted home shifting, office relocation, bike transport, car transport, packing, loading, unloading, and relocation support across major nearby areas with pincode ${city.pincode}.`}
        overviewTitle={`Packers and Movers in ${city.name}`}
        // overviewParagraphs={[
        //   `We provide safe, affordable, and reliable relocation support in ${city.name}.`,
        //   `Our service coverage includes household shifting, office relocation, bike and car transport, loading-unloading, and storage assistance.`,
        // ]}
        overviewParagraphs={[
          `Looking for the <strong>best packers and movers in ${city.name}</strong>? We provide trusted household shifting, office relocation, bike transport, car transport, and complete relocation solutions at affordable pricing.`,

          `Our experienced team offers <strong>safe packing</strong>, <strong>loading</strong>, <strong>unloading</strong>, <strong>transportation</strong>, and <strong>unpacking services</strong> across <strong>${city.name}</strong> and nearby areas with timely delivery support.`,

          `As one of the <strong>top-rated packers and movers near ${city.name}</strong>, we help families, offices, and businesses relocate safely with professional moving assistance.`,

          `We cover major residential and commercial areas in <strong>${city.name}</strong> with reliable support for local shifting, intercity relocation, and transport services.`,

          `Whether you need <strong>local shifting</strong>, <strong>office moving</strong>, <strong>household relocation</strong>, or <strong>vehicle transportation</strong>, our trained staff ensures secure handling and smooth delivery.`,

          `Customers choose our <strong>movers and packers service in ${city.name}</strong> for affordable pricing, careful goods handling, quick booking support, and dependable relocation planning.`,

          `We also provide <strong>same-day shifting assistance</strong>, <strong>loading-unloading support</strong>, floor-to-floor handling, and flexible relocation services based on customer requirements.`,

          `From apartments and flats to offices and commercial spaces, our <strong>packing and moving company in ${city.name}</strong> delivers safe, affordable, and stress-free shifting services.`,

          `If you are searching for <strong>reliable movers and packers near me in ${city.name}</strong>, our local team is available for complete relocation, transport, and storage assistance.`,

          `Our professional <strong>packers and movers service in ${city.name}</strong> is designed for secure household shifting, office relocation, furniture moving, and long-distance transportation support.`,
        ]}
        localAreas={[`${city.name} City`, `${city.name} Residential Areas`, `${city.name} Commercial Zones`, `${city.name} Nearby Localities`]}
        localAreaNote={`Local pickup and delivery can be arranged across ${city.name} City, ${city.name} Residential Areas, ${city.name} Commercial Zones, and ${city.name} Nearby Localities. We can also coordinate quick surveys and packing support based on your location.`}
        nearbyCities={nearbyCities}
        nearbyCitiesNote={`Intercity relocation from ${city.name} to ${nearbyCities.map((item) => item.name).join(", ")} is handled with route planning, careful loading, and regular updates.`}
        routes={routes}
        pincodeCoverage={[city.pincode, ...sharedPincodes.slice(0, 4)]}
        faqs={faqs}
      />
    </main>
  );
}
