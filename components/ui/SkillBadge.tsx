'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Skill } from '@/lib/types';
import { skillBadgeVariants } from '@/lib/animations';

interface SkillBadgeProps {
  skill: Skill;
}

/**
 * SkillBadge Component
 * 
 * Displays a skill with icon and hover animation.
 * Features:
 * - Lucide React icon
 * - Hover scale animation
 * - ARIA labels for accessibility
 * - Keyboard focus indicators
 * 
 * @param skill - Skill object with name, icon, and category
 */
export function SkillBadge({ skill }: SkillBadgeProps) {
  // Get icon component by name
  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="h-5 w-5" aria-hidden="true" /> : null;
  };

  return (
    <motion.div
      variants={skillBadgeVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
      role="listitem"
      aria-label={`${skill.name} skill`}
      tabIndex={0}
    >
      {/* Icon */}
      <span className="text-blue-600 dark:text-blue-400">
        {getIcon(skill.icon)}
      </span>
      
      {/* Skill Name */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {skill.name}
      </span>
    </motion.div>
  );
}
