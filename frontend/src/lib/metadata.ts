import type { Metadata } from "next";
import { siteConfig } from "./site";

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
  const desc = description ?? siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${path}`;
  const ogImageUrl = new URL("/opengraph-image", siteConfig.url).toString();

  return {
    title: fullTitle,
    description: desc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: canonicalUrl,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [ogImageUrl],
    },
  };
}
