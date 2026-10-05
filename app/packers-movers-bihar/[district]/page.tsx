import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BiharDistrictPage } from "../../components/BiharPages";
import { getBiharDistrictBySlug, biharDistricts } from "../locationData";
import { getDistrictProfile } from "../districtProfiles";

type DistrictPageParams = {
  district: string;
};

export function generateStaticParams() {
  return biharDistricts.map((district) => ({
    district: district.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<DistrictPageParams> }): Promise<Metadata> {
  const { district } = await params;
  const districtData = getBiharDistrictBySlug(district);

  if (!districtData) {
    return { title: "Packers and Movers in Bihar" };
  }

  return {
    title: `Packers and Movers in ${districtData.name} | Sony Packers and Movers`,
    description: `Trusted ${districtData.name} packers and movers service for household shifting, office relocation, and vehicle transport.`,
  };
}

export default async function BiharDistrictRoutePage({ params }: { params: Promise<DistrictPageParams> }) {
  const { district } = await params;
  const districtData = getBiharDistrictBySlug(district);

  if (!districtData) {
    notFound();
  }

  const profile = getDistrictProfile(districtData.name, districtData.slug);

  return (
    <BiharDistrictPage
      district={districtData}
      heroImage={profile.heroImage}
      introCopy={profile.introCopy}
      overviewTitle={profile.overviewTitle}
      overviewParagraphs={profile.overviewParagraphs}
      serviceHighlights={profile.serviceHighlights}
      localities={profile.localities}
      localityNote={profile.localityNote}
      nearbyDistricts={profile.nearbyDistricts}
      nearbyNote={profile.nearbyNote}
      quoteTitle={profile.quoteTitle}
      quoteCopy={profile.quoteCopy}
      popularRoutes={profile.popularRoutes}
      pincodeCoverage={profile.pincodeCoverage}
      faqs={profile.faqs}
      faqImages={profile.faqImages}
    />
  );
}




