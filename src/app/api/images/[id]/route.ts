import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json({ error: 'Unsplash access key not configured' }, { status: 500 });
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }

    const url = `https://api.unsplash.com/photos/${id}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const imageData = await response.json();

    // Transform the response to match our UnsplashImage interface
    const transformedImage = {
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

    return NextResponse.json(transformedImage);
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}
