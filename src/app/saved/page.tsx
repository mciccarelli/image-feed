import { SavedImages, PageHeader } from '@/app/components';

export default function SavedPage() {
  return (
    <>
      <PageHeader title="Saved Images" />
      <main className="p-4">
        <SavedImages />
      </main>
    </>
  );
}
