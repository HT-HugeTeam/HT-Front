'use client';

import { useState } from 'react';
import { useVideoCreationStore } from '@/stores/video-creation-store';
import type { VideoStoreInfo } from '@/stores/video-creation-store';
import { INPUT_STYLES } from '@/lib/constants/style.constant';
import AlertIcon from '@/public/svg/mypage/alert.svg';
import { CopyButton } from '@/components/copy-button';
import DeleteX from '@/public/svg/delete-x.svg';
import Plus from '@/public/svg/plus.svg';
import { toast } from 'sonner';

export function VideoStoreEdit() {
  const {
    currentStore,
    updateStoreInfo,
    setCurrentStep,
    addMenu,
    removeMenu,
    getCustomMenus,
  } = useVideoCreationStore();
  const [formData, setFormData] = useState<Partial<VideoStoreInfo>>(
    currentStore ?? {},
  );
  const [newMenuItem, setNewMenuItem] = useState('');

  if (!currentStore) {
    return <div>가게 정보를 불러올 수 없습니다.</div>;
  }

  const handleInputChange = (
    field: keyof VideoStoreInfo,
    value: string | string[],
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // 현재 메뉴 상태를 보존하면서 formData 업데이트
    updateStoreInfo({
      ...formData,
      menus: currentStore?.menus ?? [], // 기존 메뉴 상태 유지
    });
    setCurrentStep('image-upload');
  };

  const handleAddMenuItem = () => {
    if (newMenuItem.trim()) {
      addMenu({
        name: newMenuItem.trim(),
      });
      setNewMenuItem('');
    }
  };

  const customMenus = getCustomMenus();

  const handleCancel = () => {
    setCurrentStep('store-select');
  };

  return (
    <div className='w-full h-full px-6 py-6 overflow-y-auto pb-24'>
      <div className='flex flex-col gap-8'>
        {/* 가게명 */}
        <div className='w-full flex flex-col items-start'>
          <label htmlFor='name' className='text-headlineMedium text-gray500'>
            상호명
          </label>
          <input
            type='text'
            id='name'
            value={formData.name ?? ''}
            onChange={e => handleInputChange('name', e.target.value)}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.input}`}
            placeholder='상호명을 입력하세요'
          />
        </div>

        {/* 주소 */}
        <div className='w-full flex flex-col items-start'>
          <label htmlFor='address' className='text-headlineMedium text-gray500'>
            주소
          </label>
          <input
            type='text'
            id='address'
            value={formData.address ?? ''}
            onChange={e => handleInputChange('address', e.target.value)}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.input}`}
            placeholder='주소를 입력하세요'
          />
        </div>

        {/* 가게 소개 */}
        <div className='w-full flex flex-col items-start'>
          <label
            htmlFor='description'
            className='text-headlineMedium text-gray500'
          >
            소개
          </label>
          <textarea
            id='description'
            value={formData.description ?? ''}
            onChange={e => handleInputChange('description', e.target.value)}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.textarea}`}
            placeholder='가게 소개를 입력하세요'
          />
        </div>

        {/* 메뉴 에디터 */}
        <div className='w-full flex flex-col items-start'>
          <label className='text-headlineMedium text-gray500'>메뉴</label>
          <div className='pt-5 pb-2 w-full flex flex-col gap-2'>
            {customMenus.map(menu => (
              <div key={menu.id} className='flex items-center gap-2'>
                <button type='button' onClick={() => removeMenu(menu.id)}>
                  <DeleteX />
                </button>
                <p className='text-bodySmall text-gray600 !font-normal'>
                  {menu.name}
                </p>
              </div>
            ))}
          </div>

          {/* 새 메뉴 추가 */}
          <div className='relative flex items-center gap-2 w-full'>
            <input
              type='text'
              value={newMenuItem}
              onChange={e => setNewMenuItem(e.target.value)}
              onKeyUp={e => e.key === 'Enter' && handleAddMenuItem()}
              placeholder='추가할 메뉴명을 입력해주세요.'
              className={`${INPUT_STYLES.base} ${INPUT_STYLES.input} flex-1`}
            />
            <button
              onClick={handleAddMenuItem}
              className='absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/5 rounded-lg cursor-pointer'
            >
              <Plus />
            </button>
          </div>
        </div>

        <div className='w-full flex flex-col items-start'>
          <label
            htmlFor='naverUrl'
            className='text-headlineMedium text-gray500 flex items-center'
          >
            네이버 지도 연결
            <>
              <span className='w-4 h-4 ml-1'>
                <AlertIcon />
              </span>
              <CopyButton text={formData.naverUrl ?? ''} />
            </>
          </label>
          <input
            type='text'
            id='naverUrl'
            value={formData.naverUrl ?? ''}
            onChange={e => handleInputChange('naverUrl', e.target.value)}
            className={`${INPUT_STYLES.base} ${INPUT_STYLES.input}`}
          />
        </div>
      </div>

      {/* 하단 고정 버튼 */}
      <div className='px-6 pb-4 fixed bottom-20 left-0 right-0 mobile-area h-18 bg-white'>
        <div className='flex gap-3 h-full items-center'>
          <button
            onClick={handleCancel}
            className='flex-1 h-full flex-center border border-gray-300 text-gray-700 rounded-[15px] hover:bg-gray-50'
          >
            이전
          </button>
          <button
            onClick={handleSave}
            className='flex-[2] h-full flex-center bg-orange400 rounded-[15px] text-bodySmall text-white000 cursor-pointer'
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
