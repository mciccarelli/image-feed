'use client';

import { UnsplashImage } from '@/app/lib/types';
import { EnhancedImage } from './enhanced-image';

interface ImageDetailContentProps {
  image: UnsplashImage;
}

export function ImageDetailContent({ image }: ImageDetailContentProps) {
  return (
    <div className="h-[50vh] md:h-full flex items-center justify-center p-4 md:p-20 bg-muted/30">
      <div className="relative w-full h-full max-w-4xl">
        <EnhancedImage
          image={image}
          useHD={true}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
        />
      </div>
    </div>
  );
}
