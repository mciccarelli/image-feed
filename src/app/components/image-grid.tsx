'use client';

import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import Link from 'next/link';
import { UnsplashImage } from '@/app/lib/types';
import { FavoriteHeart } from './favorite-heart';
import { ThumbnailImage } from './thumbnail-image';
import { gridSizeAtom } from '@/app/state/grid';
import { allImagesAtom, addImagesAtom, initializeImagesAtom } from '@/app/state/images';

interface ImageGridProps {
  images: UnsplashImage[];
  keyPrefix?: string;
}

const ImageGrid = ({ images, keyPrefix = 'grid-' }: ImageGridProps) => {
  const gridSize = useAtomValue(gridSizeAtom);
  const gridClasses = gridSize === 'medium' ? 'columns-1 sm:columns-2 md:columns-3' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5';

  return (
    <div className={`${gridClasses} gap-4 space-y-4`}>
      {images.map((image, idx) => (
        <div
          key={`${keyPrefix}${image.id}-${idx}`}
          data-image-id={image.id}
          className="break-inside-avoid mb-4 overflow-hidden bg-card border border-border group relative"
        >
          <Link href={`/image/${image.id}`} className="block relative w-full">
            <ThumbnailImage
              image={image}
              priority={idx < 6}
              className="object-cover w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          </Link>
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FavoriteHeart image={image} />
          </div>
        </div>
      ))}
    </div>
  );
};

interface ImageGridWithLoadMoreProps {
  initialImages: UnsplashImage[];
}

const ImageGridWithLoadMore = ({ initialImages }: ImageGridWithLoadMoreProps) => {
  const images = useAtomValue(allImagesAtom);
  const addImages = useSetAtom(addImagesAtom);
  const initializeImages = useSetAtom(initializeImagesAtom);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2); // Start from page 2
  const gridSize = useAtomValue(gridSizeAtom);
  const gridClasses = gridSize === 'medium' ? 'columns-1 sm:columns-2 md:columns-3' : 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5';
  const perPage = 24;

  // Initialize images on mount ONLY ONCE
  useEffect(() => {
    if (images.length === 0 && initialImages.length > 0) {
      initializeImages(initialImages);
    }
  }, [initialImages, images.length, initializeImages]);

  const loadMore = async () => {
    setLoading(true);
    try {
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
      <ImageGrid images={images} keyPrefix="main-" />

      {loading && (
        <div className={`${gridClasses} gap-4 space-y-4 mt-4`}>
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="break-inside-avoid mb-4 bg-card border border-border animate-pulse overflow-hidden"
              style={{ height: 200 + (index % 4) * 50 }}
            >
              <div className="w-full h-full bg-muted/50" />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center my-4 md:my-12">
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

export { ImageGrid, ImageGridWithLoadMore };
export default ImageGridWithLoadMore;
