import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { serviceSlugs } from "@/lib/services";
import { portfolioSlugs } from "@/lib/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/about",
    "/process",
    "/pricing",
    "/contact",
    "/blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "video-editing" ? 0.9 : 0.7,
  }));

  const portfolioRoutes = portfolioSlugs.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes];
}
