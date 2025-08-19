'use client';

import { FieldContainer } from '@/components/store-info';

export function InfoOwner() {
  return (
    <div className='px-6 pt-8 w-full h-auto '>
      <FieldContainer label='닉네임' value={'멋사'} />
    </div>
  );
}
