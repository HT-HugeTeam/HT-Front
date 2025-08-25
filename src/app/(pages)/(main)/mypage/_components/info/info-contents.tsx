'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { InfoStoreCard } from './info-store-card';
import { InfoStoreDetail } from './info-store-detail';
import { StoreAddButton } from '@/components/store-add-button';
import { StoreAddForm } from './store-add-form';
import { useStoreByUser } from '@/hooks/queries/use-store';
import { InfoOwner } from './info-owner';
import { type StoreResponse } from '@/types/api';
import { LoadingSpinnerBasic } from '@/components/loading-spinner';

export function InfoContents({
  initialStoreData,
}: {
  initialStoreData: StoreResponse[];
}) {
  const { tabLabel, storeAdd } = useStoreQuery();
  const { data: storeData } = useStoreByUser(initialStoreData);

  if (!storeData?.[0]) {
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
            storeDetail={storeData[0] as Required<StoreResponse>}
          />
        </div>
      )}
      {tabLabel === '상세 정보' && <InfoStoreDetail />}
      {tabLabel === '사장님 정보' && <InfoOwner />}
    </>
  );
}
