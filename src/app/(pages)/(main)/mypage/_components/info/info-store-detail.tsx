'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { StoreEditForm } from './store-edit-form';
import { StoreDetailUI } from './store-detail-ui';
import { useStoreDetail } from '@/hooks/queries/use-store-detail';

export function InfoStoreDetail() {
  const { edit } = useStoreQuery();
  const { data: storeDetail } = useStoreDetail('donkatsu');

  if (!storeDetail) return null;

  return (
    <div className='pt-8 w-full h-auto flex flex-col gap-8'>
      {edit ? <StoreEditForm /> : <StoreDetailUI />}
    </div>
  );
}
