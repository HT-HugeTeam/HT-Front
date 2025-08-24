'use client';

import { FORM_FIELDS } from '@/lib/constants/style.constant';
import { InputFormField } from '@/components/input-form-field';

export function StoreAddForm() {
  return (
    <>
      {/* 가게 상호명, 주소, 소개 */}
      {FORM_FIELDS.map(
        field =>
          field.key !== 'naverUrl' && (
            <InputFormField key={field.key} field={field} />
          ),
      )}

      {/* 네이버 지도 연결 */}
      <InputFormField
        field={{
          key: 'naverUrl' as const,
          type: 'input',
          label: '네이버 지도 연결',
        }}
      />
    </>
  );
}
