'use client';

import { useStoreQuery } from '@/hooks/use-store-query';
import PlusIcon from '@/public/svg/plus.svg';

export function StoreAddButton() {
  const { setStoreAdd } = useStoreQuery();
  return (
    <button
      onClick={() => setStoreAdd(true)}
      className='px-5 py-2 w-full h-14 flex-center rounded-[15px] bg-gray100 gap-1 hover:bg-gray200 transition-colors duration-300 cursor-pointer'
    >
      <PlusIcon />
      <span className='text-bodyMedium text-gray600'>추가</span>
    </button>
  );
}
