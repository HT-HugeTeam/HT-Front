import { Header } from '@/components/header';
import { Suspense } from 'react';
import { ShortsVideoTabs } from './_components/shorts-video-tabs';
import { ShortsVideoCard } from './_components/shorts-video-card';

export default function ShortsPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className='pt-header-height pl-3 pb-10 w-full flex-1 flex flex-col min-h-0 bg-gray100'>
        <div className='sticky top-0 z-10 bg-gray100 '>
          <Suspense fallback={<></>}>
            <ShortsVideoTabs />
          </Suspense>
        </div>
        <section className='flex-1 w-full grid grid-cols-2 gap-x-2 gap-y-4 overflow-y-auto custom-scrollbar pr-3'>
          {Array.from({ length: 10 }).map((_, index) => (
            <ShortsVideoCard key={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
