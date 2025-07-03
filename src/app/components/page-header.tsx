'use client';

import { useAtomValue } from 'jotai';
import { allImagesAtom } from '@/app/state/images';
import { AnimatedImageCount } from './animated-image-count';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showImageCount?: boolean;
}

export function PageHeader({ title, subtitle, showImageCount = false }: PageHeaderProps) {
  const images = useAtomValue(allImagesAtom);

  return (
    <div className="md:fixed md:top-0 left-0 md:left-48 h-10 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-4 py-2 h-10">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h1 className="text-sm font-medium text-foreground truncate">{title}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs text-muted-foreground font-mono">
          {showImageCount && images.length > 0 && <AnimatedImageCount count={images.length} />}
          {subtitle && <span className="truncate">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
