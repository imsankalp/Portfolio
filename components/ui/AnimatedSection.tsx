'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { getAnimationVariant, getReducedMotionVariant } from '@/lib/animations';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade' | 'fade-up' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  threshold?: number;
  className?: string;
}

/**
 * AnimatedSection Component
 * 
 * A reusable wrapper component that triggers animations when scrolled into view.
 * Automatically respects user's motion preferences.
 * 
 * @param children - Content to animate
 * @param animation - Type of animation to apply (default: 'fade-up')
 * @param delay - Delay before animation starts in seconds (default: 0)
 * @param threshold - Intersection observer threshold (default: 0.1)
 * @param className - Additional CSS classes
 */
export function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-100px',
    amount: threshold 
  });
  const shouldReduceMotion = useReducedMotion();

  // Use reduced motion variant if user prefers reduced motion
  const variants = shouldReduceMotion 
    ? getReducedMotionVariant()
    : getAnimationVariant(animation);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
