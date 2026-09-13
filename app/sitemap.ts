import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://www.nawwsaj.com/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.nawwsaj.com/go",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.nawwsaj.com/picks",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.nawwsaj.com/services",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.nawwsaj.com/projects/suhail",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
