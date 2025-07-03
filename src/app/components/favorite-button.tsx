'use client';

import { Heart } from 'lucide-react';
import { useAtom } from 'jotai';
import { favoriteImagesAtom, isImageFavorited, toggleImageFavorite } from '@/app/state/favorites';
import { UnsplashImage } from '@/app/lib/types';

interface FavoriteButtonProps {
  image: UnsplashImage;
}

export function FavoriteButton({ image }: FavoriteButtonProps) {
  const [favorites, setFavorites] = useAtom(favoriteImagesAtom);
  const isFavorited = isImageFavorited(favorites, image.id);

  const handleToggleFavorite = () => {
    const updatedFavorites = toggleImageFavorite(favorites, image);
    setFavorites(updatedFavorites);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="flex items-center space-x-2 px-3 py-2 rounded-md bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
    >
      <Heart 
        className={`w-4 h-4 transition-colors ${
          isFavorited 
            ? 'fill-red-500 text-red-500' 
            : 'text-current'
        }`}
      />
      <span>{isFavorited ? 'Saved' : 'Save'}</span>
    </button>
  );
}