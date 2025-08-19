'use client';

import { type ChangeEvent } from 'react';

import { useMyPageStore } from '@/lib/stores/mypage-store';

import { type FORM_FIELDS } from '@/lib/constants/style.constant';

import { INPUT_STYLES } from '@/lib/constants/style.constant';

import AlertIcon from '@/public/svg/mypage/alert.svg';
import { CopyButton } from '@/components/copy-button';

export const InputFormField = ({
  field,
}: {
  field: (typeof FORM_FIELDS)[number];
}) => {
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
