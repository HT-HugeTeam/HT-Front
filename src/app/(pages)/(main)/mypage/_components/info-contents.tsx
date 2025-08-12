'use client';

import { StoreDetail } from '@/types/store/store-detail.types';
import { useInfoQuery } from '../_hooks/use-info-query';
import { InfoStoreCard } from './info-store-card';
import { use } from 'react';
import { InfoStoreDetail } from './info-store-detail';

export function InfoContents({
  storeDetailPromise,
}: {
  storeDetailPromise: Promise<StoreDetail[]>;
}) {
  const { tabLabel, storeName } = useInfoQuery();

  // 임시 목데이터 => tanstack query caching 해야 함.
  const storeDetail = use(storeDetailPromise);

  return (
    <main className='pt-18 w-full h-auto min-h-0'>
      {tabLabel === '가게 정보' && (
        <div className='px-6 py-8 w-full h-auto flex flex-col gap-4'>
          {storeDetail.map(item => (
            <InfoStoreCard key={item.storeName} storeDetail={item} />
          ))}
        </div>
      )}
      {tabLabel === '상세 정보' && (
        <InfoStoreDetail
          storeDetail={storeDetail.find(item => item.storeName === storeName)}
        />
      )}
    </main>
  );
}
