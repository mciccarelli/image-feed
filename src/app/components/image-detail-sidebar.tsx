'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Share2, Download, ExternalLink, Copy } from 'lucide-react';
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

  return (
    <div className="h-full overflow-y-auto font-mono text-xs bg-background">
      {/* Actions */}
      <div className="border-b border-border">
        <div className="px-3 py-2 bg-muted/50 border-b border-border">
          <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">ACTIONS</h3>
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1">
            <FavoriteButton image={image} />
            <button
              onClick={handleShare}
              className="flex items-center justify-center p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
              title={copySuccess ? 'Copied!' : 'Share'}
            >
              {copySuccess ? <Copy className="w-3 h-3" /> : <Share2 className="w-3 h-3" />}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center justify-center p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors border border-border"
              title="Download"
            >
              <Download className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="border-b border-border">
        <div className="px-3 py-2 bg-muted/50 border-b border-border">
          <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">AUTHOR</h3>
        </div>
        <div className="p-3 space-y-2">
          <div className="flex items-center space-x-2">
            {image.user.profile_image?.medium && <img src={image.user.profile_image.medium} alt={image.user.name} className="w-6 h-6 rounded" />}
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground truncate">{image.user.name}</p>
              {image.user.username && <p className="text-muted-foreground truncate">@{image.user.username}</p>}
            </div>
          </div>

          {image.user.links?.html && (
            <Link
              href={image.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              <span>UNSPLASH</span>
            </Link>
          )}
        </div>
      </div>

      {/* Image Details */}
      <div className="border-b border-border">
        <div className="px-3 py-2 bg-muted/50 border-b border-border">
          <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">DETAILS</h3>
        </div>
        <div className="p-3">
          <div className="space-y-1">
            <div className="flex justify-between py-1 border-b border-border">
              <span className="text-muted-foreground">DIM</span>
              <span className="text-foreground">
                {image.width}×{image.height}
              </span>
            </div>

            {image.likes && (
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">LIKES</span>
                <span className="text-foreground">{image.likes.toLocaleString()}</span>
              </div>
            )}

            {image.downloads && (
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">DL</span>
                <span className="text-foreground">{image.downloads.toLocaleString()}</span>
              </div>
            )}

            {image.views && (
              <div className="flex justify-between py-1 border-b border-border">
                <span className="text-muted-foreground">VIEWS</span>
                <span className="text-foreground">{image.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {image.tags && image.tags.length > 0 && (
        <div className="border-b border-border">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">TAGS</h3>
          </div>
          <div className="p-3">
            <div className="flex flex-wrap gap-1">
              {image.tags.slice(0, 6).map((tag, index) => (
                <span key={index} className="inline-flex items-center px-1.5 py-0.5 bg-muted text-muted-foreground border border-border">
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EXIF Data */}
      {image.exif && (
        <div className="border-b border-border">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">EXIF</h3>
          </div>
          <div className="p-3">
            <div className="space-y-1">
              {image.exif.make && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">MAKE</span>
                  <span className="text-foreground truncate ml-2">{image.exif.make}</span>
                </div>
              )}

              {image.exif.model && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">MODEL</span>
                  <span className="text-foreground truncate ml-2">{image.exif.model}</span>
                </div>
              )}

              {image.exif.focal_length && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">FOCAL</span>
                  <span className="text-foreground">{image.exif.focal_length}</span>
                </div>
              )}

              {image.exif.aperture && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">F-STOP</span>
                  <span className="text-foreground">f/{image.exif.aperture}</span>
                </div>
              )}

              {image.exif.iso && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">ISO</span>
                  <span className="text-foreground">{image.exif.iso}</span>
                </div>
              )}

              {image.exif.exposure_time && (
                <div className="flex justify-between py-1 border-b border-border">
                  <span className="text-muted-foreground">SHUTTER</span>
                  <span className="text-foreground">{image.exif.exposure_time}s</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Location */}
      {image.location && (
        <div className="border-b border-border">
          <div className="px-3 py-2 bg-muted/50 border-b border-border">
            <h3 className="text-xs font-medium text-foreground uppercase tracking-wide">LOCATION</h3>
          </div>
          <div className="p-3">
            <div className="text-muted-foreground">
              {image.location.name && <div className="truncate">{image.location.name.toUpperCase()}</div>}
              {image.location.city && image.location.country && (
                <div className="truncate">
                  {image.location.city.toUpperCase()}, {image.location.country.toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
