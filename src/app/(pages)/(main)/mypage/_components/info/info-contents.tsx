'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { InfoStoreCard } from './info-store-card';
import { InfoStoreDetail } from './info-store-detail';
import { StoreAddButton } from '@/components/store-add-button';
import { StoreAddForm } from './store-add-form';
import { LoadingSpinner } from '@/components/loading-spinner';
import { InfoOwner } from './info-owner';
import { useStoreByUser } from '@/hooks/queries/use-store';
import { StoreResponse } from '@/types/api';

export function InfoContents() {
  const { tabLabel, storeAdd } = useStoreQuery();

  const { data: storeDetail, isLoading } = useStoreByUser();

  if (isLoading) {
    return (
      <div className='px-6 w-full h-full flex-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!storeDetail || storeDetail[0]?.name === '') {
    return (
      <>
        {!storeAdd ? (
          <div className='py-8 w-full h-auto'>
            <StoreAddButton />
          </div>
        ) : (
          <div className='pt-8 w-full h-auto flex flex-col gap-8'>
            <StoreAddForm />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {tabLabel === '가게 정보' && (
        <div className='py-8 w-full h-auto flex flex-col gap-4'>
          <InfoStoreCard
            key={storeDetail[0]?.name}
            storeDetail={storeDetail[0] as Required<StoreResponse>}
          />
        </div>
      )}
      {tabLabel === '상세 정보' && <InfoStoreDetail />}
      {tabLabel === '사장님 정보' && <InfoOwner />}
    </>
  );
}
