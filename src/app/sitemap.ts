import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog-posts";
import { TRUST_DOCUMENTS } from "@/data/trust-policies";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
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

  const staticAndPolicy = [...staticRoutes, ...policyRoutes].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticAndPolicy, ...blogEntries];
}
