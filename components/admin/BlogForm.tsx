'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, AlertCircle } from 'lucide-react';
import { BlogPost } from '@/lib/blog/types';
import { MarkdownEditor } from '@/components/admin/MarkdownEditor';

interface BlogFormProps {
  initialData?: BlogPost;
  mode: 'create' | 'edit';
}

/**
 * BlogForm Component
 * 
 * Form for creating and editing blog posts.
 * Features:
 * - All metadata fields
 * - Markdown editor for content
 * - Validation and error display
 * - Create and edit modes
 * - Keyboard navigation support
 */
export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form state
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '');
  const [publishedAt, setPublishedAt] = useState(
    initialData?.publishedAt 
      ? new Date(initialData.publishedAt).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const blogData = {
        title,
        slug: slug || undefined,
        excerpt,
        content,
        thumbnail: thumbnail || undefined,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
        publishedAt: new Date(publishedAt).toISOString(),
      };

      const url = mode === 'create' 
        ? '/api/admin/blog'
        : `/api/admin/blog/${initialData?.slug}`;
      
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        if (data.errors) {
          const errorMap: Record<string, string> = {};
          data.errors.forEach((err: { field: string; message: string }) => {
            errorMap[err.field] = err.message;
          });
          setErrors(errorMap);
        } else {
          setErrors({ general: data.message || 'An error occurred' });
        }
      }
    } catch (err) {
      setErrors({ general: 'An error occurred. Please try again.' });
      console.error('Form submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-red-800 dark:text-red-200">{errors.general}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${
            errors.title ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Enter blog title"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Slug <span className="text-gray-500 text-xs">(optional, auto-generated from title)</span>
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${
            errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="my-blog-post"
          disabled={isLoading}
        />
        {errors.slug && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.slug}</p>
        )}
      </div>

      {/* Excerpt */}
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Excerpt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors ${
            errors.excerpt ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
          }`}
          placeholder="Brief description of the blog post"
          disabled={isLoading}
        />
        {errors.excerpt && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.excerpt}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content <span className="text-red-500">*</span>
        </label>
        <MarkdownEditor
          value={content}
          onChange={setContent}
          disabled={isLoading}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div>
        <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Thumbnail URL <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <input
          type="url"
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="https://example.com/image.jpg"
          disabled={isLoading}
        />
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags <span className="text-gray-500 text-xs">(comma-separated)</span>
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          placeholder="react, typescript, web-development"
          disabled={isLoading}
        />
      </div>

      {/* Published Date */}
      <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Published Date
        </label>
        <input
          type="datetime-local"
          id="publishedAt"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
          disabled={isLoading}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" aria-hidden="true" />
          {isLoading ? 'Saving...' : mode === 'create' ? 'Create Post' : 'Update Post'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed"
        >
          <X className="w-5 h-5" aria-hidden="true" />
          Cancel
        </button>
      </div>
    </form>
  );
}
