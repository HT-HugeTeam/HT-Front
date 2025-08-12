import { InfoStoreSkeletonCard } from '@/components/skeleton/info-store-skeleton-card';
import { getStoreDetail } from '@/lib/api/store';
import { Suspense } from 'react';
import { InfoContents } from '../../_components/info-contents';
import { InfoStoreCard } from '../../_components/info-store-card';

// 가게 정보 페이지
export default async function StorePage() {
  const storeDetailPromise = await getStoreDetail('donkatsu'); // 실제로는 동적으로 받아올 storeId
  const storeDetailPromise2 = await getStoreDetail('gojibi'); // 실제로는 동적으로 받아올 storeId
  const storeDetail = await Promise.all([
    storeDetailPromise,
    storeDetailPromise2,
  ]);
  return (
    // <Suspense fallback={<InfoStoreSkeletonCard />}>
    //   <InfoContents
    //     storeDetailPromise={Promise.all([
    //       storeDetailPromise,
    //       storeDetailPromise2,
    //     ])}
    //   />
    //     </Suspense>
    <main className='pt-18 w-full h-auto min-h-0'>
      <div className='px-6 py-8 w-full h-auto flex flex-col gap-4'>
        {!storeDetail
          ? Array.from({ length: 3 }).map((_, index) => (
              <InfoStoreSkeletonCard key={index} />
            ))
          : storeDetail.map(item => (
              <InfoStoreCard key={item.storeName} storeDetail={item} />
            ))}
      </div>
    </main>
  );
}
