import type { Metadata } from 'next';
import { siteConfig } from '@/lib/constants';
import { BlogCard } from '@/components/ui';
import { Navigation, Footer } from '@/components/layout';
import { navigationLinks, socialLinks, copyrightText } from '@/lib/constants';
import { blogService } from '@/lib/blog/blog-service';

export const metadata: Metadata = {
  title: 'Blog',
  description: `Read articles and insights about mobile development from ${siteConfig.author.name}`,
};

/**
 * Blog Listing Page
 * 
 * Displays all blog posts with pagination or infinite scroll.
 * Features:
 * - All blog posts in reverse chronological order
 * - Page-specific metadata for SEO
 * - Semantic HTML
 * - Responsive grid layout
 */
export default async function BlogPage() {
  // Fetch all blogs from markdown files
  const sortedPosts = await blogService.getAllBlogs();

  return (
    <>
      <Navigation links={navigationLinks} logo={siteConfig.name} />
      
      <main id="main-content" className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Articles, tutorials, and insights about React Native and mobile development
            </p>
            <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mt-6" aria-hidden="true" />
          </div>

          {/* Blog Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No blog posts available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer socialLinks={socialLinks} copyright={copyrightText} />
    </>
  );
}
