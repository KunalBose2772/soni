import type { Metadata } from "next";

import OperationalCities from "@/app/components/OperationalCities";
import PageHeroBanner from "@/app/components/PageHeroBanner";
import CallToAction from "@/app/components/CallToAction";
import { operationalCities } from "@/lib/operational-cities";
import { siteAssets } from "@/lib/site-assets";

export const metadata: Metadata = {
  title: "Operational Cities | Sony Packers and Movers",
  description: "Explore our packers and movers service locations across major Indian cities with SEO-friendly URLs.",
};

export default function OperationalCitiesPage() {
  return (
    <main className="overflow-x-clip bg-white">
      <PageHeroBanner
        title="Operational Cities"
        subtitle="Browse our city-wise service URLs and open a dedicated landing page for each location."
        breadcrumb="City Network"
        backgroundImage={siteAssets.pages.getQuote.heroBanner}
        heightClassName="min-h-[60vh]"
      />

      <OperationalCities
        title="Packers and Movers City URLs"
        subtitle="Use these city URLs anywhere in the website to point users toward the right location-specific service page."
        cities={operationalCities}
      />

      <CallToAction />
      
    </main>
  );
}
