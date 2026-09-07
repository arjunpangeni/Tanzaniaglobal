import type { MetadataRoute } from "next";
import { destinations } from "@/content/destinations";
import { seedUniversities } from "@/content/universities";
import { seedPosts } from "@/content/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPaths = [
    "",
    "/services",
    "/universities",
    "/resources",
    "/resources/ielts-calculator",
    "/about",
    "/contact",
    "/appointment",
    "/privacy",
    "/terms",
  ];
  const extra = [
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...seedUniversities.map((u) => `/universities/${u.slug}`),
    ...seedPosts.map((p) => `/resources/blog/${p.slug}`),
  ];
  return [...staticPaths, ...extra].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.6,
  }));
}
