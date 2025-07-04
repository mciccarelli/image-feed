'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Calendar, Eye, Download, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { UnsplashImage } from '@/app/lib/types';
import { formatDate, formatNumber } from '@/app/lib/utils';
import { allImagesAtom } from '@/app/state/images';

interface ImageDetailToolbarProps {
  image: UnsplashImage;
}

export function ImageDetailToolbar({ image }: ImageDetailToolbarProps) {
  const router = useRouter();
  const allImages = useAtomValue(allImagesAtom);
  
  // Find current image index and determine if navigation should be shown
  const currentIndex = allImages.findIndex(img => img.id === image.id);
  const hasNavigationContext = allImages.length > 0 && currentIndex !== -1;
  const hasPrevious = hasNavigationContext && currentIndex > 0;
  const hasNext = hasNavigationContext && currentIndex < allImages.length - 1;
  
  const navigateTo = (direction: 'prev' | 'next') => {
    if (!hasNavigationContext) return;
    
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < allImages.length) {
      const targetImage = allImages[newIndex];
      router.push(`/image/${targetImage.id}`);
    }
  };

  return (
    <div className="sticky md:fixed h-10 top-0 md:top-0 left-0 md:left-48 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border text-xs font-mono">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left side - Back button and title */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors font-mono">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <div className="w-px h-6 bg-border" />

          <div className="min-w-0 flex-1">
            <h1 className="text-foreground truncate">{image.description || image.alt_description || 'Untitled'}</h1>
          </div>
        </div>

        {/* Right side - Navigation arrows and image stats */}
        <div className="flex items-center space-x-4">
          {/* Navigation arrows - shown when we have context from homepage */}
          {hasNavigationContext && (
            <div className="flex items-center space-x-1">
              <button
                onClick={() => navigateTo('prev')}
                disabled={!hasPrevious}
                className="p-1 text-muted-foreground hover:text-foreground disabled:text-muted-foreground/50 disabled:cursor-not-allowed transition-colors"
                title="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => navigateTo('next')}
                disabled={!hasNext}
                className="p-1 text-muted-foreground hover:text-foreground disabled:text-muted-foreground/50 disabled:cursor-not-allowed transition-colors"
                title="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image stats - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4 text-xs text-muted-foreground font-mono">
            {image.likes && (
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3" />
                <span>{formatNumber(image.likes)}</span>
              </div>
            )}

            {image.downloads && (
              <div className="flex items-center space-x-1">
                <Download className="w-3 h-3" />
                <span>{formatNumber(image.downloads)}</span>
              </div>
            )}

            {image.views && (
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{formatNumber(image.views)}</span>
              </div>
            )}

            {image.created_at && (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(image.created_at)}</span>
              </div>
            )}

            {image.location?.name && (
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate max-w-24">{image.location.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
