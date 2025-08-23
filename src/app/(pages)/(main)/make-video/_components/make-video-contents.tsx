'use client';

import { StoreAddButton } from '@/components/store-add-button';
import { InfoStoreCard } from '../../mypage/_components/info/info-store-card';
import { MakeVideoInputUi } from './make-video-input-ui';
import { cn } from '@/lib/utils/cn';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';
import { useStoreByUser, useStoreDetail } from '@/hooks/queries/use-store';
import { LoadingSpinner } from '@/components/loading-spinner';
import { type StoreResponse } from '@/types/api';

interface MakeVideoContentsProps {
  onStoreSelect?: (store: StoreResponse) => void; // 새로운 플로우용 콜백
}

export function MakeVideoContents({ onStoreSelect }: MakeVideoContentsProps = {}) {
  const { makeVideoInput, fileUpload } = useMakeVideoQuery();

  const { data: storeDetail, isLoading, error } = useStoreByUser();

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

  if (storeDetail.length === 0) {
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
        <MakeVideoInputUi
          storeDetail={storeDetail[0] as Required<StoreResponse>}
        />
      ) : (
        <InfoStoreCard
          storeDetail={storeDetail[0] as Required<StoreResponse>}
          onCardClick={onStoreSelect ? () => onStoreSelect(storeDetail[0]!) : undefined}
        />
      )}
    </div>
  );
}
