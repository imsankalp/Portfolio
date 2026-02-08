// Core Data Types for Portfolio Website

/**
 * Skill category types
 */
export type SkillCategory = 'frontend' | 'mobile' | 'backend' | 'tools';

/**
 * Skill interface
 */
export interface Skill {
  name: string;
  icon: string; // Lucide icon name
  category: SkillCategory;
}

/**
 * Project interface
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  links?: {
    demo?: string;
    github?: string;
    appStore?: string;
    playStore?: string;
  };
  featured?: boolean;
}

/**
 * Blog post interface
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: number; // minutes
  thumbnail?: string;
  tags?: string[];
  externalUrl?: string; // For Medium, Dev.to, etc.
}

/**
 * Contact form data interface
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  meetingRequest?: boolean;
}

/**
 * Social link interface
 */
export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

/**
 * Site configuration interface
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    title: string;
    bio: string;
    yearsOfExperience: number;
    location?: string;
  };
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email: string;
  };
  seo: {
    keywords: string[];
    ogImage: string;
  };
}

/**
 * Hero section props
 */
export interface HeroProps {
  name: string;
  title: string;
  tagline: string;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: 'primary' | 'secondary';
  }>;
}

/**
 * About section props
 */
export interface AboutProps {
  bio: string;
  yearsOfExperience: number;
  highlights: string[];
  profileImage?: string;
}

/**
 * Skills section props
 */
export interface SkillsProps {
  skills: Skill[];
  groupByCategory?: boolean;
}

/**
 * Projects section props
 */
export interface ProjectsProps {
  projects: Project[];
  showFilter?: boolean;
}

/**
 * Blog section props
 */
export interface BlogProps {
  posts: BlogPost[];
  maxPosts?: number; // For preview section
}

/**
 * Navigation props
 */
export interface NavigationProps {
  links: Array<{
    label: string;
    href: string;
  }>;
  logo?: string;
}

/**
 * Footer props
 */
export interface FooterProps {
  socialLinks: SocialLink[];
  copyright: string;
}

/**
 * Form validation schema
 */
export interface ContactFormValidation {
  name: {
    required: true;
    minLength: number;
    maxLength: number;
  };
  email: {
    required: true;
    pattern: RegExp;
  };
  subject: {
    required: true;
    minLength: number;
    maxLength: number;
  };
  message: {
    required: true;
    minLength: number;
    maxLength: number;
  };
}

/**
 * Form field error type
 */
export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}
