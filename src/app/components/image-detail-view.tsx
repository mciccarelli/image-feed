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
      <div className="flex flex-col md:flex-row">
        {/* Image content - scrollable on desktop, stacked on mobile */}
        <div className="flex-1 md:min-h-[calc(100dvh-40px)] bg-muted/30 flex items-center justify-center w-full h-full">
          <ImageDetailContent image={image} />
        </div>
        {/* Sidebar - below image on mobile, fixed right on desktop */}
        <div className="md:w-64 md:flex-shrink-0 border-t md:border-t-0 md:border-l border-border bg-background md:h-[calc(100dvh-80px)] md:overflow-y-auto">
          <ImageDetailSidebar image={image} />
        </div>
      </div>
    </div>
  );
}
