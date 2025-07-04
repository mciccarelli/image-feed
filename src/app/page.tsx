import { PageHeader, ImageGridWithLoadMore } from '@/app/components';
import { fetchUnsplashImages } from '@/app/lib/unsplash';

export default async function Home() {
  const images = await fetchUnsplashImages(1, 24);

  return (
    <>
      <PageHeader title="Trending on Unsplash" showImageCount={true} />
      <main className="p-4 pt-4 md:pt-4">
        <ImageGridWithLoadMore initialImages={images} />
      </main>
    </>
  );
}
