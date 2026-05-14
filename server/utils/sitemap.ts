import { Blog } from "../models/Blog";
import { env } from "../config/env";

export async function generateSitemapXml() {
  const posts = (await Blog.find({ isPublished: true }).select("slug updatedAt").sort({ updatedAt: -1 }).lean()) as unknown as Array<{
    slug: string;
    updatedAt?: string;
  }>;
  const staticPaths = ["/", "/about", "/services", "/packages", "/team", "/contact", "/blog"];

  const staticUrls = staticPaths
    .map((path) => `<url><loc>${env.SITE_URL}${path}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`)
    .join("");

  const blogUrls = posts
    .map((post) => `<url><loc>${env.SITE_URL}/blog/${post.slug}</loc><lastmod>${new Date(post.updatedAt ?? new Date()).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls}${blogUrls}</urlset>`;
}
