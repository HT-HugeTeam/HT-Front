'use client';

import LeftArrowInactive from '@/public/svg/left-arrow-inactive.svg';
import { useStoreQuery } from '@/hooks/use-store-query';
import { usePathname, useRouter } from 'next/navigation';
import { useMyPageStore } from '@/lib/stores/mypage-store';
import { useEffect, useState } from 'react';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const routeName = pathname.split('/')[1];
  const isMypage = routeName === 'mypage';
  const isMakeVideo = routeName === 'make-video';

  const [headerTitle, setHeaderTitle] = useState('');
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

  const { makeVideoInput, setMakeVideoInput, fileUpload, setFileUpload } =
    useMakeVideoQuery();

  useEffect(() => {
    if (isMypage) {
      if (tabLabel === '가게 정보') {
        setHeaderTitle(tabLabel);
      } else if (tabLabel === '상세 정보') {
        setHeaderTitle(storeName ?? '');
      }
    } else if (isMakeVideo) {
      setHeaderTitle('영상제작');
    }
  }, [isMypage, isMakeVideo, tabLabel, storeName]);

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
    if (makeVideoInput) {
      void setMakeVideoInput(false);
      if (fileUpload) {
        void setFileUpload(false);
      }
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
      {isMypage ? (
        <button className='w-fit h-fit cursor-pointer' onClick={handleBack}>
          <LeftArrowInactive />
        </button>
      ) : makeVideoInput ? (
        <button className='w-fit h-fit cursor-pointer' onClick={handleBack}>
          <LeftArrowInactive />
        </button>
      ) : (
        <div className='size-6' />
      )}
      <span className='text-headlineLarge !font-bold text-gray600'>
        {headerTitle}
      </span>

      {tabLabel === '가게 정보' && !storeAdd && !makeVideoInput && (
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
      {makeVideoInput && (
        <button
          className='text-bodySmall text-gray600 hover:underline cursor-pointer'
          onClick={() => router.push('/mypage/info?tab=detail&')}
        >
          편집
        </button>
      )}
    </header>
  );
}
