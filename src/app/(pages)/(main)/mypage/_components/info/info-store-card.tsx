'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { usePathname } from 'next/navigation';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';
import { type StoreResponse } from '@/types/api';

export function InfoStoreCard({
  storeDetail,
  onCardClick,
}: {
  storeDetail: Required<StoreResponse>;
  onCardClick?: (() => void) | undefined;
}) {
  const pathname = usePathname();
  const isMakeVideo = pathname.includes('make-video');
  const { setStoreName, setTab } = useStoreQuery();
  const { setMakeVideoInput } = useMakeVideoQuery();

  return (
    <div
      onClick={() => {
        if (onCardClick) {
          void onCardClick();
        } else if (isMakeVideo) {
          // 기존 make-video 페이지 로직
          void setMakeVideoInput(true);
          void setStoreName(storeDetail.name);
        } else {
          // 기존 mypage 로직
          void setTab('store-detail');
          void setStoreName(storeDetail.name);
        }
      }}
      className='p-6 w-full h-auto flex flex-col gap-6 rounded-[15px] border border-gray100 bg-white shadow-[0_4px_10px_0_rgba(154,159,160,0.15)] cursor-pointer'
    >
      <h2 className='text-displayMedium !font-bold text-gray600'>
        {storeDetail.name}
      </h2>
      <div className='flex flex-col gap-4'>
        {Object.entries({
          주소: storeDetail.address,
          소개: storeDetail.description,
          // 메뉴: `${storeDetail.menu.slice(0, 3).join(', ')}...`,
        }).map(([label, content]) => (
          <div key={label} className='flex flex-col gap-1'>
            <h4 className='text-labelLarge text-gray500'>{label}</h4>
            <p className='text-labelLarge text-gray600 !font-normal'>
              {content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
