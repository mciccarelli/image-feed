'use client';

import { UnsplashImage } from '@/app/lib/types';
import { FullSizeImage } from './full-size-image';

interface ImageDetailContentProps {
  image: UnsplashImage;
}

export function ImageDetailContent({ image }: ImageDetailContentProps) {
  // Determine if image is landscape or portrait
  const isLandscape = image.width > image.height;

  // Use 16/9 for landscape, 2/3 for portrait
  const aspectRatioClass = isLandscape ? 'aspect-video max-w-4xl' : 'aspect-[2/3] max-w-xl';

  return (
    <div className="md:h-[calc(100dvh-40px)] flex items-center justify-center p-4 bg-muted/30">
      <div className={`relative w-full ${aspectRatioClass}`}>
        <FullSizeImage
          image={image}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 60vw"
        />
      </div>
    </div>
  );
}
