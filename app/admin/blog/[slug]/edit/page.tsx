import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAuth } from '@/lib/auth/middleware';
import { blogService } from '@/lib/blog/blog-service';
import { BlogForm } from '@/components/admin/BlogForm';

interface EditBlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Blog Edit Page
 * 
 * Page for editing existing blog posts.
 * Features:
 * - Protected by authentication
 * - Blog form in edit mode with existing data
 * - Clean layout
 */
export default async function EditBlogPage({ params }: EditBlogPageProps) {
  // Check authentication
  const isAuthenticated = await requireAuth();
  
  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  // Fetch blog post
  const { slug } = await params;
  const blog = await blogService.getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            Edit Blog Post
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {blog.title}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <BlogForm mode="edit" initialData={blog} />
        </div>
      </main>
    </div>
  );
}
