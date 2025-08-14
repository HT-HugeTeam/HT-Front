'use client';

import { StoreDetail } from '@/types/mypage/store-detail.types';
import { useInfoQuery } from '../_hooks/use-info-query';

export function InfoStoreCard({ storeDetail }: { storeDetail: StoreDetail }) {
  const { setStoreName, setTab } = useInfoQuery();
  return (
    <div
      onClick={() => {
        void setTab('store-detail');
        void setStoreName(storeDetail.storeName);
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
