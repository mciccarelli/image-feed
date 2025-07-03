import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        { error: 'Unsplash API key not configured' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '20', 10);

    // Fetch a mix of landscape and portrait images
    const [landscapeResponse, portraitResponse] = await Promise.all([
      fetch(
        `https://api.unsplash.com/photos?per_page=${Math.ceil(
          count / 2
        )}&order_by=popular&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      ),
      fetch(
        `https://api.unsplash.com/photos?per_page=${Math.floor(
          count / 2
        )}&order_by=popular&orientation=portrait`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      ),
    ]);

    if (!landscapeResponse.ok || !portraitResponse.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    const [landscapeImages, portraitImages] = await Promise.all([
      landscapeResponse.json(),
      portraitResponse.json(),
    ]);

    // Shuffle and combine the images
    const allImages = [...landscapeImages, ...portraitImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    return NextResponse.json(allImages);
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
