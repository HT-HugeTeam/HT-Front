import { StoreDetail } from '@/types/mypage/store-detail.types';
import { memo } from 'react';

const StoreField = [
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
    </>
  );
}

// Helper Components - 가게 정보 렌더링
const FieldContainer = memo(
  ({ label, value }: { label: string; value: string }) => (
    <div className='flex flex-col gap-2'>
      <h4 className='text-headlineMedium text-gray500'>{label}</h4>
      <p className='text-bodySmall text-gray600 !font-normal'>{value}</p>
    </div>
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.label === nextProps.label && prevProps.value === nextProps.value
    );
  },
);
FieldContainer.displayName = 'FieldContainer';

// Helper Components - 메뉴 목록 렌더링
const MenuList = memo(
  ({ menus }: { menus: string[] }) => {
    return (
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500'>메뉴</h4>
        <div className='flex flex-col gap-1'>
          {menus.map(menu => (
            <p key={menu} className='text-bodySmall text-gray600 !font-normal'>
              {menu}
            </p>
          ))}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.menus.length !== nextProps.menus.length) return false;
    return prevProps.menus.every((menu, i) => menu === nextProps.menus[i]);
  },
);
MenuList.displayName = 'MenuList';
