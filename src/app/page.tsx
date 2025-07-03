import { ImagesFeed } from '@/app/components';

export default function Home() {
  return (
    <main className="pt-16 px-4">
      <ImagesFeed count={24} />
    </main>
  );
}
