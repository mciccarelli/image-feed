'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/app/components/ui/skeleton';
import { UnsplashImage } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

interface FullSizeImageProps {
  image: UnsplashImage;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  alt?: string;
}

export function FullSizeImage({ image, priority = false, className = '', fill = false, sizes, alt }: FullSizeImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden',
        fill ? 'h-full' : 'h-auto'
      )}
    >
      {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}

      <Image
        priority={priority}
        src={image?.urls?.full || image?.urls?.regular}
        alt={alt || image.alt_description || 'Unsplash image'}
        width={fill ? undefined : image.width}
        height={fill ? undefined : image.height}
        fill={fill}
        sizes={sizes}
        className={className}
        onLoad={handleLoad}
      />
    </div>
  );
}