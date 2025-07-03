import { ImagesFeed } from '@/app/components';
import { getImages } from '@/lib/unsplash';

export default async function Home() {
  const images = await getImages(24);

  return (
    <main className="pt-16 px-4">
      <ImagesFeed images={images} />
    </main>
  );
}
