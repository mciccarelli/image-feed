import { notFound } from 'next/navigation';
import { UnsplashImage } from '@/app/lib/types';
import { ImageDetailView } from '@/app/components/image-detail-view';

async function fetchImageById(id: string): Promise<UnsplashImage | null> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      console.error('Unsplash API key not configured');
      return null;
    }

    const url = `https://api.unsplash.com/photos/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const imageData = await response.json();

    // Transform the response to match our UnsplashImage interface
    const transformedImage: UnsplashImage = {
      id: imageData.id,
      urls: {
        small: imageData.urls.small,
        regular: imageData.urls.regular,
        full: imageData.urls.full,
        raw: imageData.urls.raw,
      },
      alt_description: imageData.alt_description || '',
      description: imageData.description || '',
      blur_hash: imageData.blur_hash || null,
      user: {
        name: imageData.user.name,
        username: imageData.user.username,
        links: {
          html: imageData.user.links?.html,
        },
        profile_image: imageData.user.profile_image,
      },
      width: imageData.width,
      height: imageData.height,
      likes: imageData.likes,
      downloads: imageData.downloads,
      views: imageData.views,
      created_at: imageData.created_at,
      updated_at: imageData.updated_at,
      tags: imageData.tags?.map((tag: any) => tag.title) || [],
      location: imageData.location,
      exif: imageData.exif,
    };

    return transformedImage;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
}

interface ImagePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { id } = await params;
  const image = await fetchImageById(id);

  if (!image) {
    notFound();
  }

  return <ImageDetailView image={image} />;
}

export async function generateMetadata({ params }: ImagePageProps) {
  const { id } = await params;
  const image = await fetchImageById(id);

  if (!image) {
    return {
      title: 'Image Not Found',
    };
  }

  return {
    title: `${image.alt_description || 'Image'} by ${image.user.name} - ImageFeed`,
    description: image.description || image.alt_description || `Photo by ${image.user.name}`,
    openGraph: {
      title: `${image.alt_description || 'Image'} by ${image.user.name}`,
      description: image.description || image.alt_description || `Photo by ${image.user.name}`,
      images: [image.urls.regular],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${image.alt_description || 'Image'} by ${image.user.name}`,
      description: image.description || image.alt_description || `Photo by ${image.user.name}`,
      images: [image.urls.regular],
    },
  };
}

// Force dynamic rendering for all image pages
export const dynamic = 'force-dynamic';

// Return empty array to prevent static generation of any paths
export async function generateStaticParams() {
  return [];
}
