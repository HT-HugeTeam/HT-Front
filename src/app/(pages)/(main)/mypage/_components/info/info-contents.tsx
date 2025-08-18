'use client';

import { StoreDetail } from '@/types/mypage/store-detail.types';
import { useStoreQuery } from '@/hooks/use-store-query';
import { InfoStoreCard } from './info-store-card';
import { use } from 'react';
import { InfoStoreDetail } from './info-store-detail';
import { StoreAddButton } from '@/components/store-add-button';
import { StoreAddForm } from './store-add-form';

export function InfoContents({
  storeDetailPromise,
}: {
  storeDetailPromise: Promise<StoreDetail>;
}) {
  const { tabLabel, storeAdd } = useStoreQuery();

  // 임시 목데이터 => tanstack query caching 해야 함.
  const storeDetail = use(storeDetailPromise);

  if (storeDetail.storeName === '')
    return (
      <>
        {!storeAdd ? (
          <div className='px-6 py-8 w-full h-auto'>
            <StoreAddButton />
          </div>
        ) : (
          <div className='pl-6 pt-8 pr-6 w-full h-auto flex flex-col gap-8'>
            <StoreAddForm />
          </div>
        )}
      </>
    );

  return (
    <>
      {tabLabel === '가게 정보' && (
        <div className='px-6 py-8 w-full h-auto flex flex-col gap-4'>
          <InfoStoreCard
            key={storeDetail.storeName}
            storeDetail={storeDetail}
          />
        </div>
      )}
      {tabLabel === '상세 정보' && (
        <InfoStoreDetail storeDetail={storeDetail} />
      )}
    </>
  );
}
