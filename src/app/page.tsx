import { ImagesFeed } from '@/app/components';
import { getImages } from '@/lib/unsplash';

export default async function Home() {
  const images = await getImages(10);

  return (
    <main className="p-4 md:p-10">
      <ImagesFeed initialImages={images} />
    </main>
  );
}
