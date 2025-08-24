'use client';

import { useMyPageStore } from '@/lib/stores/mypage-store';
import { useStoreQuery } from '@/hooks/use-store-query';
import { useEffect } from 'react';
import { useStoreByUser } from '@/hooks/queries/use-store';
import { FORM_FIELDS } from '@/lib/constants/style.constant';
import { InputFormField } from '@/components/input-form-field';

/**
 * Main Components (line 34)
 * - StoreEditForm
 */

// Main Components
export function StoreEditForm() {
  const { edit } = useStoreQuery();
  const { data: storeDetail } = useStoreByUser();
  const initializeFormData = useMyPageStore(state => state.initializeFormData);
  const resetFormData = useMyPageStore(state => state.resetFormData);

  useEffect(() => {
    if (storeDetail) {
      initializeFormData(storeDetail[0]!);
    }
  }, [storeDetail]);

  useEffect(() => {
    if (!edit && storeDetail) {
      resetFormData(storeDetail[0]!);
    }
  }, [edit]);

  if (!storeDetail) return null;

  return (
    <>
      {/* hidden input field store id */}
      <InputFormField
        field={{
          key: 'id' as const,
          type: 'input',
          label: '가게 ID',
          isHidden: true,
        }}
      />
      {/* 가게 상호명, 주소, 소개 */}
      {FORM_FIELDS.map(
        field =>
          field.key !== 'naverUrl' &&
          field.key !== 'id' && (
            <InputFormField key={field.key} field={field} />
          ),
      )}

      {/* 가게 메뉴 */}
      {/* <StoreMenuEditor /> */}

      {/* 네이버 지도 연결 */}
      <InputFormField
        field={{
          key: 'naverUrl' as const,
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
