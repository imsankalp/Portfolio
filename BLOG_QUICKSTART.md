# Blog System Quick Start Guide

Get your blog up and running in 5 minutes!

## Step 1: Set Environment Variables

Create or update `.env.local` in your project root:

```env
ADMIN_PASSWORD=mySecurePassword123
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long-abc123
```

## Step 2: Start the Development Server

```bash
npm run dev
```

## Step 3: Access the Admin Dashboard

1. Open your browser and go to: `http://localhost:3000/admin/login`
2. Enter your password: `mySecurePassword123`
3. You'll be redirected to the admin dashboard

## Step 4: Create Your First Blog Post

1. Click the "New Post" button
2. Fill in the form:
   - **Title**: "My First Blog Post"
   - **Excerpt**: "This is my first blog post!"
   - **Content**: Write some markdown content
   - **Tags**: "tutorial, first-post"
3. Click "Create Post"

## Step 5: View Your Blog

1. Go to: `http://localhost:3000/blog`
2. You'll see your blog post listed
3. Click on it to read the full post

## That's It!

Your blog is now fully functional. You can:

- ✅ Create new blog posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ View all posts on the blog page
- ✅ Read individual posts with full markdown rendering

## Next Steps

- Read the full [BLOG_SETUP.md](./BLOG_SETUP.md) for detailed documentation
- Customize the design in `components/ui/BlogCard.tsx`
- Add your own blog posts in the `blogs/` directory
- Deploy to production (Vercel, Netlify, etc.)

## Sample Blog Post Format

Create a file in `blogs/my-post.md`:

```markdown
---
title: My Awesome Post
excerpt: A brief description
publishedAt: '2024-01-20T10:00:00Z'
readTime: 5
thumbnail: /images/blog/my-image.jpg
tags:
  - tutorial
  - react
slug: my-awesome-post
---

# My Content

Write your blog content here using **Markdown**!

\`\`\`javascript
const code = 'example';
\`\`\`
```

## Troubleshooting

**Can't login?**
- Check your `.env.local` file has the correct password
- Restart the dev server after changing environment variables

**Blog posts not showing?**
- Make sure markdown files are in the `blogs/` directory
- Check the frontmatter is properly formatted (YAML syntax)

**Need help?**
- Check [BLOG_SETUP.md](./BLOG_SETUP.md) for detailed documentation
- Review the sample blog posts in the `blogs/` directory

---

Happy blogging! 🚀
