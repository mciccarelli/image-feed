'use client';

import { atomWithStorage } from 'jotai/utils';

// Grid size options (number of columns)
export const GRID_SIZES = {
  small: 2,
  medium: 3,
  large: 4,
  xl: 5,
} as const;

export type GridSize = keyof typeof GRID_SIZES;

// Atom to store grid size with localStorage persistence
export const gridSizeAtom = atomWithStorage<GridSize>('gridSize', 'medium');

// Helper function to get Tailwind CSS classes for grid size
export const getGridClasses = (size: GridSize): string => {
  const columns = GRID_SIZES[size];

  switch (columns) {
    case 2:
      return 'columns-1 sm:columns-2';
    case 3:
      return 'columns-1 sm:columns-2 md:columns-3';
    case 4:
      return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4';
    case 5:
      return 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5';
    default:
      return 'columns-1 sm:columns-2 md:columns-3';
  }
};
