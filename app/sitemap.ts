import type { MetadataRoute } from "next";
import { services } from "./components/serviceData";
import { operationalCities } from "@/lib/operational-cities";
import { jharkhandDistricts } from "./packers-movers-jharkhand/locationData";
import { biharDistricts } from "./packers-movers-bihar/locationData";

const BASE_URL = "https://sonypackersmovers.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/get-quote`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/packers-movers`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/packers-movers-jharkhand`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/packers-movers-jharkhand/view-more`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/packers-movers-bihar`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/packers-movers-bihar/view-more`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Service routes
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Operational cities
  const cityRoutes: MetadataRoute.Sitemap = operationalCities.map((city) => ({
    url: `${BASE_URL}${city.href}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: city.featured ? 0.85 : 0.7,
  }));

  // Jharkhand district routes
  const jharkhandRoutes: MetadataRoute.Sitemap = jharkhandDistricts.map((district) => ({
    url: `${BASE_URL}/packers-movers-jharkhand/${district.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Bihar district routes
  const biharRoutes: MetadataRoute.Sitemap = biharDistricts.map((district) => ({
    url: `${BASE_URL}/packers-movers-bihar/${district.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...cityRoutes,
    ...jharkhandRoutes,
    ...biharRoutes,
  ];
}
