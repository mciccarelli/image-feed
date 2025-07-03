'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAtomValue } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';
import { FavoriteHeart } from './favorite-heart';
import { LinkIcon } from 'lucide-react';
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
            className="break-inside-avoid mb-4 md:mb-16 overflow-hidden bg-gray-100 dark:bg-gray-800 group"
            style={{ height: displayHeight }}
          >
            <div className="relative w-full h-full">
              <Image
                src={image.urls.regular}
                alt={image.alt_description || 'Unsplash image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <FavoriteHeart image={image} />
              {image.user && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-3 text-xs flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <Link
                    href={image?.user?.links?.html || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:no-underline text-gray-300 hover:text-gray-200 hover:underline transition-colors duration-200 flex items-center space-x-2"
                  >
                    <LinkIcon className="w-2 h-2" />
                    <span className="font-medium">{image.user.name}</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}