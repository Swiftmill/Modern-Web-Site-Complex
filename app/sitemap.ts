import type { MetadataRoute } from "next";

const baseUrl = "https://a-website.example";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
