import { getStoreDetail } from '@/lib/api/store';
import { InfoHeader } from '../_components/info-header';
import { Suspense } from 'react';
import { InfoContents } from '../_components/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';

export default async function MyPageInfoPage() {
  // Promise 생성 (즉시 실행되지만 await하지 않음)
  const storeDetailPromise = getStoreDetail('donkatsu'); // 실제로는 동적으로 받아올 storeId
  const storeDetailPromise2 = getStoreDetail('gojibi'); // 실제로는 동적으로 받아올 storeId

  return (
    <div className='w-full h-full'>
      <Suspense fallback={<></>}>
        <InfoHeader />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <InfoContents
          storeDetailPromise={Promise.all([
            storeDetailPromise,
            storeDetailPromise2,
          ])}
        />
      </Suspense>
    </div>
  );
}
