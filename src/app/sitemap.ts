import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { collections } from "@/content/collections";
import { looks } from "@/content/portfolio";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  return [
    { url: url("/"), changeFrequency: "daily", priority: 1 },
    { url: url("/portfolio"), changeFrequency: "weekly", priority: 0.9 },
    { url: url("/collections"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: url("/find-your-look"), changeFrequency: "monthly", priority: 0.6 },
    ...services.map((s) => ({
      url: url(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...collections.map((c) => ({
      url: url(`/collections/${c.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...looks.map((l) => ({
      url: url(`/portfolio/${l.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
