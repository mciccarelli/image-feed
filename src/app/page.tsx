import { PageHeader, MasonryGridWithLoadMore } from '@/app/components';
import { getImages } from '@/app/lib/unsplash';

export default async function Home() {
  const images = await getImages(24);

  return (
    <>
      <PageHeader title="Unsplash Popular Feed" showImageCount={true} />
      <main className="p-2 md:p-8">
        <MasonryGridWithLoadMore initialImages={images} />
      </main>
    </>
  );
}
