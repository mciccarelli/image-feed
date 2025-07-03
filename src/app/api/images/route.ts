import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const perPage = parseInt(searchParams.get('per_page') || '20', 10);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const orderBy = searchParams.get('order_by') || 'popular';
    const orientation = searchParams.get('orientation') || undefined;

    const url = new URL('https://api.unsplash.com/photos');
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('page', page.toString());
    url.searchParams.set('order_by', orderBy);
    if (orientation) {
      url.searchParams.set('orientation', orientation);
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    const images = await response.json();
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
