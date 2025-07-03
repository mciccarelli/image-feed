'use client';

import { atomWithStorage } from 'jotai/utils';
import { UnsplashImage } from '@/app/lib/types';

// Atom to store favorite images with localStorage persistence
export const favoriteImagesAtom = atomWithStorage<UnsplashImage[]>('favoriteImages', []);

// Helper function to check if an image is favorited
export const isImageFavorited = (favorites: UnsplashImage[], imageId: string): boolean => {
  return favorites.some((fav) => fav.id === imageId);
};

// Helper function to toggle favorite status
export const toggleImageFavorite = (favorites: UnsplashImage[], image: UnsplashImage): UnsplashImage[] => {
  const isFavorited = isImageFavorited(favorites, image.id);

  if (isFavorited) {
    // Remove from favorites
    return favorites.filter((fav) => fav.id !== image.id);
  } else {
    // Add to favorites
    return [...favorites, image];
  }
};
