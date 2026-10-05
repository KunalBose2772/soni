import HeroSlider from "./HeroSlider";
import QuickLeadSection from "./QuickLeadSection";
import AboutCompany from "./AboutCompany";
import Services from "./Services";
import PricingGuideSection from "./PricingGuideSection";
import WhyChooseUs from "./WhyChooseUs";
import Process from "./Process";
import Testimonials from "./Testimonials";
import FAQSection from "./FAQSection";
import OperationalCities from "./OperationalCities";
import CallToAction from "./CallToAction";
import NationalCoverageMap from "./NationalCoverageMap";
import { operationalCities } from "@/lib/operational-cities";

export default function HomeSections() {
  return (
    <>
      <HeroSlider />
      <QuickLeadSection />
      <AboutCompany />
      <Services />
      <PricingGuideSection />
      <WhyChooseUs />
      <Process />
      <Testimonials />
      <FAQSection />
      <OperationalCities
        title="Cities We Serve Across"
        subtitle="Regular container vehicles connecting Ranchi with all districts of Jharkhand, Bihar, and major cities across India."
        cities={operationalCities}
      />
      <CallToAction />
      <NationalCoverageMap />
    </>
  );
}
