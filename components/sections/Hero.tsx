'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { HeroProps } from '@/lib/types';
import { fadeInUp, fadeIn, staggerContainer, staggerItem, bounce } from '@/lib/animations';
import { LottieAnimation } from '@/components/ui';

/**
 * Hero Section Component
 * 
 * Introduction section displayed above the fold.
 * Features:
 * - Animated name and title with Framer Motion
 * - Tagline with fade-in effect
 * - CTA buttons with hover animations
 * - Optional Lottie animation
 * - Scroll indicator with bounce animation
 * - Semantic HTML (h1 for name)
 * - ARIA labels for accessibility
 * 
 * @param name - Developer name
 * @param title - Job title
 * @param tagline - Brief tagline or description
 * @param ctaButtons - Call-to-action buttons array
 */
export function Hero({ name, title, tagline, ctaButtons }: HeroProps) {
  // Handle smooth scroll to section
  const handleScrollClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              variants={staggerItem}
              className="text-blue-600 dark:text-blue-400 font-medium mb-4"
            >
              Hi, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              id="hero-heading"
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {name}
            </motion.h1>

            {/* Title */}
            <motion.h2
              variants={staggerItem}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6"
            >
              {title}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              variants={staggerItem}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {tagline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {ctaButtons.map((button) => (
                <motion.button
                  key={button.label}
                  onClick={() => handleScrollClick(button.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    button.variant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg hover:shadow-xl'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label={`${button.label} - Navigate to ${button.href.replace('#', '')} section`}
                >
                  {button.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          {/* Optional Lottie Animation or Illustration */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg aspect-square">
              {/* Placeholder for Lottie animation */}
              {/* Uncomment and add your Lottie animation JSON file */}
              {/* <LottieAnimation
                animationData="/lottie/developer-animation.json"
                loop={true}
                autoplay={true}
                className="w-full h-full"
              /> */}
              
              {/* Fallback illustration */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💻</div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    React Native Developer
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        variants={bounce}
        animate="animate"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <button
          onClick={() => handleScrollClick('#about')}
          className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md p-2"
          aria-label="Scroll to About section"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown className="h-6 w-6" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}
