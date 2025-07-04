'use client';

import { UnsplashImage } from '@/app/lib/types';
import { ImageDetailToolbar } from './image-detail-toolbar';
import { ImageDetailSidebar } from './image-detail-sidebar';
import { ImageDetailContent } from './image-detail-content';

interface ImageDetailViewProps {
  image: UnsplashImage;
}

export function ImageDetailView({ image }: ImageDetailViewProps) {
  return (
    <div className="md:h-[calc(100dvh-40px)] md:overflow-hidden bg-background">
      {/* Secondary toolbar with image details */}
      <ImageDetailToolbar image={image} />

      {/* Main content area */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Image content */}
        <div className="md:col-span-10 min-w-0 w-full md:h-calc(100dvh-40px) overflow-hidden">
          <ImageDetailContent image={image} />
        </div>
        {/* Sidebar - below image on mobile, right side on desktop */}
        <div className="md:col-span-2 border-t md:border-t-0 md:border-l border-border bg-background md:h-dvh md:overflow-y-auto md:h-[calc(100dvh-40px)]">
          <ImageDetailSidebar image={image} />
        </div>
      </div>
    </div>
  );
}
