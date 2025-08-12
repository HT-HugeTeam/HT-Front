'use client';

import { StoreDetail } from '@/types/store/store-detail.types';
import { useInfoQuery } from '../_hooks/use-info-query';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import DeleteX from '@/public/svg/delete-x.svg';
import Plus from '@/public/svg/plus.svg';

export function InfoStoreDetail({
  storeDetail,
}: {
  storeDetail: StoreDetail | undefined;
}) {
  const { edit, setEdit } = useInfoQuery();
  const [formData, setFormData] = useState({
    storeName: '',
    storeAddress: '',
    storeDescription: '',
    storeMenu: [] as string[],
  });
  const [newMenuItem, setNewMenuItem] = useState('');

  // storeDetail이 변경될 때 formData 초기화
  useEffect(() => {
    if (storeDetail) {
      void setFormData({
        storeName: storeDetail.storeName,
        storeAddress: storeDetail.storeAddress,
        storeDescription: storeDetail.storeDescription,
        storeMenu: [...storeDetail.storeMenu],
      });
    }
  }, [storeDetail]);

  const handleSave = useCallback(() => {
    // API 호출로직 필요
    toast.success('수정되었습니다.');
    void setEdit(false);
  }, [setEdit]);

  const handleCancel = useCallback(() => {
    // 원래 데이터로 복원
    if (storeDetail) {
      void setFormData({
        storeName: storeDetail.storeName,
        storeAddress: storeDetail.storeAddress,
        storeDescription: storeDetail.storeDescription,
        storeMenu: [...storeDetail.storeMenu],
      });
    }
  }, [storeDetail]);
  // Header 이벤트 리스너들
  useEffect(() => {
    window.addEventListener('save-store-detail', handleSave);
    window.addEventListener('cancel-store-edit', handleCancel);
    return () => {
      window.removeEventListener('save-store-detail', handleSave);
      window.removeEventListener('cancel-store-edit', handleCancel);
    };
  }, [handleSave, handleCancel]);

  // 메뉴 추가
  const addMenuItem = () => {
    if (newMenuItem.trim()) {
      void setFormData(prev => ({
        ...prev,
        storeMenu: [...prev.storeMenu, newMenuItem.trim()],
      }));
      void setNewMenuItem('');
    }
  };

  // 메뉴 삭제
  const removeMenuItem = (index: number) => {
    void setFormData(prev => ({
      ...prev,
      storeMenu: prev.storeMenu.filter((_, i) => i !== index),
    }));
  };

  if (!storeDetail) return null;

  return (
    <div className='pl-6 pt-8 pr-6 w-full h-auto flex flex-col gap-8'>
      {/* 상호명 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500'>상호명</h4>
        {edit ? (
          <input
            type='text'
            value={formData.storeName}
            onChange={e =>
              void setFormData(prev => ({ ...prev, storeName: e.target.value }))
            }
            className='text-bodySmall text-gray600 border-b-2 border-gray600 pt-5 pb-2 focus:outline-none focus:ring-0'
          />
        ) : (
          <p className='text-bodySmall text-gray600 !font-normal'>
            {storeDetail.storeName}
          </p>
        )}
      </div>

      {/* 주소 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500'>주소</h4>
        {edit ? (
          <input
            type='text'
            value={formData.storeAddress}
            onChange={e =>
              void setFormData(prev => ({
                ...prev,
                storeAddress: e.target.value,
              }))
            }
            className='text-bodySmall text-gray600 border-b-2 border-gray600 pt-5 pb-2 focus:outline-none focus:ring-0'
          />
        ) : (
          <p className='text-bodySmall text-gray600 !font-normal'>
            {storeDetail.storeAddress}
          </p>
        )}
      </div>

      {/* 소개 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500'>소개</h4>
        {edit ? (
          <textarea
            value={formData.storeDescription}
            onChange={e =>
              void setFormData(prev => ({
                ...prev,
                storeDescription: e.target.value,
              }))
            }
            className='text-bodySmall text-gray600 border-b-2 border-gray600 pt-5 pb-2 focus:outline-none focus:ring-0 resize-none'
          />
        ) : (
          <p className='text-bodySmall text-gray600 !font-normal'>
            {storeDetail.storeDescription}
          </p>
        )}
      </div>

      {/* 메뉴 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500'>메뉴</h4>
        {edit ? (
          <div className='flex flex-col gap-2'>
            <div className='pt-5 pb-2 flex flex-col gap-2'>
              {formData.storeMenu.map((menu, index) => (
                <div key={menu} className='flex items-center gap-2'>
                  <button type='button' onClick={() => removeMenuItem(index)}>
                    <DeleteX />
                  </button>
                  <p className='text-bodySmall text-gray600 !font-normal'>
                    {menu}
                  </p>
                </div>
              ))}
            </div>

            {/* 새 메뉴 추가 */}
            <div className='relative flex items-center gap-2'>
              <input
                type='text'
                value={newMenuItem}
                onChange={e => void setNewMenuItem(e.target.value)}
                placeholder='추가할 메뉴명을 입력해주세요.'
                className='flex-1 text-bodySmall text-gray600 border-b-2 border-gray600 pt-5 pb-2 focus:outline-none focus:ring-0'
              />
              <button
                onClick={addMenuItem}
                className='absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/5 rounded-lg cursor-pointer'
              >
                <Plus />
              </button>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            {/* 기존 메뉴 리스트 */}
            {storeDetail.storeMenu.map(menu => (
              <p
                key={menu}
                className='text-bodySmall text-gray600 !font-normal'
              >
                {menu}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
