/**
 * MarkdownContent Component
 * 
 * Renders HTML from markdown processor with proper styling.
 * Features:
 * - Tailwind typography styles
 * - Syntax highlighting for code blocks
 * - Distinct inline code styling
 * - Semantic HTML
 * - Responsive design
 */

interface MarkdownContentProps {
  html: string;
  className?: string;
}

export function MarkdownContent({ html, className = '' }: MarkdownContentProps) {
  return (
    <article
      className={`prose prose-lg dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
