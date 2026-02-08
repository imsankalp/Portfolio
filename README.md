# React Native Developer Portfolio Website

A modern, performant portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS, showcasing React Native development expertise.

## Features

- 🎨 Modern, responsive design
- ⚡ Optimized performance with Next.js App Router
- 🎭 Smooth animations with Framer Motion
- 🎵 Spotify playlist embed
- 📧 Contact form with EmailJS integration
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessibility-first (WCAG AA compliant)
- 🔍 SEO optimized with meta tags and structured data
- 🎬 Lottie animations for visual appeal

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, Lottie
- **Icons**: Lucide React
- **Forms**: EmailJS
- **Deployment**: Vercel

## Environment Variables

This project requires environment variables for the contact form. Create a `.env.local` file in the root directory and add the following:

### Required Environment Variables

#### EmailJS (for contact form)
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

**How to get EmailJS credentials:**

1. **Create an EmailJS Account:**
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Verify your email address

2. **Create an Email Service:**
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy the Service ID to your `.env.local`

3. **Create an Email Template:**
   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Design your email template with these variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
     - `{{meeting_request}}` - Meeting request checkbox
   - Save and copy the Template ID to your `.env.local`

4. **Get Public Key:**
   - Go to "Account" → "General"
   - Find your Public Key
   - Copy it to your `.env.local`

**Note:** The contact form will show an error if EmailJS is not configured.

#### Site Configuration
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Change this to your production URL when deploying (e.g., `https://yourname.com`).

### Optional: Running Without EmailJS

If you want to run the project without EmailJS, the contact form will show "Email service is not configured" but the site will still function normally.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- EmailJS Account (for contact form)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd portfolio-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials (see Environment Variables section above for detailed instructions).

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Project Structure

```
portfolio-website/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── blog/                # Blog pages
│   └── api/                 # API routes
├── components/
│   ├── sections/            # Main section components
│   ├── ui/                  # Reusable UI components
│   └── layout/              # Layout components
├── lib/                     # Utilities and configurations
│   ├── constants.ts         # Site content and configuration
│   ├── animations.ts        # Framer Motion variants
│   └── emailjs.ts           # EmailJS configuration
└── public/                  # Static assets
    ├── images/              # Images
    └── lottie/              # Lottie animation files
```

## Customization

### Update Site Content

Edit `lib/constants.ts` to update:
- Personal information
- Skills and technologies
- Projects
- Blog posts
- Social media links

### Modify Styling

- Global styles: `app/globals.css`
- Tailwind theme: Inline theme in `app/globals.css`
- Component-specific styles: Use Tailwind utility classes

### Add Lottie Animations

1. Download Lottie JSON files from [LottieFiles](https://lottiefiles.com/)
2. Place them in `public/lottie/`
3. Import and use with the `LottieAnimation` component

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Build your project
- Deploy to a global CDN
- Set up HTTPS
- Enable automatic deployments on push

## Performance

Target Lighthouse scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## License

MIT License - feel free to use this template for your own portfolio!

## Acknowledgments

- Design inspiration from modern portfolio websites
- Built with [Next.js](https://nextjs.org/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
