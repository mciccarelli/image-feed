'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
  width: number;
  height: number;
}

interface ImagesFeedProps {
  count?: number;
}

export default function ImagesFeed({ count = 20 }: ImagesFeedProps) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`/api/images?count=${count}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [count]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading images...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {images.map((image) => {
        const aspectRatio = image.height / image.width;
        const displayHeight =
          aspectRatio > 1.5 ? 400 : aspectRatio < 0.7 ? 250 : 320;

        return (
          <div
            key={image.id}
            className="break-inside-avoid mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
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
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm font-medium">
                by {image.user.name}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
