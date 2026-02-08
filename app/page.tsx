'use client';

import { Hero, About, Skills, Projects, Blog, SpotifyWidget, Contact } from '@/components/sections';
import { Navigation, Footer } from '@/components/layout';
import {
  heroContent,
  aboutContent,
  skills,
  projects,
  blogPosts,
  navigationLinks,
  socialLinks,
  copyrightText,
  siteConfig,
} from '@/lib/constants';

// Disable prerendering for this page
export const dynamic = 'force-dynamic';

/**
 * Homepage
 * 
 * Main portfolio page with all sections:
 * - Hero (Introduction)
 * - About
 * - Skills
 * - Projects
 * - Blog (preview)
 * - Contact
 */
export default function Home() {
  return (
    <>
      <Navigation links={navigationLinks} logo={siteConfig.name} />
      
      <main id="main-content">
        <Hero {...heroContent} />
        <About {...aboutContent} />
        <Skills skills={skills} groupByCategory={true} />
        <Projects projects={projects} showFilter={false} />
        <Blog posts={blogPosts} maxPosts={6} />
        <SpotifyWidget />
        <Contact />
      </main>

      <Footer socialLinks={socialLinks} copyright={copyrightText} />
    </>
  );
}
