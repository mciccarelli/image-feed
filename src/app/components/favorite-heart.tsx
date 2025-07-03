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
      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all duration-300 group-hover:scale-110 hover:scale-125"
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-5 h-5 transition-all duration-300 ${
          isFavorited 
            ? 'fill-red-500 text-red-500 scale-110' 
            : 'text-white hover:text-red-400'
        }`}
      />
    </button>
  );
}