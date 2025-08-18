'use client';

import { useMyPageStore } from '@/lib/stores/mypage-store';
import { useState } from 'react';
import DeleteX from '@/public/svg/delete-x.svg';
import Plus from '@/public/svg/plus.svg';

export const StoreMenuEditor = () => {
  const [newMenuItem, setNewMenuItem] = useState('');
  const formData = useMyPageStore(state => state.formData);
  const addMenuItem = useMyPageStore(state => state.addMenuItem);
  const removeMenuItem = useMyPageStore(state => state.removeMenuItem);

  const handleAddMenuItem = () => {
    addMenuItem(newMenuItem);
    setNewMenuItem('');
  };

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='storeMenu' className='text-headlineMedium text-gray500'>
        메뉴
      </label>
      <div className='pt-5 pb-2 flex flex-col gap-2'>
        {formData.storeMenu.map((menu, index) => (
          <div key={menu} className='flex items-center gap-2'>
            <button type='button' onClick={() => removeMenuItem(index)}>
              <DeleteX />
            </button>
            <p className='text-bodySmall text-gray600 !font-normal'>{menu}</p>
          </div>
        ))}
      </div>

      {/* 새 메뉴 추가 */}
      <div className='relative flex items-center gap-2'>
        <input
          type='text'
          value={newMenuItem}
          onChange={e => setNewMenuItem(e.target.value)}
          placeholder='추가할 메뉴명을 입력해주세요.'
          className='flex-1 text-bodySmall text-gray600 border-b-2 border-gray600 pt-5 pb-2 focus:outline-none focus:ring-0'
        />
        <button
          onClick={handleAddMenuItem}
          className='absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/5 rounded-lg cursor-pointer'
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};
