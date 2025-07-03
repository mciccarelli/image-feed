import { UnsplashImage } from './types';

async function fetchUnsplashImages(orientation?: 'landscape' | 'portrait' | 'squarish', perPage: number = 10): Promise<UnsplashImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('Unsplash API key not configured');
  }

  const url = new URL('https://api.unsplash.com/photos');
  url.searchParams.set('per_page', perPage.toString());
  url.searchParams.set('page', '1');
  url.searchParams.set('order_by', 'popular');
  if (orientation && ['landscape', 'portrait', 'squarish'].includes(orientation)) {
    url.searchParams.set('orientation', orientation);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch images from Unsplash');
  }

  return response.json();
}

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export async function getImages(count: number): Promise<UnsplashImage[]> {
  // Simplified: just fetch popular images without orientation filtering
  // This creates a consistent pagination sequence that can be continued in the client
  const images = await fetchUnsplashImages(undefined, count);
  return images;
}
