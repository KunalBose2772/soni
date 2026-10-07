import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeroBanner from "../../components/PageHeroBanner";
import ServiceShowcase from "../../components/ServiceShowcase";
import ServiceCoverageSection from "../../components/ServiceCoverageSection";
import ServiceBookingSection from "../../components/ServiceBookingSection";
import FAQSection from "../../components/FAQSection";
import CallToAction from "../../components/CallToAction";
import Process from "../../components/Process";
import WhyChooseUs from "../../components/WhyChooseUs";
import { getServiceBySlug, services } from "../../components/serviceData";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Sony Packers and Movers",
    };
  }

  return {
    title: `${service.title} | Sony Packers and Movers`,
    description: service.desc,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHeroBanner
        title={service.title}
        subtitle={service.desc}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/household" },
          { label: service.title },
        ]}
        badge="Verified Relocation Partner"
        backgroundImage={service.image}
      />
      <ServiceShowcase activeSlug={service.slug} />
      <Process />
      <ServiceCoverageSection
        heading={service.coverage.heading}
        intro={service.coverage.intro}
        local={service.coverage.local}
        intercity={service.coverage.intercity}
        promise={service.coverage.promise}
      />
      <WhyChooseUs />
      <ServiceBookingSection
        title={service.booking.title}
        leftLabel={service.booking.leftLabel}
        leftItems={service.booking.leftItems}
        rightLabel={service.booking.rightLabel}
        rightItems={service.booking.rightItems}
      />
      <FAQSection
        title={`Frequently Asked Questions about ${service.shortTitle}`}
        subtitle={`Common questions customers ask before booking ${service.shortTitle.toLowerCase()} moving support.`}
        faqs={service.faqs}
        images={service.faqImages}
      />
      <CallToAction
        title={service.cta.title}
        subtitle={service.cta.subtitle}
        primaryHref="/get-quote"
        primaryLabel="Get Free Quote"
        secondaryLabel="WhatsApp Us"
      />
    </>
  );
}
