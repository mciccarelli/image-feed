'use client';

import { useAtomValue } from 'jotai';
import { allImagesAtom } from '@/app/state/images';
import { favoriteImagesAtom } from '@/app/state/favorites';
import { AnimatedImageCount } from './animated-image-count';
import { usePathname } from 'next/navigation';

interface PageHeaderProps {
  title: string;
  showImageCount?: boolean;
}

export function PageHeader({ title, showImageCount = false }: PageHeaderProps) {
  const allImages = useAtomValue(allImagesAtom);
  const savedImages = useAtomValue(favoriteImagesAtom);

  const pathname = usePathname();
  const isSavedPage = pathname.startsWith('/saved');

  const text = isSavedPage ? `${savedImages.length} ${savedImages.length === 1 ? 'image' : 'images'} saved` : '';

  return (
    <div className="md:fixed md:top-0 left-0 md:left-48 h-10 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-2 h-10">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-medium text-foreground truncate">{title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
          {showImageCount && allImages.length > 0 && <AnimatedImageCount count={allImages.length} />}
          {text && <span className="truncate">{text}</span>}
        </div>
      </div>
    </div>
  );
}
