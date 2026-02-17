import { SiteConfig, Skill, Project, BlogPost, SocialLink } from './types';

/**
 * Site Configuration
 * Update this with your personal information
 */
export const siteConfig: SiteConfig = {
  name: 'Portfolio',
  title: 'React Native Developer Portfolio',
  description: '4+ years experienced React Native developer specializing in mobile app development. View my portfolio, projects, and blog.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Sankalp Singh',
    email: 'sankalpkumar.singh60@gmail.com',
    title: 'React Native Developer',
    bio: 'Passionate React Native developer with 4+ years of experience building high-quality mobile applications for iOS and Android. Specialized in creating performant, user-friendly apps with clean architecture and modern development practices.',
    yearsOfExperience: 4,
    location: 'Pune, India',
  },
  social: {
    github: 'https://github.com/imsankalp',
    linkedin: 'https://linkedin.com/in/sankalpsingh27',
    twitter: 'https://x.com/_sankalp_singh_',
    email: 'sankalpkumar.singh60@gmail.com',
  },
  seo: {
    keywords: [
      'React Native',
      'Mobile Developer',
      'iOS Developer',
      'Android Developer',
      'TypeScript',
      'JavaScript',
      'Mobile App Development',
      'Cross-Platform Development',
      'Frontend Developer',
    ],
    ogImage: 'https://pbs.twimg.com/profile_images/1993985448126087168/_fArgcFq_400x400.jpg',
  },
};

/**
 * Skills & Technologies
 * Organized by category
 */
export const skills: Skill[] = [
  // Mobile Development
  { name: 'React Native', icon: 'Smartphone', category: 'mobile' },
  { name: 'Expo', icon: 'Zap', category: 'mobile' },
  { name: 'iOS Development', icon: 'Apple', category: 'mobile' },
  { name: 'Android Development', icon: 'Bot', category: 'mobile' },
  { name: 'React Native CLI', icon: 'Terminal', category: 'mobile' },
  
  // Frontend Development
  { name: 'React', icon: 'Code2', category: 'frontend' },
  { name: 'TypeScript', icon: 'FileCode', category: 'frontend' },
  { name: 'JavaScript', icon: 'FileJson', category: 'frontend' },
  { name: 'Next.js', icon: 'Layout', category: 'frontend' },
  { name: 'HTML/CSS', icon: 'Palette', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'Wind', category: 'frontend' },
  
  // Backend & APIs
  { name: 'Node.js', icon: 'Server', category: 'backend' },
  { name: 'REST APIs', icon: 'Globe', category: 'backend' },
  { name: 'GraphQL', icon: 'Network', category: 'backend' },
  { name: 'Firebase', icon: 'Flame', category: 'backend' },
  { name: 'MongoDB', icon: 'Database', category: 'backend' },
  
  // Tools & Others
  { name: 'Git', icon: 'GitBranch', category: 'tools' },
  { name: 'GitHub', icon: 'Github', category: 'tools' },
  { name: 'VS Code', icon: 'Code', category: 'tools' },
  { name: 'Xcode', icon: 'Wrench', category: 'tools' },
  { name: 'Android Studio', icon: 'Settings', category: 'tools' },
  { name: 'Jest', icon: 'TestTube', category: 'tools' },
  { name: 'Redux', icon: 'Box', category: 'tools' },
  { name: 'Zustand', icon: 'Package', category: 'tools' },
];

/**
 * Projects Portfolio
 * Add your projects here
 */
export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'react-native-network-tool',
    description: "A powerful React Native library that allows you to track and inspect all network requests in your app. Perfect for debugging, monitoring, and understanding your app's network behavior.",
    technologies: ['React Native', 'TypeScript', 'Kotlin', 'Objective C'],
    image: '/network-logger.png',
    links: {
      demo: 'https://example.com/demo',
      github: 'https://github.com/imsankalp/react-native-network-tools',
    },
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Fitness Tracking App',
    description: 'Cross-platform fitness tracking application with workout logging, progress charts, and social features. Integrated with health APIs for step counting and calorie tracking.',
    technologies: ['React Native', 'Expo', 'TypeScript', 'GraphQL', 'MongoDB'],
    image: '/images/projects/fitness-app.jpg',
    links: {
      github: 'https://github.com/yourusername/fitness-app',
      playStore: 'https://play.google.com/store/apps/details?id=com.fitnessapp',
    },
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Social Media Dashboard',
    description: 'Real-time social media analytics dashboard for managing multiple accounts. Features include post scheduling, engagement metrics, and audience insights.',
    technologies: ['React Native', 'TypeScript', 'REST APIs', 'Chart.js'],
    image: '/images/projects/social-dashboard.jpg',
    links: {
      demo: 'https://example.com/social-dashboard',
      github: 'https://github.com/yourusername/social-dashboard',
    },
    featured: false,
  },
  {
    id: 'project-4',
    title: 'Recipe Finder App',
    description: 'Mobile app for discovering and saving recipes. Features include ingredient-based search, meal planning, and shopping list generation.',
    technologies: ['React Native', 'JavaScript', 'Firebase', 'Spoonacular API'],
    image: '/images/projects/recipe-app.jpg',
    links: {
      github: 'https://github.com/yourusername/recipe-app',
      appStore: 'https://apps.apple.com/app/recipe-finder',
    },
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Weather Forecast App',
    description: 'Beautiful weather application with hourly and weekly forecasts, weather alerts, and location-based recommendations.',
    technologies: ['React Native', 'TypeScript', 'OpenWeather API', 'Animated'],
    image: '/images/projects/weather-app.jpg',
    links: {
      demo: 'https://example.com/weather-app',
      github: 'https://github.com/yourusername/weather-app',
    },
    featured: false,
  },
  {
    id: 'project-6',
    title: 'Task Management App',
    description: 'Productivity app for managing tasks and projects. Features include drag-and-drop task organization, reminders, and team collaboration.',
    technologies: ['React Native', 'TypeScript', 'Zustand', 'Supabase'],
    image: '/images/projects/task-app.jpg',
    links: {
      github: 'https://github.com/yourusername/task-app',
      playStore: 'https://play.google.com/store/apps/details?id=com.taskapp',
    },
    featured: false,
  },
];

