'use client';

import LeftArrowInactive from '@/public/svg/left-arrow-inactive.svg';
import { useStoreQuery } from '@/hooks/use-store-query';
import { usePathname, useRouter } from 'next/navigation';
import { useMyPageStore } from '@/lib/stores/mypage-store';
import { useMemo } from 'react';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';

type HeaderType =
  | 'STORE_INFO'
  | 'STORE_ADD'
  | 'STORE_DETAIL'
  | 'OWNER_INFO'
  | 'VIDEO_CREATION'
  | 'VIDEO_MANAGEMENT'
  | 'SHORTS';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArray = pathname.split('/');
  const isMypage = pathnameArray[1] === 'mypage';
  const isMakeVideo = pathnameArray[1] === 'make-video';
  const isManageVideo = pathnameArray[2] === 'manage-video';
  const isShorts = pathnameArray[1] === 'shorts';

  const {
    tabLabel,
    edit,
    storeAdd,
    setStoreAdd,
    setEdit,
    goBackTab,
    canGoBackTab,
    storeName,
  } = useStoreQuery();

  const { makeVideoInput, setMakeVideoInput, fileUpload, setFileUpload } =
    useMakeVideoQuery();

  const handleSave = useMyPageStore(state => state.handleSave);

  const getHeaderType = (): HeaderType => {
    if (isShorts) return 'SHORTS';
    if (isMakeVideo) return 'VIDEO_CREATION';
    if (isManageVideo) return 'VIDEO_MANAGEMENT';
    if (isMypage && storeAdd) return 'STORE_ADD';
    if (isMypage && tabLabel === '가게 정보') return 'STORE_INFO';
    if (isMypage && tabLabel === '상세 정보') return 'STORE_DETAIL';
    if (isMypage && tabLabel === '사장님 정보') return 'OWNER_INFO';
    return 'STORE_INFO';
  };

  const headerConfig = useMemo(() => {
    const headerType = getHeaderType();

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

    switch (headerType) {
      case 'STORE_INFO':
        return {
          title: '가게 정보',
          showBackButton: true,
          showEditButton: false,
        };
      case 'STORE_ADD':
        return {
          title: '가게 정보',
          showBackButton: true,
          showEditButton: true,
          editButtonText: '완료',
          onEditClick: handleClick,
        };
      case 'STORE_DETAIL':
        return {
          title: storeName,
          showBackButton: true,
          showEditButton: true,
          editButtonText: edit ? '완료' : '편집',
          onEditClick: handleClick,
        };
      case 'OWNER_INFO':
        return {
          title: '사장님 정보',
          showBackButton: true,
          showEditButton: false,
        };
      case 'VIDEO_CREATION':
        return {
          title: '영상 제작',
          showBackButton: makeVideoInput,
          showEditButton: makeVideoInput,
          editButtonText: '편집',
          // 가게 상세정보로 이동해야 함.
          onEditClick: () => {
            router.push(
              `/mypage/info?tab=store-detail&edit=true&storeName=${storeName}`,
            );
          },
        };
      case 'VIDEO_MANAGEMENT':
        return {
          title: '영상관리',
          showBackButton: true,
          showEditButton: false,
        };
      case 'SHORTS':
        return {
          title: '둘러보기',
          showBackButton: false,
          showEditButton: false,
        };
      default:
        return {
          title: '',
          showBackButton: false,
          showEditButton: false,
        };
    }
  }, [getHeaderType, handleSave, storeAdd, setEdit, setStoreAdd, tabLabel]);

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
    <header className='fixed z-50 mobile-area top-0 left-0 right-0 w-full flex justify-between items-end pt-10 pb-2 px-6 text-headlineLarge text-gray600 bg-white000'>
      {/* 뒤로가기 버튼 */}
      {headerConfig.showBackButton ? (
        <button className='w-fit h-fit cursor-pointer' onClick={handleBack}>
          <LeftArrowInactive />
        </button>
      ) : (
        <div className='size-6' />
      )}

      {/* 헤더 제목 */}
      <span className='text-headlineLarge !font-bold text-gray600'>
        {headerConfig.title}
      </span>

      {/* 편집 버튼 */}
      {headerConfig.showEditButton ? (
        <button
          className='text-bodySmall text-gray600 hover:underline cursor-pointer'
          onClick={headerConfig.onEditClick}
        >
          {headerConfig.editButtonText}
        </button>
      ) : (
        <div className='w-[27.66px] h-5' />
      )}
    </header>
  );
}
