export const dynamic = 'force-static';

import { Header } from '@/components/header';
import { Suspense } from 'react';
import { AroundSnsTab } from './_components/around-sns-tab';
import { AroundAccountSection } from './_components/around-account-section';

export default function AroundPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className='pt-18 px-6 pb-10 w-full h-auto flex-1 flex flex-col min-h-0 bg-gray100 overflow-y-auto custom-scrollbar'>
        <div className='sticky top-0 z-10 bg-gray100 '>
          <Suspense fallback={<></>}>
            <AroundSnsTab />
          </Suspense>
        </div>
        <Suspense fallback={<></>}>
          <AroundAccountSection />
        </Suspense>
      </main>
    </div>
  );
}
