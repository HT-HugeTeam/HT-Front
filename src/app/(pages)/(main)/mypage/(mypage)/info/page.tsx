import { Suspense } from 'react';
import { InfoContents } from '../../_components/info/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';

export default async function MyPageInfoPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className='pt-18 pb-10 w-full h-full min-h-0'>
        <InfoContents />
      </main>
    </Suspense>
  );
}
