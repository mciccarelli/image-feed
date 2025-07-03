'use client';

import * as React from 'react';
import { useAtom } from 'jotai';
import { gridSizeAtom, GRID_SIZES, GridSize } from '@/app/state/grid';

export function GridSizeToggle() {
  const [gridSize, setGridSize] = useAtom(gridSizeAtom);
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">columns</span>
      
      <div className="flex items-center space-x-1">
        {Object.entries(GRID_SIZES).map(([size, columns]) => (
          <button
            key={size}
            onClick={() => setGridSize(size as GridSize)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              gridSize === size 
                ? 'bg-gray-700 text-gray-100' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
            aria-label={`Set grid to ${columns} columns`}
          >
            {columns}
          </button>
        ))}
      </div>
    </div>
  );
}