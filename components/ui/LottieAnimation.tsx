'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'framer-motion';

// Dynamically import Player to avoid SSR issues
const Player = dynamic(
  () => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player),
  { ssr: false }
);

interface LottieAnimationProps {
  animationData: object | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
  onComplete?: () => void;
}

/**
 * LottieAnimation Component
 * 
 * A wrapper for Lottie animations with performance optimizations.
 * Features:
 * - Lazy loading of animation data
 * - Pauses animation when out of viewport
 * - Respects user's motion preferences
 * - Configurable playback options
 * 
 * @param animationData - Lottie JSON data or URL to JSON file
 * @param loop - Whether to loop the animation (default: true)
 * @param autoplay - Whether to autoplay when in view (default: true)
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param speed - Playback speed (default: 1)
 * @param onComplete - Callback when animation completes
 */
export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style,
  speed = 1,
  onComplete,
}: LottieAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [shouldPlay, setShouldPlay] = useState(false);

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Control playback based on viewport visibility
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldPlay(false);
      return;
    }

    if (autoplay && isInView) {
      setShouldPlay(true);
    } else if (!isInView) {
      setShouldPlay(false);
    }
  }, [isInView, autoplay, prefersReducedMotion]);

  // Handle animation complete
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Don't render animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div 
        ref={ref} 
        className={className} 
        style={style}
        aria-hidden="true"
      >
        {/* Placeholder for reduced motion */}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <Player
        autoplay={shouldPlay}
        loop={loop}
        src={animationData}
        speed={speed}
        onEvent={(event) => {
          if (event === 'complete') {
            handleComplete();
          }
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          ...style 
        }}
      />
    </div>
  );
}
