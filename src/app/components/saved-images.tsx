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
        <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No saved images yet</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">Start exploring images and click the heart icon to save your favorites here.</p>
        <Link href="/" className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium transition-colors">
          Explore Images
        </Link>
      </div>
    );
  }

  return <ListImages images={images} keyPrefix="saved-" />;
}
