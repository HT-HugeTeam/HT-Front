'use client';

import LeftArrowInactive from '@/public/svg/left-arrow-inactive.svg';
import { useStoreQuery } from '@/hooks/use-store-query';
import { useRouter } from 'next/navigation';
import { useMyPageStore } from '@/lib/stores/mypage-store';

export function InfoHeader() {
  const router = useRouter();
  const {
    tabLabel,
    storeName,
    edit,
    storeAdd,
    setStoreAdd,
    setEdit,
    goBackTab,
    canGoBackTab,
  } = useStoreQuery();
  const handleSave = useMyPageStore(state => state.handleSave);

  const handleClick = () => {
    if (edit || storeAdd) {
      void handleSave(storeAdd ? 'storeAdd' : 'storeEdit');
      void setEdit(false);
      void setStoreAdd(false);
    } else {
      void setEdit(true);
      void setStoreAdd(false);
    }
  };

  const handleBack = () => {
    if (edit) {
      void setEdit(false);
      return;
    }

    if (canGoBackTab) {
      const success = goBackTab();
      if (success) return;
    }

    router.back();
  };

  return (
    <header className='fixed mobile-area top-0 left-0 right-0 w-full flex justify-between items-end pt-10 pb-2 px-6 text-headlineLarge text-gray600 bg-white'>
      <button className='w-fit h-fit cursor-pointer' onClick={handleBack}>
        <LeftArrowInactive />
      </button>
      <span className='text-headlineLarge !font-bold text-gray600'>
        {tabLabel !== '상세 정보' ? tabLabel : storeName}
      </span>

      {tabLabel === '가게 정보' && !storeAdd && (
        <div className='w-[27.66px] h-5' />
      )}

      {tabLabel === '상세 정보' && (
        <button
          className='text-bodySmall text-gray600 hover:underline cursor-pointer'
          onClick={handleClick}
        >
          {edit ? '완료' : '편집'}
        </button>
      )}
      {storeAdd && (
        <button
          className='text-bodySmall text-gray600 hover:underline cursor-pointer'
          onClick={handleClick}
        >
          완료
        </button>
      )}
    </header>
  );
}
