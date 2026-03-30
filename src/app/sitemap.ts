import type { MetadataRoute } from "next";
import { TRUST_DOCUMENTS } from "@/data/trust-policies";

const BASE_URL = "https://stratavor.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/power-bi", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/tools", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/trust", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/trust/dpa", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/trust/sub-processor-register", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  const policyRoutes = TRUST_DOCUMENTS
    .filter((d) => d.slug !== "sub-processor-register" && d.slug !== "dpa")
    .map((d) => ({
      path: `/trust/policies/${d.slug}`,
      priority: 0.4 as number,
      changeFrequency: "monthly" as const,
    }));

  const allRoutes = [...staticRoutes, ...policyRoutes];

  return allRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
