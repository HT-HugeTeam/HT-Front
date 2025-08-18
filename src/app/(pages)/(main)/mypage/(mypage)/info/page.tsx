import { getStoreDetail } from '@/lib/api/store';
import { Suspense } from 'react';
import { InfoContents } from '../../_components/info/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Header } from '@/components/header';

export default async function MyPageInfoPage() {
  // Promise 생성 (즉시 실행되지만 await하지 않음)
  const storeDetailPromise = getStoreDetail('empty'); // 실제로는 동적으로 받아올 storeId

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <main className='pt-18 pb-10 w-full h-full min-h-0'>
        <InfoContents storeDetailPromise={storeDetailPromise} />
      </main>
    </Suspense>
  );
}
