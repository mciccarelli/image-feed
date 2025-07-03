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
      className="flex items-center justify-center p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
      title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={`w-3 h-3 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-current'}`} />
    </button>
  );
}
