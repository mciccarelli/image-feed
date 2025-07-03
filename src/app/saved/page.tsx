import { SavedImages, PageHeader } from '@/app/components';

export default function SavedPage() {
  return (
    <>
      <PageHeader title="Saved Images" />
      <main className="p-2 md:p-8">
        <SavedImages />
      </main>
    </>
  );
}
