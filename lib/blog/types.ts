/**
 * Blog Management System Types
 * 
 * Core TypeScript interfaces for the blog management system.
 */

/**
 * Blog Post - Complete blog post with metadata and content
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;  // ISO date string
  readTime: number;     // Number of minutes
  thumbnail?: string;   // URL or path to image
  tags: string[];
  content: string;      // Markdown content without frontmatter
}

/**
 * Blog Post Input - Data for creating or updating a blog post
 */
export interface BlogPostInput {
  title: string;
  excerpt: string;
  publishedAt?: string;  // Optional, defaults to current date
  readTime?: number;     // Optional, can be auto-calculated
  thumbnail?: string;
  tags: string[];
  content: string;
  slug?: string;         // Optional, generated from title if not provided
}

/**
 * Blog Metadata - Frontmatter metadata from markdown files
 */
export interface BlogMetadata {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number;
  thumbnail?: string;
  tags: string[];
  slug: string;
}

/**
 * Blog File - Raw blog file data from file system
 */
export interface BlogFile {
  slug: string;
  content: string;  // Raw markdown with frontmatter
  filePath: string;
}

/**
 * Parsed Markdown - Result of parsing a markdown file
 */
export interface ParsedMarkdown {
  metadata: BlogMetadata;
  content: string;  // Markdown content without frontmatter
}

/**
 * Validation Error - Error details for form validation
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Blog Service Result - Result wrapper for blog operations
 */
export interface BlogServiceResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
  message?: string;
}
