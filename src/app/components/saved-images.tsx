'use client';

import Link from 'next/link';
import { UnsplashImage } from '@/app/lib/types';
import { ListImages } from './list-images';
import { Heart } from 'lucide-react';

interface SavedImagesProps {
  images: UnsplashImage[];
}

export function SavedImages({ images }: SavedImagesProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="border border-border bg-card p-6 max-w-sm">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-4 h-4 text-muted-foreground" />
            <span className="font-mono text-sm text-muted-foreground">~/favorites</span>
          </div>
          <h2 className="font-mono text-lg font-medium text-foreground mb-2">empty directory</h2>
          <p className="font-mono text-sm text-muted-foreground mb-4">no images saved yet</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background hover:bg-foreground/90 rounded border font-mono text-sm font-medium transition-colors"
          >
            <span>$</span>
            <span>explore</span>
          </Link>
        </div>
      </div>
    );
  }

  return <ListImages images={images} keyPrefix="saved-" />;
}
