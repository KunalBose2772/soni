import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JharkhandDistrictPage } from "../../../components/JharkhandPages";
import { getDistrictBySlug, jharkhandDistricts } from "../../locationData";
import { getDistrictProfile, getLocalityProfile, localitySlug } from "../../districtProfiles";

type LocalityPageParams = {
  district: string;
  locality: string;
};

function getLocalityName(localities: string[], slug: string) {
  return localities.find((item) => localitySlug(item) === slug);
}

export function generateStaticParams() {
  return jharkhandDistricts.flatMap((district) => {
    const profile = getDistrictProfile(district.name, district.slug);
    return profile.localities.map((locality) => ({
      district: district.slug,
      locality: localitySlug(locality),
    }));
  });
}

export async function generateMetadata({ params }: { params: Promise<LocalityPageParams> }): Promise<Metadata> {
  const { district, locality } = await params;
  const districtData = getDistrictBySlug(district);

  if (!districtData) {
    return { title: "Packers and Movers in Jharkhand" };
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

export default async function LocalityPage({ params }: { params: Promise<LocalityPageParams> }) {
  const { district, locality } = await params;
  const districtData = getDistrictBySlug(district);

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
    <JharkhandDistrictPage
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

