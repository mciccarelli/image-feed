'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { ThemeToggle } from "./components/theme-toggle";

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
}

export default function Home() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images');
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
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <main className="container mx-auto pt-16">
        {loading && (
          <div className="flex justify-center">
            <div className="text-lg">Loading images...</div>
          </div>
        )}
        
        {error && (
          <div className="flex justify-center">
            <div className="text-red-500">Error: {error}</div>
          </div>
        )}
        
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={image.urls.small}
                  alt={image.alt_description || 'Unsplash image'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
