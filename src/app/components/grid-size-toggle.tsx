'use client';

import * as React from 'react';
import * as motion from 'motion/react-client';
import { useAtom } from 'jotai';
import { gridSizeAtom } from '@/app/state/grid';

export function GridSizeToggle() {
  const [gridSize, setGridSize] = useAtom(gridSizeAtom);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLarge = gridSize === 'large';

  const toggleGrid = () => {
    setGridSize(isLarge ? 'medium' : 'large');
  };

  return (
    <button
      onClick={toggleGrid}
      className="relative inline-flex h-7.5 w-14 items-center rounded-full bg-muted border border-border hover:bg-accent"
      aria-label={`Switch to ${isLarge ? '3' : '5'} columns`}
      style={{
        justifyContent: isLarge ? 'flex-end' : 'flex-start',
        padding: '0.125rem',
      }}
    >
      <motion.div
        className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center"
        layout
        transition={{
          type: 'spring',
          duration: 0.3,
          bounce: 0,
        }}
      >
        <span className="text-xs font-mono font-normal">{isLarge ? '5' : '3'}</span>
      </motion.div>
    </button>
  );
}
