'use client';

import { memo } from 'react';
import AlertIcon from '@/public/svg/mypage/alert.svg';
import { cn } from '@/lib/utils/cn';
import { Copy } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';

// Helper Components - 가게 정보 렌더링
export const FieldContainer = memo(
  ({ label, value }: { label: string; value: string }) => (
    <div className='flex flex-col gap-2'>
      <h4 className='text-headlineMedium text-gray500 flex items-center '>
        {label}
        {label === '네이버 지도 연결' && (
          <>
            <span className='w-4 h-4 ml-1'>
              <AlertIcon />
            </span>
            <CopyButton text={value} />
          </>
        )}
      </h4>
      <p
        className={cn(
          'text-bodySmall text-gray600 !font-normal ',
          label === '네이버 지도 연결' && 'line-clamp-1 text-ellipsis',
        )}
      >
        {value}
      </p>
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
export const MenuList = memo(
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
