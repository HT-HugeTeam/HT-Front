'use client';

import { useMyPageStore } from '@/lib/stores/mypage-store';
import { useInfoQuery } from '../_hooks/use-info-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { StoreDetail } from '@/types/mypage/store-detail.types';
import DeleteX from '@/public/svg/delete-x.svg';
import Plus from '@/public/svg/plus.svg';
import AlertIcon from '@/public/svg/mypage/alert.svg';
import { CopyButton } from '@/components/copy-button';

const INPUT_STYLES = {
  base: 'w-full text-bodySmall text-gray600 border-b-2 border-gray600 focus:outline-none focus:ring-0',
  input: 'pt-5 pb-2',
  textarea: 'pt-5 pb-6 resize-none',
} as const;

const FORM_FIELDS = [
  {
    key: 'storeName' as const,
    type: 'input',
    label: '상호명',
  },
  {
    key: 'storeAddress' as const,
    type: 'input',
    label: '주소',
  },
  {
    key: 'storeDescription' as const,
    type: 'textarea',
    label: '소개',
  },
  {
    key: 'storeNaverMap' as const,
    type: 'input',
    label: '네이버 지도 연결',
  },
] as const;

/**
 * Main Components (line 34)
 * - StoreEditForm
 *
 * Helper Components (line 70)
 * - FormField
 * - MenuEditor
 */

// Main Components
export function StoreEditForm({ storeDetail }: { storeDetail: StoreDetail }) {
  const { edit } = useInfoQuery();
  const initializeFormData = useMyPageStore(state => state.initializeFormData);
  const resetFormData = useMyPageStore(state => state.resetFormData);

  // storeDetail이 변경될 때 formData 초기화
  useEffect(() => {
    if (storeDetail) {
      initializeFormData(storeDetail);
    }
  }, [storeDetail]);

  // edit 상태가 false로 변경될 때 원본 데이터로 복원
  useEffect(() => {
    if (!edit && storeDetail) {
      resetFormData(storeDetail);
    }
  }, [edit]);

  return (
    <>
      {/* 가게 상호명, 주소, 소개 */}
      {FORM_FIELDS.map(
        field =>
          field.key !== 'storeNaverMap' && (
            <FormField key={field.key} field={field} />
          ),
      )}

      {/* 가게 메뉴 */}
      <MenuEditor />

      {/* 네이버 지도 연결 */}
      <FormField
        field={{
          key: 'storeNaverMap' as const,
          type: 'input',
          label: '네이버 지도 연결',
        }}
      />
      <span className='-mt-6 mb-10 p-3 flex-center w-fit h-auto bg-orange100 rounded-[8px] text-labelSmall text-orange400'>
        쇼츠테이블 둘러보기에서 프로프 클릭 시<br />
        자동으로 네이버 지도로 연결돼요!
      </span>
    </>
  );
}

// Helper Components - 폼 필드 렌더링
const FormField = ({ field }: { field: (typeof FORM_FIELDS)[number] }) => {
  const formData = useMyPageStore(state => state.formData);
  const updateField = useMyPageStore(state => state.updateField);
  const value = formData[field.key];

  const commonProps = {
    value: value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      updateField(field.key, e.target.value),
    className: `${INPUT_STYLES.base} ${
      field.type === 'textarea' ? INPUT_STYLES.textarea : INPUT_STYLES.input
    }`,
  };

  return field.type === 'textarea' ? (
    <div className='w-full flex flex-col items-start'>
      <label htmlFor={field.key} className='text-headlineMedium text-gray500'>
        {field.label}
      </label>
      <textarea {...commonProps} />
    </div>
  ) : (
    <div className='w-full flex flex-col items-start'>
      <label
        htmlFor={field.key}
        className='text-headlineMedium text-gray500 flex items-center'
      >
        {field.label}
        {field.label === '네이버 지도 연결' && (
          <>
            <span className='w-4 h-4 ml-1'>
              <AlertIcon />
            </span>
            <CopyButton text={value ?? ''} />
          </>
        )}
      </label>
      <input type='text' {...commonProps} />
    </div>
  );
};

// Helper Components - 메뉴 추가, 삭제 관리
const MenuEditor = () => {
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
