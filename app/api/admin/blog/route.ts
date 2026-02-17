import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { blogService } from '@/lib/blog/blog-service';
import { BlogPostInput } from '@/lib/blog/types';

/**
 * POST /api/admin/blog
 * Create a new blog post
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const blogData: BlogPostInput = {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      slug: body.slug,
      thumbnail: body.thumbnail,
      tags: body.tags || [],
      publishedAt: body.publishedAt,
      readTime: body.readTime,
    };

    // Create blog post
    const blog = await blogService.createBlog(blogData);

    return NextResponse.json(
      { message: 'Blog post created successfully', blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    
    if (error instanceof Error) {
      // Check if it's a validation error
      if (error.message.includes('Validation failed')) {
        return NextResponse.json(
          { message: error.message },
          { status: 400 }
        );
      }
      
      // Check if it's a duplicate slug error
      if (error.message.includes('already exists')) {
        return NextResponse.json(
          { message: error.message },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
