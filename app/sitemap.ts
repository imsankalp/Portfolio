import { MetadataRoute } from 'next';
import { blogPosts, siteConfig } from '@/lib/constants';

/**
 * Sitemap Generator
 * 
 * Generates a sitemap for search engines with all pages.
 * Includes homepage, blog listing, and individual blog posts.
 * 
 * @returns Sitemap entries with URLs, last modified dates, change frequency, and priority
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Homepage
  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  // Blog listing page
  const blogPage = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };

  // Individual blog posts
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [homepage, blogPage, ...blogPostPages];
}
