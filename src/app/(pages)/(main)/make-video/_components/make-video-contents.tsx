'use client';

import { StoreDetail } from '@/types/mypage/store-detail.types';
import { use } from 'react';
import { StoreAddButton } from '@/components/store-add-button';
import { InfoStoreCard } from '../../mypage/_components/info-store-card';
import { MakeVideoInputUi } from './make-video-input-ui';
import { cn } from '@/lib/utils/cn';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';

export function MakeVideoContents({
  storeDetailPromise,
}: {
  storeDetailPromise: Promise<StoreDetail>;
}) {
  const { makeVideoInput, fileUpload } = useMakeVideoQuery();

  // 임시 목데이터 => tanstack query caching 해야 함.
  const storeDetail = use(storeDetailPromise);

  if (storeDetail.storeName === '')
    return (
      <div className='px-6 w-full h-auto'>
        <StoreAddButton />
      </div>
    );

  return (
    <div
      className={cn(
        'px-6 w-full h-auto flex flex-col gap-8',
        makeVideoInput && 'py-8',
        fileUpload && 'h-full',
      )}
    >
      {makeVideoInput ? (
        <MakeVideoInputUi storeDetail={storeDetail} />
      ) : (
        <InfoStoreCard storeDetail={storeDetail} />
      )}
    </div>
  );
}
