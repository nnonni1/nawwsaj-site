import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.nawwsaj.com/sitemap.xml",
    host: "https://www.nawwsaj.com",
  };
}
