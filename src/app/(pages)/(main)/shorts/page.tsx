import { Header } from '@/components/header';
import { Suspense } from 'react';
import { ShortsVideoTabs } from './_components/shorts-video-tabs';

export default function ShortsPage() {
  return (
    <div className='w-full h-auto'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className='pt-22 pl-3 pb-10 w-full h-full min-h-0 bg-gray100'>
        <ShortsVideoTabs />
      </main>
    </div>
  );
}
