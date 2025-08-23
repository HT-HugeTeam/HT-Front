'use client';

import { useVideoCreationStore } from '@/stores/video-creation-store';
import { useRouter } from 'next/navigation';

export function VideoGenerate() {
  const router = useRouter();
  const { currentStore, resetStore, getCustomMenus } = useVideoCreationStore();
  const customMenus = getCustomMenus();

  if (!currentStore) {
    return <div>가게 정보를 불러올 수 없습니다.</div>;
  }

  const handleViewVideo = () => {
    // 영상 관리 페이지로 이동
    router.push('/mypage/manage-video');
    resetStore(); // 상태 초기화
  };

  const handleCreateNew = () => {
    // 새로운 영상 제작을 위해 상태 초기화 후 처음부터 시작
    resetStore();
  };

  return (
    <div className='w-full h-full px-6 py-6 overflow-y-auto pb-24'>
      <div className='space-y-6'>
        {/* 성공 메시지 */}
        <div className='text-center space-y-4'>
          <div className='w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center'>
            <svg
              className='w-10 h-10 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>
            영상 제작이 완료되었습니다!
          </h1>
          <p className='text-gray-600'>AI가 생성한 영상을 확인해보세요.</p>
        </div>

        {/* 제작 정보 요약 */}
        <div className='bg-gray-50 rounded-lg p-4 space-y-3'>
          <h3 className='font-semibold text-gray-900 mb-3'>제작 정보</h3>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>가게명:</span>
              <span className='font-medium'>{currentStore.name}</span>
            </div>

            <div className='flex justify-between'>
              <span className='text-gray-600'>주소:</span>
              <span className='font-medium text-sm'>
                {currentStore.address}
              </span>
            </div>

            {currentStore.description && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>영상 설명:</span>
                <span className='font-medium text-sm'>
                  {currentStore.description}
                </span>
              </div>
            )}

            {customMenus.length > 0 && (
              <div>
                <span className='text-gray-600'>추가된 메뉴:</span>
                <div className='mt-1 space-y-1'>
                  {customMenus.map(menu => (
                    <div key={menu.id} className='flex justify-between text-sm'>
                      <span>{menu.name}</span>
                      {menu.price && (
                        <span className='text-orange-600'>
                          {menu.price.toLocaleString()}원
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 영상 미리보기 (추후 실제 영상 URL로 대체) */}
        <div className='bg-gray-100 rounded-lg aspect-video flex items-center justify-center'>
          <div className='text-center'>
            <div className='w-16 h-16 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-2'>
              <svg
                className='w-8 h-8 text-gray-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <p className='text-gray-600'>영상 미리보기</p>
            <p className='text-sm text-gray-500'>
              생성된 영상이 여기에 표시됩니다
            </p>
          </div>
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className='px-6 pb-4 fixed bottom-20 left-0 right-0 mobile-area h-18 bg-white border-t border-gray-100'>
        <div className='flex gap-3 h-full items-center'>
          <button
            onClick={handleCreateNew}
            className='flex-1 h-full flex-center border border-gray-300 text-gray-700 rounded-[15px] hover:bg-gray-50'
          >
            새 영상 제작
          </button>
          <button
            onClick={handleViewVideo}
            className='flex-[2] h-full flex-center bg-orange400 rounded-[15px] text-bodySmall text-white000 cursor-pointer'
          >
            영상 관리하기
          </button>
        </div>
      </div>
    </div>
  );
}
