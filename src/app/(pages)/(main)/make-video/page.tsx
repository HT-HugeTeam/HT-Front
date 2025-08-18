import { Header } from '@/components/header';
import { getStoreDetail } from '@/lib/api/store';
import { MakeVideoContents } from './_components/make-video-contents';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MakeVideoText } from './_components/make-video-text';

export default async function MakeVideoPage() {
  const storeDetailPromise = getStoreDetail('donkatsu');

  return (
    <div className='w-full h-full'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <main className='pt-18 pb-18 w-full h-full flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar'>
          <MakeVideoText />
          <MakeVideoContents storeDetailPromise={storeDetailPromise} />
        </main>
      </Suspense>
      {/* <DelayedUploadExample /> */}
    </div>
  );
}
