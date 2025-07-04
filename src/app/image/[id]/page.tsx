import { notFound } from 'next/navigation';
import { ImageDetailView } from '@/app/components/image-detail-view';
import { fetchImageById } from '@/app/lib/unsplash';

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
