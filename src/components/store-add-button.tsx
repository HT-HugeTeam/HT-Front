'use client';

import PlusIcon from '@/public/svg/plus.svg';
import { useStoreQuery } from '@/hooks/use-store-query';
import { usePathname, useRouter } from 'next/navigation';

export function StoreAddButton() {
  const { setStoreAdd } = useStoreQuery();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (pathname === '/make-video') {
          router.push('/mypage/info?storeAdd=true');
        } else {
          setStoreAdd(true);
        }
      }}
      className='px-5 py-2 w-full h-14 flex-center rounded-[15px] bg-gray100 gap-1 hover:bg-gray200 transition-colors duration-300 cursor-pointer'
    >
      <PlusIcon />
      <span className='text-bodyMedium text-gray600'>추가</span>
    </button>
  );
}
