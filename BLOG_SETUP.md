# Blog Management System Setup Guide

This guide will help you set up and use the blog management system for your portfolio website.

## Features

✅ **Markdown-based blog posts** - Write content in Markdown format with frontmatter metadata  
✅ **Secure admin interface** - Password-protected dashboard for managing blogs  
✅ **CRUD operations** - Create, read, update, and delete blog posts  
✅ **Syntax highlighting** - Beautiful code blocks with highlight.js  
✅ **Responsive design** - Works perfectly on all devices  
✅ **SEO optimized** - Proper metadata and structured data  
✅ **Clean UI** - Modern, accessible interface for readers and admins  

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Blog Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password_here
JWT_SECRET=your_jwt_secret_key_at_least_32_characters_long
```

**Important Security Notes:**
- Use a strong, unique password for `ADMIN_PASSWORD`
- Generate a secure random string for `JWT_SECRET` (at least 32 characters)
- Never commit these values to version control
- In production, use environment variables from your hosting platform

### 2. Create Your First Blog Post

Blog posts are stored as Markdown files in the `blogs/` directory. Here's the structure:

```markdown
---
title: Your Blog Post Title
excerpt: A brief description of your blog post
publishedAt: '2024-01-15T10:00:00Z'
readTime: 5
thumbnail: /images/blog/your-image.jpg
tags:
  - React Native
  - TypeScript
  - Tutorial
slug: your-blog-post-slug
---

# Your Blog Content

Write your blog content here using Markdown syntax...

## Subheading

You can use all standard Markdown features:

- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks with syntax highlighting

```typescript
const example = 'Hello World';
console.log(example);
```
```

### 3. Access the Admin Dashboard

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Enter your admin password (from `.env.local`)
4. You'll be redirected to the admin dashboard

### 4. Managing Blog Posts

#### Creating a New Post

1. Click "New Post" in the admin dashboard
2. Fill in all required fields:
   - **Title** (required)
   - **Excerpt** (required)
   - **Content** (required, Markdown format)
   - **Slug** (optional, auto-generated from title)
   - **Thumbnail URL** (optional)
   - **Tags** (comma-separated)
   - **Published Date** (defaults to current date)
3. Click "Create Post"

#### Editing a Post

1. Click "Edit" next to any blog post in the dashboard
2. Modify the fields as needed
3. Click "Update Post"

#### Deleting a Post

1. Click "Delete" next to any blog post
2. Confirm the deletion
3. The blog post file will be permanently removed

## File Structure

```
blogs/                          # Blog post markdown files
├── welcome-to-my-blog.md
├── react-native-tips.md
└── ...

lib/blog/                       # Blog system core
├── types.ts                    # TypeScript interfaces
├── file-system.ts              # File operations
├── markdown-processor.ts       # Markdown parsing & rendering
└── blog-service.ts             # Business logic

lib/auth/                       # Authentication
├── auth-service.ts             # Auth logic
└── middleware.ts               # Route protection

app/blog/                       # Public blog pages
├── page.tsx                    # Blog list page
└── [slug]/page.tsx            # Individual blog post page

app/admin/                      # Admin interface
├── page.tsx                    # Admin dashboard
├── login/page.tsx             # Login page
└── blog/
    ├── new/page.tsx           # Create blog page
    └── [slug]/edit/page.tsx   # Edit blog page

app/api/admin/                  # API routes
├── blog/
│   ├── route.ts               # POST (create)
│   └── [slug]/route.ts        # PUT (update), DELETE
└── auth/
    ├── login/route.ts         # POST (login)
    └── logout/route.ts        # POST (logout)

components/admin/               # Admin components
├── BlogForm.tsx               # Blog creation/edit form
└── MarkdownEditor.tsx         # Markdown editor with preview
```

## Markdown Features

The blog system supports all standard Markdown features:

### Headings
```markdown
# H1
## H2
### H3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
~~Strikethrough~~
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Links and Images
```markdown
[Link text](https://example.com)
![Alt text](/images/example.jpg)
```

### Code Blocks
````markdown
```typescript
const greeting = 'Hello World';
console.log(greeting);
```
````

### Blockquotes
```markdown
> This is a blockquote
```

## Customization

### Changing Syntax Highlighting Theme

Edit `app/layout.tsx` and change the highlight.js theme:

```typescript
import "highlight.js/styles/github-dark.css"; // Change this line
```

Available themes: `github-dark`, `monokai`, `atom-one-dark`, `vs2015`, etc.

### Modifying Blog Card Design

Edit `components/ui/BlogCard.tsx` to customize the blog card appearance.

### Customizing Admin Dashboard

Edit `app/admin/page.tsx` to modify the admin dashboard layout and styling.

## Security Best Practices

1. **Strong Passwords**: Use a password manager to generate strong admin passwords
2. **JWT Secret**: Use a cryptographically secure random string for JWT_SECRET
3. **HTTPS**: Always use HTTPS in production
4. **Environment Variables**: Never commit `.env.local` to version control
5. **Regular Updates**: Keep dependencies updated for security patches

## Troubleshooting

### "Unauthorized" Error
- Check that your `.env.local` file has the correct `ADMIN_PASSWORD`
- Clear browser cookies and try logging in again
- Restart your development server

### Blog Posts Not Showing
- Ensure markdown files are in the `blogs/` directory
- Check that frontmatter is properly formatted (YAML syntax)
- Verify all required fields are present (title, excerpt, slug, etc.)

### Syntax Highlighting Not Working
- Ensure `highlight.js` is installed: `npm install highlight.js`
- Check that the CSS is imported in `app/layout.tsx`
- Verify code blocks use proper markdown syntax with language tags

## Production Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy your repository
3. Blog posts will be included in the build

### Other Platforms
1. Set environment variables in your hosting platform
2. Ensure the `blogs/` directory is included in deployment
3. Build and deploy as usual

## Support

For issues or questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the code comments in the source files
- Open an issue in your repository

---

**Happy blogging! 🎉**
