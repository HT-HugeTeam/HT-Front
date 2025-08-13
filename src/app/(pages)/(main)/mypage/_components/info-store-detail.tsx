'use client';

import { StoreDetail } from '@/types/mypage/store-detail.types';
import { useInfoQuery } from '../_hooks/use-info-query';
import { StoreEditForm } from './store-edit-form';
import { StoreDetailUI } from './store-detail-ui';

export function InfoStoreDetail({
  storeDetail,
}: {
  storeDetail: StoreDetail | undefined;
}) {
  const { edit } = useInfoQuery();
  if (!storeDetail) return null;

  return (
    <div className='pl-6 pt-8 pr-6 w-full h-auto flex flex-col gap-8'>
      {edit ? (
        <StoreEditForm storeDetail={storeDetail} />
      ) : (
        <StoreDetailUI storeDetail={storeDetail} />
      )}
    </div>
  );
}
