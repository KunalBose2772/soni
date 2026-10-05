import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BiharDistrictPage } from "../../../components/BiharPages";
import { getBiharDistrictBySlug, biharDistricts } from "../../locationData";
import { getDistrictProfile, getLocalityProfile, localitySlug } from "../../districtProfiles";

type LocalityPageParams = {
  district: string;
  locality: string;
};

function getLocalityName(localities: string[], slug: string) {
  return localities.find((item) => localitySlug(item) === slug);
}

export function generateStaticParams() {
  return biharDistricts.flatMap((district) => {
    const profile = getDistrictProfile(district.name, district.slug);
    return profile.localities.map((locality) => ({
      district: district.slug,
      locality: localitySlug(locality),
    }));
  });
}

export async function generateMetadata({ params }: { params: Promise<LocalityPageParams> }): Promise<Metadata> {
  const { district, locality } = await params;
  const districtData = getBiharDistrictBySlug(district);

  if (!districtData) {
    return { title: "Packers and Movers in Bihar" };
  }

  const profile = getDistrictProfile(districtData.name, districtData.slug);
  const localityName = getLocalityName(profile.localities, locality);

  if (!localityName) {
    return { title: `Packers and Movers in ${districtData.name}` };
  }

  return {
    title: `Packers and Movers in ${localityName}, ${districtData.name} | Sony Packers and Movers`,
    description: `Trusted movers and packers service in ${localityName}, ${districtData.name} for household shifting, office relocation, and vehicle transport.`,
  };
}

export default async function BiharLocalityPage({ params }: { params: Promise<LocalityPageParams> }) {
  const { district, locality } = await params;
  const districtData = getBiharDistrictBySlug(district);

  if (!districtData) {
    notFound();
  }

  const profile = getDistrictProfile(districtData.name, districtData.slug);
  const localityName = getLocalityName(profile.localities, locality);

  if (!localityName) {
    notFound();
  }

  const localityProfile = getLocalityProfile(districtData.name, districtData.slug, localityName);

  return (
    <BiharDistrictPage
      district={districtData}
      areaDisplayName={localityProfile.areaDisplayName}
      areaEyebrow={`${localityName.toUpperCase()} SERVICE AREA`}
      mapQuery={localityProfile.mapQuery}
      mapHeading={localityProfile.mapHeading}
      heroImage={profile.heroImage}
      introCopy={localityProfile.introCopy}
      overviewTitle={localityProfile.overviewTitle}
      overviewParagraphs={localityProfile.overviewParagraphs}
      serviceHighlights={profile.serviceHighlights}
      localities={localityProfile.localities}
      localityNote={localityProfile.localityNote}
      nearbyDistricts={profile.nearbyDistricts}
      nearbyNote={profile.nearbyNote}
      quoteTitle={localityProfile.quoteTitle}
      quoteCopy={localityProfile.quoteCopy}
      popularRoutes={localityProfile.popularRoutes}
      pincodeCoverage={localityProfile.pincodeCoverage}
      faqs={localityProfile.faqs}
      faqImages={profile.faqImages}
    />
  );
}
