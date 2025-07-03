import { PageHeader, ImageGridWithLoadMore } from '@/app/components';
import { fetchUnsplashImages } from '@/app/lib/unsplash';

export default async function Home() {
  const images = await fetchUnsplashImages(1, 24);

  return (
    <>
      <PageHeader title="Unsplash Popular Feed" showImageCount={true} />
      <main className="p-2 md:p-8">
        <ImageGridWithLoadMore initialImages={images} />
      </main>
    </>
  );
}
