'use client';

import Link from 'next/link';
import { ArrowLeft, User, MapPin, Calendar, Eye, Download, Heart } from 'lucide-react';
import { UnsplashImage } from '@/app/lib/types';

interface ImageDetailToolbarProps {
  image: UnsplashImage;
}

export function ImageDetailToolbar({ image }: ImageDetailToolbarProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatNumber = (num?: number) => {
    if (!num) return '0';
    return num.toLocaleString();
  };

  return (
    <div className="fixed top-10 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-2 h-10">
        {/* Left side - Back button and title */}
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Link href="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>

          <div className="w-px h-6 bg-border" />

          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-medium text-foreground truncate">{image.description || image.alt_description || 'Untitled'}</h1>
          </div>
        </div>

        {/* Right side - Image stats */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
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
  );
}
