'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { InfoStoreCard } from './info-store-card';
import { InfoStoreDetail } from './info-store-detail';
import { StoreAddButton } from '@/components/store-add-button';
import { StoreAddForm } from './store-add-form';
import { useStoreDetail } from '@/hooks/queries/use-store-detail';
import { LoadingSpinner } from '@/components/loading-spinner';
import { InfoOwner } from './info-owner';

export function InfoContents() {
  const { tabLabel, storeAdd } = useStoreQuery();

  const { data: storeDetail, isLoading, error } = useStoreDetail('donkatsu');

  if (isLoading) {
    return (
      <div className='px-6 w-full h-full flex-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !storeDetail || storeDetail.storeName === '') {
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
  }

  return (
    <>
      {tabLabel === '가게 정보' && (
        <div className='px-6 py-8 w-full h-auto flex flex-col gap-4'>
          <InfoStoreCard key={storeDetail.storeName} />
        </div>
      )}
      {tabLabel === '상세 정보' && <InfoStoreDetail />}
      {tabLabel === '사장님 정보' && <InfoOwner />}
    </>
  );
}
