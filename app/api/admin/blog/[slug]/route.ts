import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/middleware';
import { blogService } from '@/lib/blog/blog-service';
import { BlogPostInput } from '@/lib/blog/types';

/**
 * PUT /api/admin/blog/[slug]
 * Update an existing blog post
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;

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

    // Update blog post
    const blog = await blogService.updateBlog(slug, blogData);

    return NextResponse.json(
      { message: 'Blog post updated successfully', blog },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating blog post:', error);
    
    if (error instanceof Error) {
      // Check if it's a validation error
      if (error.message.includes('Validation failed')) {
        return NextResponse.json(
          { message: error.message },
          { status: 400 }
        );
      }
      
      // Check if blog not found
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { message: error.message },
          { status: 404 }
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
      { message: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blog/[slug]
 * Delete a blog post
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check authentication
    const isAuthenticated = await requireAuth();
    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { slug } = await params;

    // Delete blog post
    await blogService.deleteBlog(slug);

    return NextResponse.json(
      { message: 'Blog post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { message: error.message },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
