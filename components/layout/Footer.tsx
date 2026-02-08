'use client';

import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import * as Icons from 'lucide-react';
import { FooterProps } from '@/lib/types';
import { fadeInUp } from '@/lib/animations';

/**
 * Footer Component
 * 
 * Site footer with:
 * - Social media links with icons
 * - Copyright information
 * - Back to top button with smooth scroll
 * - Full keyboard accessibility
 * 
 * @param socialLinks - Array of social media links
 * @param copyright - Copyright text
 */
export function Footer({ socialLinks, copyright }: FooterProps) {
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get icon component by name
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" aria-hidden="true" /> : null;
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex items-center space-x-6"
          >
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md p-2"
                aria-label={`Visit ${link.platform} profile`}
              >
                {getIcon(link.icon)}
                <span className="sr-only">{link.platform}</span>
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-sm text-gray-600 dark:text-gray-400 text-center"
          >
            {copyright}
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            onClick={scrollToTop}
            className="inline-flex items-center justify-center p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-lg hover:shadow-xl"
            aria-label="Scroll to top"
            type="button"
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
