'use client';

import { Heart } from 'lucide-react';
import { useAtom } from 'jotai';
import { favoriteImagesAtom, isImageFavorited, toggleImageFavorite } from '@/app/state/favorites';
import { UnsplashImage } from '@/app/lib/types';

interface FavoriteHeartProps {
  image: UnsplashImage;
}

export function FavoriteHeart({ image }: FavoriteHeartProps) {
  const [favorites, setFavorites] = useAtom(favoriteImagesAtom);
  const isFavorited = isImageFavorited(favorites, image.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedFavorites = toggleImageFavorite(favorites, image);
    setFavorites(updatedFavorites);
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="absolute top-2 right-2 z-10 p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200"
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`w-3 h-3 transition-all duration-200 ${
          isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground hover:fill-red-500 hover:text-red-500'
        }`}
      />
    </button>
  );
}
