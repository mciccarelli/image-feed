'use client';

import { atom } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';

// Atom to store all loaded images
export const allImagesAtom = atom<UnsplashImage[]>([]);

// Atom to store current page number
export const currentPageAtom = atom<number>(1);

// Atom to store loading state
export const loadingAtom = atom<boolean>(false);

// Helper function to deduplicate images by ID
export const deduplicateImages = (images: UnsplashImage[]): UnsplashImage[] => {
  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.id)) {
      return false;
    }
    seen.add(image.id);
    return true;
  });
};

// Helper function to add new images while avoiding duplicates
export const addUniqueImages = (existingImages: UnsplashImage[], newImages: UnsplashImage[]): UnsplashImage[] => {
  const combined = [...existingImages, ...newImages];
  return deduplicateImages(combined);
};

// Atom with write action to add images (automatically deduplicates)
export const addImagesAtom = atom(null, (get, set, newImages: UnsplashImage[]) => {
  const currentImages = get(allImagesAtom);
  const uniqueImages = addUniqueImages(currentImages, newImages);
  set(allImagesAtom, uniqueImages);
});

// Atom to initialize images (replaces existing with deduplication)
export const initializeImagesAtom = atom(null, (get, set, initialImages: UnsplashImage[]) => {
  const deduplicatedImages = deduplicateImages(initialImages);
  set(allImagesAtom, deduplicatedImages);
  set(currentPageAtom, 1);
});
