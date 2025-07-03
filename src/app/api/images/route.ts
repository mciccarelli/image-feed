import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    
    if (!accessKey) {
      return NextResponse.json({ error: 'Unsplash API key not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=12&order_by=popular`,
      {
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      }
    );

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