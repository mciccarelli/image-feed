import { PageHeader, ImageGridWithLoadMore } from '@/app/components';
import { fetchUnsplashImages } from '@/app/lib/unsplash';

export default async function Home() {
  const images = await fetchUnsplashImages(1, 24);

  return (
    <>
      <PageHeader title="Unsplash Popular Feed" showImageCount={true} />
      <main className="p-4">
        <ImageGridWithLoadMore initialImages={images} />
      </main>
    </>
  );
}