/**
 * Blog Posts
 * Add your blog posts or articles here
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'react-native-performance-optimization',
    title: 'React Native Performance Optimization: Best Practices',
    excerpt: 'Learn how to optimize your React Native apps for better performance. Covering FlatList optimization, image handling, and reducing bundle size.',
    publishedAt: '2024-01-15',
    readTime: 8,
    thumbnail: '/images/blog/performance-optimization.jpg',
    tags: ['React Native', 'Performance', 'Optimization'],
  },
  {
    slug: 'typescript-react-native',
    title: 'Why TypeScript is Essential for React Native Development',
    excerpt: 'Discover the benefits of using TypeScript in React Native projects and how it improves code quality and developer experience.',
    publishedAt: '2024-01-10',
    readTime: 6,
    thumbnail: '/images/blog/typescript-rn.jpg',
    tags: ['TypeScript', 'React Native', 'Best Practices'],
  },
  {
    slug: 'state-management-comparison',
    title: 'Redux vs Zustand vs Context API: Choosing the Right State Management',
    excerpt: 'A comprehensive comparison of popular state management solutions for React Native applications.',
    publishedAt: '2024-01-05',
    readTime: 10,
    thumbnail: '/images/blog/state-management.jpg',
    tags: ['React Native', 'State Management', 'Redux', 'Zustand'],
  },
  {
    slug: 'building-offline-first-apps',
    title: 'Building Offline-First React Native Apps',
    excerpt: 'Learn how to build React Native applications that work seamlessly offline with data synchronization strategies.',
    publishedAt: '2023-12-20',
    readTime: 12,
    thumbnail: '/images/blog/offline-first.jpg',
    tags: ['React Native', 'Offline', 'Architecture'],
  },
  {
    slug: 'react-native-animations',
    title: 'Creating Smooth Animations in React Native',
    excerpt: 'Master React Native animations using Animated API and Reanimated for buttery smooth user experiences.',
    publishedAt: '2023-12-15',
    readTime: 9,
    thumbnail: '/images/blog/animations.jpg',
    tags: ['React Native', 'Animations', 'UI/UX'],
  },
  {
    slug: 'testing-react-native-apps',
    title: 'Complete Guide to Testing React Native Applications',
    excerpt: 'From unit tests to E2E testing, learn how to ensure your React Native app is production-ready.',
    publishedAt: '2023-12-10',
    readTime: 15,
    thumbnail: '/images/blog/testing.jpg',
    tags: ['React Native', 'Testing', 'Jest', 'Detox'],
  },
];

/**
 * Social Media Links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: siteConfig.social.github || '',
    icon: 'Github',
  },
  {
    platform: 'LinkedIn',
    url: siteConfig.social.linkedin || '',
    icon: 'Linkedin',
  },
  {
    platform: 'Twitter',
    url: siteConfig.social.twitter || '',
    icon: 'Twitter',
  },
  {
    platform: 'Email',
    url: `mailto:${siteConfig.social.email}`,
    icon: 'Mail',
  },
];

/**
 * Navigation Links
 */
export const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Hero Section Content
 */
export const heroContent = {
  name: siteConfig.author.name,
  title: siteConfig.author.title,
  tagline: 'Building exceptional mobile experiences with React Native',
  ctaButtons: [
    {
      label: 'View Projects',
      href: '#projects',
      variant: 'primary' as const,
    },
    {
      label: 'Contact Me',
      href: '#contact',
      variant: 'secondary' as const,
    },
  ],
};

/**
 * About Section Content
 */
export const aboutContent = {
  bio: siteConfig.author.bio,
  yearsOfExperience: siteConfig.author.yearsOfExperience,
  highlights: [
    '4+ years of React Native development experience',
    'Published multiple apps on App Store and Play Store',
    'Expert in TypeScript and modern JavaScript',
    'Strong focus on performance and user experience',
    'Experience with CI/CD and automated testing',
    'Passionate about clean code and best practices',
  ],
  profileImage: 'https://pbs.twimg.com/profile_images/1993985448126087168/_fArgcFq_400x400.jpg',
};

/**
 * Form Validation Rules
 */
export const formValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 2000,
  },
};

/**
 * Copyright Information
 */
export const copyrightText = `© ${new Date().getFullYear()} ${siteConfig.author.name}. All rights reserved.`;
