'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { UnsplashImage } from '@/app/lib/types';
import { FavoriteHeart } from './favorite-heart';
import { EnhancedImage } from './enhanced-image';
import { gridSizeAtom, getGridClasses } from '@/app/state/grid';
import { allImagesAtom, addImagesAtom, initializeImagesAtom } from '@/app/state/images';

interface MasonryGridProps {
  images: UnsplashImage[];
  keyPrefix?: string;
}

const MasonryGrid = ({ images, keyPrefix = 'masonry-' }: MasonryGridProps) => {
  const gridSize = useAtomValue(gridSizeAtom);
  const gridClasses = getGridClasses(gridSize);

  return (
    <div className={`${gridClasses} gap-2 md:gap-6 space-y-2 md:space-y-6`}>
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
          <motion.div
            key={`${keyPrefix}${image.id}-${idx}`}
            data-image-id={image.id}
            className="break-inside-avoid mb-2 md:mb-6 overflow-hidden bg-card border border-border group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
            style={{ height: displayHeight }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: idx * 0.05,
              ease: 'easeOut',
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
          >
            <Link href={`/image/${image.id}`} className="block relative w-full h-full">
              <EnhancedImage
                image={image}
                priority
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FavoriteHeart image={image} />
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

interface MasonryGridWithLoadMoreProps {
  initialImages: UnsplashImage[];
}

const MasonryGridWithLoadMore = ({ initialImages }: MasonryGridWithLoadMoreProps) => {
  const images = useAtomValue(allImagesAtom);
  const addImages = useSetAtom(addImagesAtom);
  const initializeImages = useSetAtom(initializeImagesAtom);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); // Start from page 2 since initial is page 1
  const gridSize = useAtomValue(gridSizeAtom);
  const gridClasses = getGridClasses(gridSize);
  const perPage = initialImages?.length || 24;

  // Initialize images on mount ONLY ONCE
  useEffect(() => {
    if (images.length === 0 && initialImages.length > 0) {
      initializeImages(initialImages);
    }
  }, [initialImages, images.length, initializeImages]);

  const loadMore = async () => {
    setLoading(true);
    try {
      // Simplified: just fetch the next page of popular images without orientation filtering
      // This ensures consistent pagination and eliminates most duplicate possibilities
      const response = await fetch(`/api/images?per_page=${perPage}&page=${page}&order_by=popular`);

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const newImages = await response.json();

      if (newImages.length > 0) {
        // Add images with deduplication using global atom
        addImages(newImages);
        setPage((currentPage) => currentPage + 1);
      }
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <MasonryGrid images={images} keyPrefix="main-" />

      {loading && (
        <div className={`${gridClasses} gap-2 md:gap-6 space-y-2 md:space-y-6 mt-4`}>
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div
              key={`skeleton-${index}`}
              className="break-inside-avoid mb-2 md:mb-6 bg-card border border-border animate-pulse overflow-hidden"
              style={{ height: 200 + (index % 4) * 50 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
            >
              <div className="w-full h-full bg-muted/50 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-4 py-2 bg-foreground text-background hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground font-mono text-xs uppercase tracking-wider border border-foreground hover:border-foreground/90 disabled:border-border transition-all duration-200 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export { MasonryGrid, MasonryGridWithLoadMore };
export default MasonryGridWithLoadMore;
