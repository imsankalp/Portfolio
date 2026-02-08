import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';

/**
 * Robots.txt Generator
 * 
 * Generates robots.txt file to control search engine crawling.
 * Allows all user agents to crawl the site except API routes.
 * 
 * @returns Robots.txt configuration
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
