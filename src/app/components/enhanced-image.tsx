'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/app/components/ui/skeleton';
import { UnsplashImage } from '@/app/lib/types';

interface EnhancedImageProps {
  image: UnsplashImage;
  useHD?: boolean;
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
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}

      <Image
        priority={priority}
        src={useHD && image?.urls?.full ? image.urls.full : image?.urls?.regular}
        alt={alt || image.alt_description || 'Unsplash image'}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        fill={fill}
        sizes={sizes}
        className={className}
        onLoad={handleLoad}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: fill ? '100%' : 'auto',
        }}
      />
    </div>
  );
}
