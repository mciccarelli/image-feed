import { UnsplashImage } from './types';

const BASE_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

async function fetchUnsplashImages(orientation: 'landscape' | 'portrait', perPage: number): Promise<UnsplashImage[]> {
  const response = await fetch(`${BASE_URL}/api/images?per_page=${perPage}&order_by=popular&orientation=${orientation}`, {
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
  const landscapeCount = Math.ceil(count / 2);
  const portraitCount = Math.floor(count / 2);

  const [landscapeImages, portraitImages] = await Promise.all([
    fetchUnsplashImages('landscape', landscapeCount),
    fetchUnsplashImages('portrait', portraitCount),
  ]);

  const allImages = [...landscapeImages, ...portraitImages];
  const shuffledImages = shuffleArray(allImages);

  return shuffledImages.slice(0, count);
}
