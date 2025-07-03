'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UnsplashImage } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

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
  const [images, setImages] = useState<UnsplashImage[]>(initialImages);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/images?per_page=10&page=${page + 1}`);
      if (!response.ok) throw new Error('Failed to fetch more images');

      const newImages = await response.json();
      setImages((prev) => [...prev, ...newImages]);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-16 space-y-4 md:space-y-16">
        {images.map((image) => {
          const aspectRatio = image.height / image.width;
          const displayHeight = aspectRatio > 1.5 ? 400 : aspectRatio < 0.7 ? 250 : 320;

          return (
            <div
              key={image.id}
              className="break-inside-avoid mb-4 md:mb-16 overflow-hidden bg-gray-100 dark:bg-gray-800"
              style={{ height: displayHeight }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.urls.regular}
                  alt={image.alt_description || 'Unsplash image'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                />
              </div>
            </div>
          );
        })}
      </div>

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
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
}
