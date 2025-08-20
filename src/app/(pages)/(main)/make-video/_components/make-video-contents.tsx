'use client';

import { StoreAddButton } from '@/components/store-add-button';
import { InfoStoreCard } from '../../mypage/_components/info/info-store-card';
import { MakeVideoInputUi } from './make-video-input-ui';
import { cn } from '@/lib/utils/cn';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';
import { useStoreDetail } from '@/hooks/queries/use-store-detail';
import { LoadingSpinner } from '@/components/loading-spinner';

export function MakeVideoContents() {
  const { makeVideoInput, fileUpload } = useMakeVideoQuery();

  // TanStack Query로 데이터 캐싱 및 관리
  const { data: storeDetail, isLoading, error } = useStoreDetail('donkatsu');

  if (isLoading) {
    return (
      <div className='px-6 w-full h-full flex-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !storeDetail) {
    return (
      <div className='px-6 w-full h-auto'>
        <StoreAddButton />
      </div>
    );
  }

  if (storeDetail.storeName === '') {
    return (
      <div className='px-6 w-full h-auto'>
        <StoreAddButton />
      </div>
    );
  }

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
        <InfoStoreCard />
      )}
    </div>
  );
}
