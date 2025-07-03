import { UnsplashImage } from './types';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

async function fetchUnsplashImages(orientation?: 'landscape' | 'portrait' | 'squarish', perPage: number = 10): Promise<UnsplashImage[]> {
  let url = `${BASE_URL}/api/images?per_page=${perPage}&order_by=popular`;
  if (orientation) {
    url += `&orientation=${orientation}`;
  }

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch images');
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
