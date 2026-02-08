'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { BlogProps } from '@/lib/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { BlogCard } from '@/components/ui';

/**
 * Blog Section Component
 * 
 * Displays recent blog posts preview.
 * Features:
 * - Recent blog posts using BlogCard components (limit to 3-6 posts)
 * - Posts in reverse chronological order
 * - "View All Posts" link to blog page
 * - Scroll-triggered animations
 * - Semantic HTML (section, h2, article for each post)
 * - ARIA labels for accessibility
 * 
 * @param posts - Array of blog post objects
 * @param maxPosts - Maximum number of posts to display (default: 6)
 */
export function Blog({ posts, maxPosts = 6 }: BlogProps) {
  // Sort posts by date (newest first) and limit
  const sortedPosts = [...posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, maxPosts);

  return (
    <section
      id="blog"
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="blog-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="blog-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Latest Articles
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on mobile development
          </p>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mt-6" aria-hidden="true" />
        </motion.div>

        {/* Blog Posts Grid */}
        {sortedPosts.length > 0 ? (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            >
              {sortedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </motion.div>

            {/* View All Posts Link */}
            {posts.length > maxPosts && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl"
                  aria-label="View all blog posts"
                >
                  View All Posts
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No blog posts available yet. Check back soon!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
