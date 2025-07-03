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

  const handleLoad = () => {
    setIsLoaded(true);
  };

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
        className={className}
        onLoad={handleLoad}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
