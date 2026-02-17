/**
 * Blog Service
 * 
 * Business logic layer for blog operations.
 * Handles CRUD operations, validation, and coordination between file system and markdown processor.
 */

import { blogFileSystem } from './file-system';
import { markdownProcessor } from './markdown-processor';
import { BlogPost, BlogPostInput, ValidationError } from './types';

/**
 * Blog Service
 * Provides high-level methods for managing blog posts
 */
export class BlogService {
  /**
   * Get all blogs with parsed metadata
   */
  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      const blogFiles = await blogFileSystem.readAllBlogs();
      const blogs: BlogPost[] = [];
      
      for (const file of blogFiles) {
        try {
          const parsed = markdownProcessor.parse(file.content);
          
          // Skip files with missing required metadata
          if (!parsed.metadata.title || !parsed.metadata.slug) {
            console.error(`Skipping blog file ${file.slug}: missing required metadata`);
            continue;
          }
          
          blogs.push({
            slug: parsed.metadata.slug,
            title: parsed.metadata.title,
            excerpt: parsed.metadata.excerpt,
            publishedAt: parsed.metadata.publishedAt,
            readTime: parsed.metadata.readTime,
            thumbnail: parsed.metadata.thumbnail,
            tags: parsed.metadata.tags,
            content: parsed.content,
          });
        } catch (error) {
          console.error(`Error parsing blog file ${file.slug}:`, error);
          // Skip invalid files and continue
        }
      }
      
      // Sort by publishedAt date (newest first)
      blogs.sort((a, b) => {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
      
      return blogs;
    } catch (error) {
      console.error('Error getting all blogs:', error);
      return [];
    }
  }

  /**
   * Get a single blog by slug with full content
   */
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const blogFile = await blogFileSystem.readBlogBySlug(slug);
      
      if (!blogFile) {
        return null;
      }
      
      const parsed = markdownProcessor.parse(blogFile.content);
      
      return {
        slug: parsed.metadata.slug,
        title: parsed.metadata.title,
        excerpt: parsed.metadata.excerpt,
        publishedAt: parsed.metadata.publishedAt,
        readTime: parsed.metadata.readTime,
        thumbnail: parsed.metadata.thumbnail,
        tags: parsed.metadata.tags,
        content: parsed.content,
      };
    } catch (error) {
      console.error(`Error getting blog ${slug}:`, error);
      return null;
    }
  }

  /**
   * Create a new blog post
   */
  async createBlog(data: BlogPostInput): Promise<BlogPost> {
    // Validate input
    const errors = this.validateBlogInput(data);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => e.message).join(', ')}`);
    }
    
    // Generate slug if not provided
    const slug = data.slug || await this.generateSlug(data.title);
    
    // Check if slug already exists
    const exists = await blogFileSystem.blogExists(slug);
    if (exists) {
      throw new Error(`Blog with slug "${slug}" already exists`);
    }
    
    // Calculate read time if not provided
    const readTime = data.readTime || markdownProcessor.calculateReadTime(data.content);
    
    // Use current date if not provided
    const publishedAt = data.publishedAt || new Date().toISOString();
    
    const blogPost: BlogPost = {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt,
      readTime,
      thumbnail: data.thumbnail,
      tags: data.tags,
      content: data.content,
    };
    
    // Serialize and write to file
    const markdown = markdownProcessor.serialize(blogPost);
    await blogFileSystem.writeBlog(slug, markdown);
    
    return blogPost;
  }

  /**
   * Update an existing blog post
   */
  async updateBlog(oldSlug: string, data: BlogPostInput): Promise<BlogPost> {
    // Validate input
    const errors = this.validateBlogInput(data);
    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.map(e => e.message).join(', ')}`);
    }
    
    // Check if old blog exists
    const exists = await blogFileSystem.blogExists(oldSlug);
    if (!exists) {
      throw new Error(`Blog with slug "${oldSlug}" not found`);
    }
    
    // Generate new slug if not provided
    const newSlug = data.slug || oldSlug;
    
    // If slug changed, check if new slug already exists
    if (newSlug !== oldSlug) {
      const newSlugExists = await blogFileSystem.blogExists(newSlug);
      if (newSlugExists) {
        throw new Error(`Blog with slug "${newSlug}" already exists`);
      }
    }
    
    // Calculate read time if not provided
    const readTime = data.readTime || markdownProcessor.calculateReadTime(data.content);
    
    // Use current date if not provided
    const publishedAt = data.publishedAt || new Date().toISOString();
    
    const blogPost: BlogPost = {
      slug: newSlug,
      title: data.title,
      excerpt: data.excerpt,
      publishedAt,
      readTime,
      thumbnail: data.thumbnail,
      tags: data.tags,
      content: data.content,
    };
    
    // Serialize and update file
    const markdown = markdownProcessor.serialize(blogPost);
    await blogFileSystem.updateBlog(oldSlug, newSlug, markdown);
    
    return blogPost;
  }

  /**
   * Delete a blog post
   */
  async deleteBlog(slug: string): Promise<void> {
    const exists = await blogFileSystem.blogExists(slug);
    if (!exists) {
      throw new Error(`Blog with slug "${slug}" not found`);
    }
    
    await blogFileSystem.deleteBlog(slug);
  }

  /**
   * Generate a unique slug from title
   */
  async generateSlug(title: string): Promise<string> {
    // Convert to lowercase and replace spaces with hyphens
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')      // Replace spaces with hyphens
      .replace(/-+/g, '-');      // Replace multiple hyphens with single hyphen
    
    // Ensure slug is unique
    let uniqueSlug = slug;
    let counter = 1;
    
    while (await blogFileSystem.blogExists(uniqueSlug)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }
    
    return uniqueSlug;
  }

  /**
   * Validate blog input data
   */
  private validateBlogInput(data: BlogPostInput): ValidationError[] {
    const errors: ValidationError[] = [];
    
    // Title validation
    if (!data.title || data.title.trim().length === 0) {
      errors.push({ field: 'title', message: 'Title is required' });
    } else if (data.title.length > 200) {
      errors.push({ field: 'title', message: 'Title must be 200 characters or less' });
    }
    
    // Excerpt validation
    if (!data.excerpt || data.excerpt.trim().length === 0) {
      errors.push({ field: 'excerpt', message: 'Excerpt is required' });
    } else if (data.excerpt.length > 500) {
      errors.push({ field: 'excerpt', message: 'Excerpt must be 500 characters or less' });
    }
    
    // Content validation
    if (!data.content || data.content.trim().length === 0) {
      errors.push({ field: 'content', message: 'Content is required' });
    }
    
    // Slug validation (if provided)
    if (data.slug) {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (!slugRegex.test(data.slug)) {
        errors.push({ 
          field: 'slug', 
          message: 'Slug must contain only lowercase letters, numbers, and hyphens' 
        });
      }
    }
    
    // Tags validation
    if (data.tags) {
      for (const tag of data.tags) {
        if (tag.length > 50) {
          errors.push({ field: 'tags', message: 'Each tag must be 50 characters or less' });
          break;
        }
      }
    }
    
    return errors;
  }
}

// Export singleton instance
export const blogService = new BlogService();
