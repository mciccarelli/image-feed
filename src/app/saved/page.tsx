'use client';

import { useAtomValue } from 'jotai';
import { favoriteImagesAtom } from '@/app/state/favorites';
import { SavedImages, PageHeader } from '@/app/components';

export default function SavedPage() {
  const favoriteImages = useAtomValue(favoriteImagesAtom);

  return (
    <>
      <PageHeader title="Saved Images" subtitle={`${favoriteImages.length} ${favoriteImages.length === 1 ? 'image' : 'images'} saved`} />
      <main className="p-2 md:p-8">
        <SavedImages images={favoriteImages} />
      </main>
    </>
  );
}
