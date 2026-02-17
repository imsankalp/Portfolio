/**
 * Blog File System Service
 * 
 * Handles all file system operations for blog markdown files.
 */

import fs from 'fs/promises';
import path from 'path';
import { BlogFile } from './types';

const BLOGS_DIR = path.join(process.cwd(), 'blogs');

/**
 * Blog File System Service
 * Provides methods for reading, writing, updating, and deleting blog markdown files
 */
export class BlogFileSystem {
  /**
   * Read all blog files from the blogs/ directory
   */
  async readAllBlogs(): Promise<BlogFile[]> {
    try {
      // Ensure blogs directory exists
      await fs.mkdir(BLOGS_DIR, { recursive: true });
      
      // Read all files in the directory
      const files = await fs.readdir(BLOGS_DIR);
      
      // Filter for markdown files only
      const markdownFiles = files.filter(file => file.endsWith('.md'));
      
      // Read content of each file
      const blogFiles = await Promise.all(
        markdownFiles.map(async (file) => {
          const filePath = path.join(BLOGS_DIR, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const slug = file.replace('.md', '');
          
          return {
            slug,
            content,
            filePath,
          };
        })
      );
      
      return blogFiles;
    } catch (error) {
      console.error('Error reading blog files:', error);
      return [];
    }
  }

  /**
   * Read a single blog file by slug
   */
  async readBlogBySlug(slug: string): Promise<BlogFile | null> {
    try {
      const filePath = path.join(BLOGS_DIR, `${slug}.md`);
      const content = await fs.readFile(filePath, 'utf-8');
      
      return {
        slug,
        content,
        filePath,
      };
    } catch (error) {
      console.error(`Error reading blog file ${slug}:`, error);
      return null;
    }
  }

  /**
   * Write a new blog file
   */
  async writeBlog(slug: string, content: string): Promise<void> {
    try {
      // Ensure blogs directory exists
      await fs.mkdir(BLOGS_DIR, { recursive: true });
      
      const filePath = path.join(BLOGS_DIR, `${slug}.md`);
      await fs.writeFile(filePath, content, 'utf-8');
    } catch (error) {
      console.error(`Error writing blog file ${slug}:`, error);
      throw new Error(`Failed to write blog file: ${slug}`);
    }
  }

  /**
   * Update an existing blog file with slug rename support
   */
  async updateBlog(oldSlug: string, newSlug: string, content: string): Promise<void> {
    try {
      const oldFilePath = path.join(BLOGS_DIR, `${oldSlug}.md`);
      const newFilePath = path.join(BLOGS_DIR, `${newSlug}.md`);
      
      // If slug changed, delete old file
      if (oldSlug !== newSlug) {
        try {
          await fs.unlink(oldFilePath);
        } catch (error) {
          console.error(`Error deleting old blog file ${oldSlug}:`, error);
        }
      }
      
      // Write new file
      await fs.writeFile(newFilePath, content, 'utf-8');
    } catch (error) {
      console.error(`Error updating blog file ${oldSlug} to ${newSlug}:`, error);
      throw new Error(`Failed to update blog file: ${oldSlug}`);
    }
  }

  /**
   * Delete a blog file
   */
  async deleteBlog(slug: string): Promise<void> {
    try {
      const filePath = path.join(BLOGS_DIR, `${slug}.md`);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting blog file ${slug}:`, error);
      throw new Error(`Failed to delete blog file: ${slug}`);
    }
  }

  /**
   * Check if a blog file exists
   */
  async blogExists(slug: string): Promise<boolean> {
    try {
      const filePath = path.join(BLOGS_DIR, `${slug}.md`);
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const blogFileSystem = new BlogFileSystem();
