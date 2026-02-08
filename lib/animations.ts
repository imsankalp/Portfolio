import { Variants } from 'framer-motion';

/**
 * Fade in from bottom animation
 * Used for scroll-triggered content reveals
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Simple fade in animation
 * Used for subtle content reveals
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

/**
 * Slide in from left animation
 * Used for side content reveals
 */
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Slide in from right animation
 * Used for side content reveals
 */
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Scale in animation
 * Used for cards and interactive elements
 */
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    }
  }
};

/**
 * Stagger container animation
 * Used for animating lists of items with delay
 */
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Stagger item animation
 * Used with staggerContainer for individual items
 */
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

/**
 * Hover scale animation
 * Used for interactive elements like buttons and cards
 */
export const hoverScale = {
  rest: { 
    scale: 1 
  },
  hover: { 
    scale: 1.05, 
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    } 
  }
};

/**
 * Hover glow animation
 * Used for buttons and interactive elements
 */
export const hoverGlow = {
  rest: { 
    boxShadow: '0 0 0 rgba(59, 130, 246, 0)' 
  },
  hover: { 
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: {
      duration: 0.3
    }
  }
};

/**
 * Hover lift animation
 * Used for cards to create depth
 */
export const hoverLift = {
  rest: { 
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  hover: { 
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
};

/**
 * Button press animation
 * Used for tap feedback on buttons
 */
export const tapScale = {
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

/**
 * Rotate animation
 * Used for loading spinners or icons
 */
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Bounce animation
 * Used for scroll indicators or attention-grabbing elements
 */
export const bounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Pulse animation
 * Used for notifications or live indicators
 */
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

/**
 * Typewriter cursor blink animation
 * Used for text typing effects
 */
export const cursorBlink: Variants = {
  animate: {
    opacity: [1, 0, 1],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Page transition variants
 * Used for page enter/exit animations
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

/**
 * Modal/Dialog animation variants
 * Used for modal enter/exit animations
 */
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

/**
 * Backdrop animation variants
 * Used for modal/dialog backdrops
 */
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

/**
 * Navigation menu animation variants
 * Used for mobile menu slide-in
 */
export const menuVariants: Variants = {
  closed: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
};

/**
 * Menu item stagger animation
 * Used for animating menu items sequentially
 */
export const menuItemVariants: Variants = {
  closed: {
    opacity: 0,
    x: 20
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: 'easeOut'
    }
  })
};

/**
 * Skill badge animation variants
 * Used for skill badges with hover effects
 */
export const skillBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  hover: {
    scale: 1.1,
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  }
};

/**
 * Get animation variant by name
 * Helper function to retrieve animation variants
 */
export const getAnimationVariant = (name: string): Variants => {
  const variants: Record<string, Variants> = {
    'fade-up': fadeInUp,
    'fade': fadeIn,
    'slide-left': slideInLeft,
    'slide-right': slideInRight,
    'scale': scaleIn,
  };
  
  return variants[name] || fadeIn;
};

/**
 * Animation configuration for reduced motion
 * Returns simplified animations when user prefers reduced motion
 */
export const getReducedMotionVariant = (): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  }
});
