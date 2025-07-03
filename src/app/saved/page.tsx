'use client';

import { useAtomValue } from 'jotai';
import { favoriteImagesAtom } from '@/app/state/favorites';
import { SavedImages } from '@/app/components/saved-images';

export default function SavedPage() {
  const favoriteImages = useAtomValue(favoriteImagesAtom);

  return (
    <main className="p-4 md:p-10 pt-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Saved Images
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {favoriteImages.length} {favoriteImages.length === 1 ? 'image' : 'images'} saved
        </p>
      </div>
      
      <SavedImages images={favoriteImages} />
    </main>
  );
}