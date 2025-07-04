'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Share2, Download, Copy } from 'lucide-react';
import { UnsplashImage } from '@/app/lib/types';
import { FavoriteButton } from './favorite-button';

interface ImageDetailSidebarProps {
  image: UnsplashImage;
}

export function ImageDetailSidebar({ image }: ImageDetailSidebarProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${image.alt_description || 'Image'} by ${image.user.name}`,
          text: image.description || image.alt_description || '',
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.urls.full || image.urls.regular;
    link.download = `${image.id}.jpg`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionButtons = [
    {
      component: <FavoriteButton image={image} />,
      key: 'favorite',
    },
    {
      onClick: handleShare,
      icon: copySuccess ? <Copy className="w-3 h-3" /> : <Share2 className="w-3 h-3" />,
      title: copySuccess ? 'Copied!' : 'Share',
      key: 'share',
    },
    {
      onClick: handleDownload,
      icon: <Download className="w-3 h-3" />,
      title: 'Download',
      key: 'download',
    },
  ];

  const detailItems = [
    {
      label: 'DIM',
      value: `${image.width}×${image.height}`,
      key: 'dimensions',
    },
    ...(image.likes
      ? [
          {
            label: 'LIKES',
            value: image.likes.toLocaleString(),
            key: 'likes',
          },
        ]
      : []),
    ...(image.downloads
      ? [
          {
            label: 'DL',
            value: image.downloads.toLocaleString(),
            key: 'downloads',
          },
        ]
      : []),
    ...(image.views
      ? [
          {
            label: 'VIEWS',
            value: image.views.toLocaleString(),
            key: 'views',
          },
        ]
      : []),
  ];

  const exifItems = [
    ...(image.exif?.make
      ? [
          {
            label: 'MAKE',
            value: image.exif.make,
            key: 'make',
          },
        ]
      : []),
    ...(image.exif?.model
      ? [
          {
            label: 'MODEL',
            value: image.exif.model,
            key: 'model',
          },
        ]
      : []),
    ...(image.exif?.focal_length
      ? [
          {
            label: 'FOCAL',
            value: image.exif.focal_length,
            key: 'focal',
          },
        ]
      : []),
    ...(image.exif?.aperture
      ? [
          {
            label: 'F-STOP',
            value: `f/${image.exif.aperture}`,
            key: 'aperture',
          },
        ]
      : []),
    ...(image.exif?.iso
      ? [
          {
            label: 'ISO',
            value: image.exif.iso,
            key: 'iso',
          },
        ]
      : []),
    ...(image.exif?.exposure_time
      ? [
          {
            label: 'SHUTTER',
            value: `${image.exif.exposure_time}s`,
            key: 'shutter',
          },
        ]
      : []),
  ];

  const sections = [
    {
      title: 'ACTIONS',
      key: 'actions',
      content: (
        <div className="flex items-center gap-1">
          {actionButtons.map((button) =>
            button.component ? (
              <div key={button.key}>{button.component}</div>
            ) : (
              <button
                key={button.key}
                onClick={button.onClick}
                className="flex items-center justify-center p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
                title={button.title}
              >
                {button.icon}
              </button>
            )
          )}
        </div>
      ),
    },
    {
      title: 'AUTHOR',
      key: 'author',
      content: (
        <div className="flex items-center space-x-2">
          {image.user.profile_image?.medium && <img src={image.user.profile_image.medium} alt={image.user.name} className="w-7 h-7 rounded-full" />}
          <div className="min-w-0 flex-1">
            <p className="font-medium text-foreground truncate">{image.user.name}</p>
            {image.user.username && image.user.links?.html && (
              <Link
                href={image.user.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors truncate"
              >
                @{image.user.username}
              </Link>
            )}
            {image.user.username && !image.user.links?.html && <p className="text-muted-foreground truncate">@{image.user.username}</p>}
          </div>
        </div>
      ),
    },
    {
      title: 'DETAILS',
      key: 'details',
      content: (
        <div className="space-y-1">
          {detailItems.map((item) => (
            <div key={item.key} className="flex justify-between py-1 last:border-b-0 border-b border-border">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    ...(image.tags && image.tags.length > 0
      ? [
          {
            title: 'TAGS',
            key: 'tags',
            content: (
              <div className="flex flex-wrap gap-1">
                {image.tags.slice(0, 6).map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-1.5 py-0.5 bg-muted text-muted-foreground border border-border">
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(image.exif && exifItems.length > 0
      ? [
          {
            title: 'EXIF',
            key: 'exif',
            content: (
              <div className="space-y-1">
                {exifItems.map((item) => (
                  <div key={item.key} className="flex justify-between py-1 last:border-b-0 border-b border-border">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-foreground truncate ml-2">{item.value}</span>
                  </div>
                ))}
              </div>
            ),
          },
        ]
      : []),
    ...(image.location
      ? [
          {
            title: 'LOCATION',
            key: 'location',
            content: (
              <div className="text-muted-foreground">
                {image.location.name && <div className="truncate">{image.location.name.toUpperCase()}</div>}
                {image.location.city && image.location.country && (
                  <div className="truncate">
                    {image.location.city.toUpperCase()}, {image.location.country.toUpperCase()}
                  </div>
                )}
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="h-full overflow-y-auto font-mono text-xs bg-background md:fixed md:top-10 md:right-0 md:w-64 border-l border-border">
      {sections.map((section) => (
        <div key={section.key} className="border-b border-border">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">{section.title}</h3>
          </div>
          <div className="p-3">{section.content}</div>
        </div>
      ))}
    </div>
  );
}
