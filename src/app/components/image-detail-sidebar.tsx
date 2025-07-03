'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Share2, Download, ExternalLink, Copy, Tag } from 'lucide-react';
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
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Actions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Actions</h3>

          <div className="flex items-center space-x-2">
            <FavoriteButton image={image} />
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              {copySuccess ? (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Author Info */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Author</h3>
          <div className="flex items-center space-x-3">
            {image.user.profile_image?.medium && (
              <img src={image.user.profile_image.medium} alt={image.user.name} className="w-10 h-10 rounded-full" />
            )}
            <div>
              <p className="font-medium text-foreground">{image.user.name}</p>
              {image.user.username && <p className="text-sm text-muted-foreground">@{image.user.username}</p>}
            </div>
          </div>

          {image.user.links?.html && (
            <Link
              href={image.user.links.html}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View on Unsplash</span>
            </Link>
          )}
        </div>

        {/* Image Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">Details</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensions</span>
              <span className="text-foreground">
                {image.width} × {image.height}
              </span>
            </div>

            {image.likes && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Likes</span>
                <span className="text-foreground">{image.likes.toLocaleString()}</span>
              </div>
            )}

            {image.downloads && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Downloads</span>
                <span className="text-foreground">{image.downloads.toLocaleString()}</span>
              </div>
            )}

            {image.views && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Views</span>
                <span className="text-foreground">{image.views.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* EXIF Data */}
        {image.exif && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Camera Info</h3>
            <div className="space-y-2 text-sm">
              {image.exif.make && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Make</span>
                  <span className="text-foreground">{image.exif.make}</span>
                </div>
              )}

              {image.exif.model && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Model</span>
                  <span className="text-foreground">{image.exif.model}</span>
                </div>
              )}

              {image.exif.focal_length && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Focal Length</span>
                  <span className="text-foreground">{image.exif.focal_length}</span>
                </div>
              )}

              {image.exif.aperture && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aperture</span>
                  <span className="text-foreground">f/{image.exif.aperture}</span>
                </div>
              )}

              {image.exif.iso && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISO</span>
                  <span className="text-foreground">{image.exif.iso}</span>
                </div>
              )}

              {image.exif.exposure_time && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exposure</span>
                  <span className="text-foreground">{image.exif.exposure_time}s</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Location */}
        {image.location && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">Location</h3>
            <div className="text-sm text-muted-foreground">
              {image.location.name && <div>{image.location.name}</div>}
              {image.location.city && image.location.country && (
                <div>
                  {image.location.city}, {image.location.country}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
