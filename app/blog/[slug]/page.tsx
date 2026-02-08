import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts, siteConfig } from '@/lib/constants';
import { Navigation, Footer } from '@/components/layout';
import { navigationLinks, socialLinks, copyrightText } from '@/lib/constants';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate metadata for blog post page
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [siteConfig.author.name],
      images: post.thumbnail ? [post.thumbnail] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

/**
 * Generate static params for all blog posts
 */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * ArticleSchema Component
 * Structured data for blog post SEO
 */
function ArticleSchema({ post }: { post: typeof blogPosts[0] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    image: post.thumbnail,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Individual Blog Post Page
 * 
 * Displays full blog post content.
 * Features:
 * - Dynamic metadata generation for each post
 * - Article schema structured data (JSON-LD)
 * - Full blog post content
 * - Back to blog link
 * - Semantic HTML (article, h1)
 */
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <ArticleSchema post={post} />
      <Navigation links={navigationLinks} logo={siteConfig.name} />

      <main id="main-content" className="min-h-screen bg-white dark:bg-gray-900">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 max-w-4xl">
          {/* Back to Blog Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md p-2"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Back to Blog
          </Link>

          {/* Post Header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" aria-hidden="true" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Placeholder for actual blog content */}
            <div className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Blog post content would be displayed here.
                <br />
                <br />
                In a real implementation, you would:
                <br />
                • Use MDX for rich content
                <br />
                • Connect to a CMS (Contentful, Sanity, etc.)
                <br />
                • Store content in markdown files
                <br />
                • Or use a headless CMS API
              </p>
            </div>
          </div>

          {/* Post Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md p-2"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
              Back to all posts
            </Link>
          </footer>
        </article>
      </main>

      <Footer socialLinks={socialLinks} copyright={copyrightText} />
    </>
  );
}
