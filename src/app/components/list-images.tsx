'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';
import { FavoriteHeart } from './favorite-heart';
import { gridSizeAtom, getGridClasses } from '@/app/state/grid';

interface ListImagesProps {
  images: UnsplashImage[];
  keyPrefix?: string;
}

export function ListImages({ images, keyPrefix = '' }: ListImagesProps) {
  const gridSize = useAtomValue(gridSizeAtom);
  const gridClasses = getGridClasses(gridSize);

  return (
    <div className={`${gridClasses} gap-4 md:gap-16 space-y-4 md:space-y-16`}>
      {images.map((image, idx) => {
        const aspectRatio = image.height / image.width;
        const displayHeight = aspectRatio > 1.5 ? 400 : aspectRatio < 0.7 ? 250 : 320;

        return (
          <div
            key={`${keyPrefix}${image.id}-${idx}`}
            className="break-inside-avoid mb-4 md:mb-16 overflow-hidden bg-muted group"
            style={{ height: displayHeight }}
          >
            <Link href={`/image/${image.id}`} className="block relative w-full h-full">
              <Image
                src={image.urls.regular}
                alt={image.alt_description || 'Unsplash image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <FavoriteHeart image={image} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
