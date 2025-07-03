import Image from 'next/image';
import { UnsplashImage } from '@/lib/types';

interface ImagesFeedProps {
  images: UnsplashImage[];
}

export default function ImagesFeed({ images }: ImagesFeedProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
      {images.map((image) => {
        const aspectRatio = image.height / image.width;
        const displayHeight = aspectRatio > 1.5 ? 400 : aspectRatio < 0.7 ? 250 : 320;

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
          </div>
        );
      })}
    </div>
  );
}
