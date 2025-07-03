'use client';

import { useAtomValue } from 'jotai';
import { favoriteImagesAtom } from '@/app/state/favorites';
import { SavedImages } from '@/app/components/saved-images';

export default function SavedPage() {
  const favoriteImages = useAtomValue(favoriteImagesAtom);

  return (
    <main className="p-4 md:p-10 pt-14">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Saved Images
        </h1>
        <p className="text-muted-foreground">
          {favoriteImages.length} {favoriteImages.length === 1 ? 'image' : 'images'} saved
        </p>
      </div>
      
      <SavedImages images={favoriteImages} />
    </main>
  );
}