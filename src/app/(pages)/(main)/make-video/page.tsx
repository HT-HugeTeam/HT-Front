import { Header } from '@/components/header';
import { MakeVideoContents } from './_components/make-video-contents';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MakeVideoText } from './_components/make-video-text';

export default async function MakeVideoPage() {
  return (
    <div className='w-full h-full'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <main className='pt-header-height pb-18 w-full h-full flex flex-col gap-6 min-h-0 overflow-y-auto scrollbar-hide'>
          <MakeVideoText />
          <MakeVideoContents />
        </main>
      </Suspense>
    </div>
  );
}
