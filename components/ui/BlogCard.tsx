'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, FileText } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { fadeInUp } from '@/lib/animations';

interface BlogCardProps {
  post: BlogPost;
}

/**
 * BlogCard Component
 * 
 * Displays a blog post preview with thumbnail and metadata.
 * Features:
 * - Lazy-loaded thumbnail
 * - Publication date and read time
 * - Link to full post (internal or external)
 * - Hover animation
 * - ARIA labels for accessibility
 * 
 * @param post - Blog post object with metadata
 */
export function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine link (external URL or internal slug)
  const postLink = post.externalUrl || `/blog/${post.slug}`;
  const isExternal = !!post.externalUrl;

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
      role="article"
      aria-label={`Blog post: ${post.title}`}
    >
      <a
        href={postLink}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
      >
        {/* Thumbnail */}
        {post.thumbnail && (
          <div className="relative aspect-video overflow-hidden bg-gray-200 dark:bg-gray-700">
            {!imageError ? (
              <Image
                src={post.thumbnail}
                alt={`Thumbnail for ${post.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-gray-400" aria-hidden="true" />
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
            {isExternal && (
              <ExternalLink className="inline-block ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            {/* Publication Date */}
            <div className="flex items-center gap-1" aria-label={`Published on ${formatDate(post.publishedAt)}`}>
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>

            {/* Read Time */}
            <div className="flex items-center gap-1" aria-label={`${post.readTime} minute read`}>
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4" role="list" aria-label="Article tags">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded"
                  role="listitem"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </motion.article>
  );
}
