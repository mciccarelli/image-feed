'use client';

import { atom } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';

// Atom to store all loaded images
export const allImagesAtom = atom<UnsplashImage[]>([]);

// Atom to store current page number
export const currentPageAtom = atom<number>(1);

// Atom to store loading state
export const loadingAtom = atom<boolean>(false);

// Atom with write action to add images (automatically deduplicates)
export const addImagesAtom = atom(null, (get, set, newImages: UnsplashImage[]) => {
  const currentImages = get(allImagesAtom);
  const combined = [...currentImages, ...newImages];
  
  // Deduplicate by ID
  const seen = new Set<string>();
  const uniqueImages = combined.filter((image) => {
    if (seen.has(image.id)) {
      return false;
    }
    seen.add(image.id);
    return true;
  });
  
  set(allImagesAtom, uniqueImages);
});

// Atom to initialize images (replaces existing with deduplication)
export const initializeImagesAtom = atom(null, (_get, set, initialImages: UnsplashImage[]) => {
  // Deduplicate initial images by ID
  const seen = new Set<string>();
  const deduplicatedImages = initialImages.filter((image) => {
    if (seen.has(image.id)) {
      return false;
    }
    seen.add(image.id);
    return true;
  });
  
  set(allImagesAtom, deduplicatedImages);
  set(currentPageAtom, 1);
});
