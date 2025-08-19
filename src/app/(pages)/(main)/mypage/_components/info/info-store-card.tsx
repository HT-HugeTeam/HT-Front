'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import { usePathname } from 'next/navigation';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';
import { useStoreDetail } from '@/hooks/queries/use-store-detail';

export function InfoStoreCard() {
  const pathname = usePathname();
  const isMakeVideo = pathname.includes('make-video');
  const { setStoreName, setTab } = useStoreQuery();
  const { setMakeVideoInput } = useMakeVideoQuery();

  // TanStack Query로 StoreDetail 가져오기
  const { data: storeDetail } = useStoreDetail('donkatsu');

  if (!storeDetail) return null;

  return (
    <div
      onClick={() => {
        if (isMakeVideo) {
          void setMakeVideoInput(true);
          void setStoreName(storeDetail.storeName);
        } else {
          void setTab('store-detail');
          void setStoreName(storeDetail.storeName);
        }
      }}
      className='p-6 w-full h-auto flex flex-col gap-6 rounded-[15px] border border-gray100 bg-white shadow-[0_4px_10px_0_rgba(154,159,160,0.15)] cursor-pointer'
    >
      <h2 className='text-displayMedium !font-bold text-gray600'>
        {storeDetail.storeName}
      </h2>
      <div className='flex flex-col gap-4'>
        {Object.entries({
          주소: storeDetail.storeAddress,
          소개: storeDetail.storeDescription,
          메뉴: `${storeDetail.storeMenu.slice(0, 3).join(', ')}...`,
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
