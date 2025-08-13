'use client';

import LeftArrowInactive from '@/public/svg/left-arrow-inactive.svg';
import { useInfoQuery } from '../_hooks/use-info-query';
import { useRouter } from 'next/navigation';
import { useMyPageStore } from '@/lib/stores/mypage-store';

export function InfoHeader() {
  const router = useRouter();
  const { tabLabel, storeName, edit, setEdit, goBackTab, canGoBackTab } =
    useInfoQuery();
  const handleSave = useMyPageStore(state => state.handleSave);

  const handleBack = () => {
    if (edit) {
      void setEdit(false);
      return;
    }

    if (canGoBackTab) {
      const success = goBackTab();
      if (success) return;
    }

    // 남아있는 query history 없으면 뒤로가기
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

      {tabLabel === '가게 정보' && (
        <button className='text-bodySmall text-gray600 hover:underline cursor-pointer'>
          추가
        </button>
      )}

      {tabLabel === '상세 정보' && (
        <button
          className='text-bodySmall text-gray600 hover:underline cursor-pointer'
          onClick={() => {
            if (edit) {
              handleSave(setEdit);
            } else {
              void setEdit(true);
            }
          }}
        >
          {edit ? '완료' : '편집'}
        </button>
      )}
    </header>
  );
}
