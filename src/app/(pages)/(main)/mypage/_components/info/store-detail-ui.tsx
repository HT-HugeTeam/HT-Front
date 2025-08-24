'use client';

import { useStoreByUser, useStoreDetail } from '@/hooks/queries/use-store';
import { type StoreDetail } from '@/types/store';
import { FieldContainer, MenuList } from '@/components/store-info';
import { type StoreResponse } from '@/types/api';

export const StoreField = [
  {
    label: '상호명',
    value: 'name',
  },
  {
    label: '주소',
    value: 'address',
  },
  {
    label: '소개',
    value: 'description',
  },
];

export function StoreDetailUI() {
  const { data: storeDetail } = useStoreByUser();

  return (
    <>
      {/* 상호명, 주소, 소개 */}
      {StoreField.map(field => (
        <FieldContainer
          key={field.label}
          label={field.label}
          value={storeDetail?.[0]?.[field.value as keyof StoreResponse] ?? ''}
        />
      ))}

      {/* 메뉴 */}
      {/* <MenuList menus={storeDetail.menu} /> */}
      <FieldContainer
        label='네이버 지도 연결'
        value={storeDetail?.[0]?.naverUrl ?? ''}
      />

      <span className='-mt-6 p-3 flex-center w-fit h-auto bg-orange100 rounded-[8px] text-labelSmall text-orange400'>
        쇼츠테이블 둘러보기에서 프로필 클릭 시<br />
        자동으로 네이버 지도로 연결돼요!
      </span>
    </>
  );
}
