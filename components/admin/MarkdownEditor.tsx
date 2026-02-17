'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

/**
 * MarkdownEditor Component
 * 
 * Markdown editor with preview functionality.
 * Features:
 * - Textarea for markdown input
 * - Optional preview toggle
 * - Syntax support
 * - Responsive design
 */
export function MarkdownEditor({ value, onChange, disabled = false }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      {/* Editor Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Supports Markdown syntax
        </div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={disabled}
        >
          {showPreview ? (
            <>
              <EyeOff className="w-4 h-4" aria-hidden="true" />
              Hide Preview
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" aria-hidden="true" />
              Show Preview
            </>
          )}
        </button>
      </div>

      {/* Editor/Preview */}
      <div className="grid grid-cols-1 gap-4">
        {/* Markdown Input */}
        <div className={showPreview ? 'lg:col-span-1' : 'col-span-1'}>
          <textarea
            id="content"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            rows={20}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-mono text-sm transition-colors resize-y"
            placeholder="Write your blog content in Markdown...

# Heading 1
## Heading 2

**Bold text**
*Italic text*

- List item 1
- List item 2

```javascript
const code = 'example';
```

[Link text](https://example.com)"
            disabled={disabled}
          />
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="lg:col-span-1">
            <div className="w-full h-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 overflow-auto">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {value ? (
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdownPreview(value) }} />
                ) : (
                  <p className="text-gray-400 italic">Preview will appear here...</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Tip: Use Markdown syntax for formatting. Code blocks, headings, lists, and more are supported.
      </div>
    </div>
  );
}

/**
 * Simple markdown preview renderer
 * Note: This is a basic implementation. In production, you'd use the same markdown processor.
 */
function renderMarkdownPreview(markdown: string): string {
  // Basic markdown to HTML conversion for preview
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n/gim, '<br />');

  return html;
}
