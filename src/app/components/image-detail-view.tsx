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
    <div className="min-h-[calc(100dvh-82px)] bg-background">
      {/* Secondary toolbar with image details */}
      <ImageDetailToolbar image={image} />

      {/* Main content area */}
      <div className="flex h-[calc(100dvh-41px)] mt-[41px]">
        {/* 80px = navbar (40px) + toolbar (40px) */}
        {/* Left column - Large image */}
        <div className="flex-1 min-w-0 w-full max-w-[calc(100dvw-384px)] md:h-[calc(100dvh-81px)] overflow-hidden">
          <ImageDetailContent image={image} />
        </div>
        {/* Right sidebar - Actions */}
        <div className="w-96 border-l border-border bg-background fixed top-[81px] right-0 h-[calc(100dvh-81px)] overflow-y-auto">
          <ImageDetailSidebar image={image} />
        </div>
      </div>
    </div>
  );
}
