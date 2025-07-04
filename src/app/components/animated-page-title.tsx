'use client';

import { motion } from 'motion/react';

interface AnimatedPageTitleProps {
  title: string;
}

export function AnimatedPageTitle({ title }: AnimatedPageTitleProps) {
  return (
    <motion.h1
      className="text-sm text-foreground truncate"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      key={title}
    >
      {title}
    </motion.h1>
  );
}
