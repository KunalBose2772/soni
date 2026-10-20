import type { Metadata } from "next";
import { Sora, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import { companyInfo } from "@/lib/company-info";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sonypackersmovers.com"),
  title: {
    default: "Sony Packers and Movers | Trusted Relocation in Ranchi & Pan India",
    template: "%s | Sony Packers and Movers",
  },
  description: companyInfo.description,
  keywords: [
    "Packers and Movers in Ranchi",
    "Sony Packers and Movers",
    "Best Packers and Movers Ranchi",
    "Household Shifting Ranchi",
    "Office Relocation Ranchi",
    "Vehicle Transport Ranchi",
    "Bike Shifting Ranchi",
    "Car Transport Ranchi",
    "Packers and Movers Jharkhand",
    "Packers and Movers Bihar",
    "Affordable Shifting Services",
    "Ratu Road Packers and Movers",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sony Packers and Movers | Trusted Relocation in Ranchi & Pan India",
    description: companyInfo.description,
    url: "https://sonypackersmovers.com",
    siteName: companyInfo.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/assets/logo/logo.png",
        width: 1200,
        height: 630,
        alt: "Sony Packers and Movers Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sony Packers and Movers | Trusted Relocation in Ranchi",
    description: companyInfo.description,
    images: ["/assets/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-JH",
    "geo.placename": "Ranchi",
    "geo.position": `${companyInfo.geo.latitude};${companyInfo.geo.longitude}`,
    ICBM: `${companyInfo.geo.latitude}, ${companyInfo.geo.longitude}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: companyInfo.name,
  legalName: companyInfo.legalName,
  url: "https://sonypackersmovers.com",
  logo: "https://sonypackersmovers.com/assets/logo/logo.png",
  image: "https://sonypackersmovers.com/assets/logo/logo.png",
  description: companyInfo.description,
  telephone: `+91${companyInfo.phone}`,
  email: "sonypackersranchi@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: companyInfo.address.line1,
    addressLocality: companyInfo.address.city,
    addressRegion: companyInfo.address.state,
    postalCode: companyInfo.address.pincode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: companyInfo.geo.latitude,
    longitude: companyInfo.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  priceRange: "₹₹",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: String(companyInfo.gmb.rating),
    reviewCount: String(companyInfo.gmb.reviewCount),
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "City", name: "Ranchi" },
    { "@type": "State", name: "Jharkhand" },
    { "@type": "State", name: "Bihar" },
    { "@type": "Country", name: "India" },
  ],
  sameAs: [
    companyInfo.socials.facebook,
    companyInfo.socials.instagram,
    companyInfo.socials.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteChrome>{children}</SiteChrome>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
