import { UnsplashImage } from './types';

export async function fetchUnsplashImages(page: number = 1, perPage: number = 12): Promise<UnsplashImage[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    throw new Error('Unsplash API key not configured');
  }

  const url = new URL('https://api.unsplash.com/photos');
  url.searchParams.set('page', page.toString());
  url.searchParams.set('per_page', perPage?.toString());
  url.searchParams.set('order_by', 'popular');

  console.log('Unsplash API URL:', url.toString());

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch images from Unsplash');
  }

  return await response.json();
}
