'use client';

import { useState } from 'react';
import * as motion from 'motion/react-client';
import Image from 'next/image';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { UnsplashImage } from '@/app/lib/types';
import { cn } from '@/app/lib/utils';

interface ThumbnailImageProps {
  image: UnsplashImage;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  alt?: string;
}

export function ThumbnailImage({ image, priority = false, className = '', fill = false, sizes, alt }: ThumbnailImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const tooltipContent = image.description || image.alt_description || 'Untitled';

  const imageContainer = (
    <div
      className={cn(
        'relative w-full h-full overflow-hidden transition-transform duration-300 ease-in-out object-cover w-full md:hover:scale-105',
        fill ? 'h-full' : 'h-auto'
      )}
    >
      <Skeleton className="absolute inset-0 w-full h-full rounded-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        className="relative w-full h-full"
      >
        <Image
          priority={priority}
          src={image?.urls?.regular}
          alt={alt || image.alt_description || 'Unsplash image'}
          width={fill ? undefined : image.width}
          height={fill ? undefined : image.height}
          fill={fill}
          sizes={sizes}
          className={className}
          onLoad={handleLoad}
        />
      </motion.div>
    </div>
  );

  const imageElement = (
    <div>
      {imageContainer}

      {/* Mobile-only caption */}
      <div className="md:hidden p-3 text-xs font-mono text-muted-foreground">{tooltipContent}</div>
    </div>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{imageElement}</TooltipTrigger>
        <TooltipContent side="top" className="font-mono text-xs bg-background/95 backdrop-blur-sm border-border max-w-xs">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
