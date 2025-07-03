'use client';

import * as React from 'react';
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
      className="relative inline-flex h-7.5 w-14 items-center rounded-full bg-muted border border-border transition-all duration-300 ease-in-out hover:bg-accent"
      aria-label={`Switch to ${isLarge ? '3' : '5'} columns`}
    >
      <span
        className="absolute h-6 w-6 transform rounded-full bg-background border border-border transition-transform duration-300 ease-in-out"
        style={{
          transform: isLarge ? 'translateX(1.75rem)' : 'translateX(0.125rem)',
        }}
      />

      {/* 3 columns indicator */}
      <span className={`absolute left-2.5 text-xs font-mono font-normal transition-opacity ${isLarge ? 'opacity-40' : 'opacity-100'}`}>3</span>

      {/* 5 columns indicator */}
      <span className={`absolute right-2.5 text-xs font-mono font-normal transition-opacity ${isLarge ? 'opacity-100' : 'opacity-40'}`}>5</span>
    </button>
  );
}
