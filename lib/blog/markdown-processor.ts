/**
 * Markdown Processor Service
 * 
 * Handles parsing, serialization, and rendering of markdown content.
 */

import matter from 'gray-matter';
import { marked, type MarkedOptions } from 'marked';
import hljs from 'highlight.js';
import { BlogPost, BlogMetadata, ParsedMarkdown } from './types';

/**
 * Configure marked with syntax highlighting
 */
const markedOptions: MarkedOptions = {
  highlight: function(code: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (err) {
        console.error('Error highlighting code:', err);
      }
    }
    return hljs.highlightAuto(code).value;
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true,
} as MarkedOptions;

marked.setOptions(markedOptions);

/**
 * Markdown Processor Service
 * Provides methods for parsing, serializing, and rendering markdown content
 */
export class MarkdownProcessor {
  /**
   * Parse markdown file with frontmatter
   */
  parse(rawContent: string): ParsedMarkdown {
    try {
      const { data, content } = matter(rawContent);
      
      // Validate required metadata fields
      const metadata: BlogMetadata = {
        title: data.title || '',
        excerpt: data.excerpt || '',
        publishedAt: data.publishedAt || new Date().toISOString(),
        readTime: data.readTime || 0,
        thumbnail: data.thumbnail,
        tags: Array.isArray(data.tags) ? data.tags : [],
        slug: data.slug || '',
      };
      
      return {
        metadata,
        content: content.trim(),
      };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      throw new Error('Failed to parse markdown content');
    }
  }

  /**
   * Serialize blog post to markdown with frontmatter
   */
  serialize(post: BlogPost): string {
    const frontmatter = {
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      readTime: post.readTime,
      thumbnail: post.thumbnail,
      tags: post.tags,
      slug: post.slug,
    };
    
    return matter.stringify(post.content, frontmatter);
  }

  /**
   * Render markdown to HTML
   */
  async renderToHtml(markdown: string): Promise<string> {
    try {
      const html = await marked.parse(markdown);
      return html;
    } catch (error) {
      console.error('Error rendering markdown to HTML:', error);
      throw new Error('Failed to render markdown content');
    }
  }

  /**
   * Calculate read time from content
   * Assumes average reading speed of 200 words per minute
   */
  calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes); // Minimum 1 minute
  }
}

// Export singleton instance
export const markdownProcessor = new MarkdownProcessor();
