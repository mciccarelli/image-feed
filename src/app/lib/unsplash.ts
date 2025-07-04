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

export async function fetchImageById(id: string): Promise<UnsplashImage | null> {
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
