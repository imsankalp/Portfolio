'use client';

import { motion } from 'framer-motion';
import { SkillsProps, SkillCategory } from '@/lib/types';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { SkillBadge } from '@/components/ui';

/**
 * Skills Section Component
 * 
 * Displays technical skills and technologies.
 * Features:
 * - Skills displayed using SkillBadge components
 * - Grouped by category (mobile, frontend, backend, tools)
 * - Staggered entrance animations
 * - Includes React Native, TypeScript, and mobile technologies
 * - Semantic HTML (section, h2)
 * - ARIA labels for accessibility
 * 
 * @param skills - Array of skill objects
 * @param groupByCategory - Whether to group skills by category (default: true)
 */
export function Skills({ skills, groupByCategory = true }: SkillsProps) {
  // Group skills by category
  const groupedSkills = groupByCategory
    ? skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {} as Record<SkillCategory, typeof skills>)
    : { all: skills };

  // Category labels
  const categoryLabels: Record<SkillCategory | 'all', string> = {
    mobile: 'Mobile Development',
    frontend: 'Frontend Development',
    backend: 'Backend & APIs',
    tools: 'Tools & Others',
    all: 'All Skills',
  };

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Skills & Technologies
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for building exceptional mobile and web applications
          </p>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto mt-6" aria-hidden="true" />
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div
              key={category}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Category Title */}
              {groupByCategory && (
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  {categoryLabels[category as SkillCategory]}
                </h3>
              )}

              {/* Skills List */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
                role="list"
                aria-label={`${categoryLabels[category as SkillCategory]} skills`}
              >
                {categorySkills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
