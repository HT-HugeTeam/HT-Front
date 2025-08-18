import { StoreDetail } from '@/types/mypage/store-detail.types';
import { memo } from 'react';
import AlertIcon from '@/public/svg/mypage/alert.svg';
import { cn } from '@/lib/utils/cn';
import { Copy } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import { FieldContainer, MenuList } from '@/components/store-info';

export const StoreField = [
  {
    label: '상호명',
    value: 'storeName',
  },
  {
    label: '주소',
    value: 'storeAddress',
  },
  {
    label: '소개',
    value: 'storeDescription',
  },
];

/**
 * Main Components (line 27)
 * - StoreDetailUI
 *
 * Helper Components (line 44)
 * - FieldContainer
 * - MenuList
 */
export function StoreDetailUI({ storeDetail }: { storeDetail: StoreDetail }) {
  return (
    <>
      {/* 상호명, 주소, 소개 */}
      {StoreField.map(field => (
        <FieldContainer
          key={field.label}
          label={field.label}
          value={storeDetail[field.value as keyof StoreDetail] as string}
        />
      ))}

      {/* 메뉴 */}
      <MenuList menus={storeDetail.storeMenu} />
      <FieldContainer
        label='네이버 지도 연결'
        value={storeDetail?.storeNaverMap ?? ''}
      />

      <span className='-mt-6 p-3 flex-center w-fit h-auto bg-orange100 rounded-[8px] text-labelSmall text-orange400'>
        쇼츠테이블 둘러보기에서 프로프 클릭 시<br />
        자동으로 네이버 지도로 연결돼요!
      </span>
    </>
  );
}
