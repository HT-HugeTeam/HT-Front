'use client';

import { FORM_FIELDS } from '@/lib/constants/style.constant';
import { InputFormField } from '@/components/input-form-field';
import { StoreMenuEditor } from './store-menu-editor';

export function StoreAddForm() {
  return (
    <>
      {/* 가게 상호명, 주소, 소개 */}
      {FORM_FIELDS.map(
        field =>
          field.key !== 'storeNaverMap' && (
            <InputFormField key={field.key} field={field} />
          ),
      )}

      {/* 가게 메뉴 */}
      <StoreMenuEditor />

      {/* 네이버 지도 연결 */}
      <InputFormField
        field={{
          key: 'storeNaverMap' as const,
          type: 'input',
          label: '네이버 지도 연결',
        }}
      />
    </>
  );
}
