'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { StoreEditForm } from './store-edit-form';
import { StoreDetailUI } from './store-detail-ui';
import { useStoreDetail } from '@/hooks/queries/use-store';

export function InfoStoreDetail() {
  const { edit } = useStoreQuery();

  return (
    <div className='pt-8 w-full h-auto flex flex-col gap-8'>
      {edit ? <StoreEditForm /> : <StoreDetailUI />}
    </div>
  );
}
