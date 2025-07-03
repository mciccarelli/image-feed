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
    <div className={`${gridClasses} gap-3 md:gap-6 space-y-3 md:space-y-6`}>
      {images.map((image, idx) => {
        // Enhanced masonry height calculation with better variety
        const aspectRatio = image.height / image.width;
        const baseWidth = 300;

        // Create more interesting height variations
        const naturalHeight = Math.round(baseWidth * aspectRatio);

        // Define size categories for more variety
        const sizeVariations = [
          { min: 180, max: 280, weight: 0.3 }, // Small
          { min: 280, max: 420, weight: 0.4 }, // Medium
          { min: 420, max: 600, weight: 0.2 }, // Large
          { min: 600, max: 800, weight: 0.1 }, // Extra large
        ];

        // Use image index and dimensions to create predictable but varied heights
        const seedValue = (image.id.charCodeAt(0) + idx) % 100;
        let cumulativeWeight = 0;
        let selectedRange = sizeVariations[1]; // fallback to medium

        for (const range of sizeVariations) {
          cumulativeWeight += range.weight * 100;
          if (seedValue < cumulativeWeight) {
            selectedRange = range;
            break;
          }
        }

        // Calculate height within selected range, respecting aspect ratio
        const constrainedHeight = Math.max(selectedRange.min, Math.min(selectedRange.max, naturalHeight));

        // Add slight random variation while maintaining aspect ratio influence
        const variation = (seedValue % 20) - 10; // -10 to +10
        const displayHeight = Math.max(180, constrainedHeight + variation);

        return (
          <div
            key={`${keyPrefix}${image.id}-${idx}`}
            data-image-id={image.id}
            className="break-inside-avoid mb-3 md:mb-6 overflow-hidden bg-card border border-border group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 rounded-lg"
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
              <FavoriteHeart image={image} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
