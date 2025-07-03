'use client';

import Link from 'next/link';
import { UnsplashImage } from '@/app/lib/types';
import { ListImages } from './list-images';
import { Heart } from 'lucide-react';

interface SavedImagesProps {
  images: UnsplashImage[];
}

export function SavedImages({ images }: SavedImagesProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">No saved images yet</h2>
        <p className="text-muted-foreground mb-6 max-w-md">Start exploring images and click the heart icon to save your favorites here.</p>
        <Link href="/" className="px-6 py-3 bg-secondary hover:bg-accent text-secondary-foreground hover:text-accent-foreground rounded-lg font-medium transition-colors">
          Explore Images
        </Link>
      </div>
    );
  }

  return <ListImages images={images} keyPrefix="saved-" />;
}
