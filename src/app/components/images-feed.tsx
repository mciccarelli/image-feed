'use client';

import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';
import { Skeleton } from '@/app/components/ui/skeleton';
import { ListImages } from './list-images';
import { 
  allImagesAtom, 
  currentPageAtom, 
  loadingAtom, 
  addImagesAtom, 
  initializeImagesAtom 
} from '@/app/state/images';

function ImageSkeleton() {
  // Random heights to simulate masonry layout
  const heights = [250, 320, 400];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className="break-inside-avoid mb-4 md:mb-16" style={{ height: randomHeight }}>
      <Skeleton className="w-full h-full" />
    </div>
  );
}

interface ImagesFeedProps {
  initialImages: UnsplashImage[];
}

export default function ImagesFeed({ initialImages }: ImagesFeedProps) {
  const images = useAtomValue(allImagesAtom);
  const [page, setPage] = useAtom(currentPageAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const addImages = useSetAtom(addImagesAtom);
  const initializeImages = useSetAtom(initializeImagesAtom);

  // Initialize images on mount
  useEffect(() => {
    initializeImages(initialImages);
  }, [initialImages, initializeImages]);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?per_page=10&page=${page + 1}`);
      if (!response.ok) throw new Error('Failed to fetch more images');

      const newImages = await response.json();
      addImages(newImages); // This automatically deduplicates
      setPage(page + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ListImages images={images} keyPrefix="feed-" />

      {loading && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-16 space-y-4 md:space-y-16 mt-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <ImageSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={loadMore}
          disabled={loading}
          className="px-6 py-3 bg-secondary hover:bg-accent disabled:bg-muted text-secondary-foreground hover:text-accent-foreground rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
