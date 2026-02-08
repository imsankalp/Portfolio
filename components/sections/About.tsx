'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2, User } from 'lucide-react';
import { AboutProps } from '@/lib/types';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '@/lib/animations';

/**
 * About Section Component
 * 
 * Displays professional background and experience.
 * Features:
 * - Professional bio with scroll-triggered fade-in
 * - Years of experience highlight
 * - Experience highlights with staggered animations
 * - Optional profile image with lazy loading
 * - Semantic HTML (section, h2)
 * - ARIA labels for accessibility
 * 
 * @param bio - Professional biography text
 * @param yearsOfExperience - Number of years of experience
 * @param highlights - Array of key highlights
 * @param profileImage - Optional profile image URL
 */
export function About({ bio, yearsOfExperience, highlights, profileImage }: AboutProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 shadow-2xl">
              {profileImage && !imageError ? (
                <Image
                  src={profileImage}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="h-32 w-32 text-gray-400 dark:text-gray-600" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-2xl" aria-hidden="true" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-2xl" aria-hidden="true" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Section Title */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2
                id="about-heading"
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              >
                About Me
              </h2>
              <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full" aria-hidden="true" />
            </motion.div>

            {/* Years of Experience Badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full font-semibold mb-6"
            >
              <span className="text-2xl">{yearsOfExperience}+</span>
              <span>Years Experience</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8"
            >
              {bio}
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Highlights
              </h3>
              <ul className="space-y-3" role="list">
                {highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    variants={staggerItem}
                    className="flex items-start gap-3"
                    role="listitem"
                  >
                    <CheckCircle2
                      className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {highlight}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
