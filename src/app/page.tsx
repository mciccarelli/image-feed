import { ImagesFeed, ThemeToggle } from '@/app/components';

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <main className="container mx-auto pt-16">
        <ImagesFeed count={24} />
      </main>
    </div>
  );
}
