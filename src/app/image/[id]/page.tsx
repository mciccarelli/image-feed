import { notFound } from 'next/navigation';
import { UnsplashImage } from '@/app/lib/types';
import { ImageDetailView } from '@/app/components/image-detail-view';

async function fetchImageById(id: string): Promise<UnsplashImage | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/images/${id}`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    return await response.json();
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
