'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/app/components/ui/skeleton';
import { UnsplashImage } from '@/app/lib/types';

interface EnhancedImageProps {
  image: UnsplashImage;
  useHD?: boolean; // Use high-definition image if available
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  alt?: string;
}

export function EnhancedImage({ image, useHD, priority = false, className = '', fill = false, sizes, alt }: EnhancedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
    setIsLoaded(true);
  };

  if (isError) {
    return (
      <div className={`flex items-center justify-center bg-muted text-muted-foreground ${className}`}>
        <div className="text-center">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">Image failed to load</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Loading skeleton */}
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
      )}
      
      {/* Actual image */}
      <Image
        priority={priority}
        src={useHD && image?.urls?.full ? image.urls.full : image?.urls?.regular}
        alt={alt || image.alt_description || 'Unsplash image'}
        fill={fill}
        sizes={sizes}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 ease-in-out`}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
