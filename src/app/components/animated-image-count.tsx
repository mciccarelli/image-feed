'use client';

import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect } from 'react';

interface AnimatedImageCountProps {
  count: number;
}

export function AnimatedImageCount({ count }: AnimatedImageCountProps) {
  const motionCount = useMotionValue(0);
  const rounded = useTransform(() => Math.round(motionCount.get()));

  useEffect(() => {
    const controls = animate(motionCount, count, { duration: 0.8 });
    return () => controls.stop();
  }, [count, motionCount]);

  return (
    <span className="whitespace-nowrap">
      <motion.span>{rounded}</motion.span> {count === 1 ? 'image' : 'images'} loaded
    </span>
  );
}
