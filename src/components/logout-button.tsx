'use client';

import { cn } from '@/lib/utils/cn';
import LogoutIcon from '@/public/svg/mypage/logout.svg';
import clsx from 'clsx';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LOGOUT_BUTTON_STYLE =
  'py-2 flex-1 w-full h-full text-bodySmall text-white000 rounded-[8px]';
export function LogoutButton() {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState(false);
  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ROUTE_URL}/api/logout`,
      {
        method: 'POST',
      },
    );
    if (!response.ok) {
      console.error('Failed to set cookie:', response.statusText);
      return;
    }
    router.push('/login');
  };
  return (
    <>
      <button className='w-fit h-auto flex justify-start items-center gap-2'>
        <span className='size-6 aspect-square flex-center'>
          <LogoutIcon />
        </span>
        <span
          onClick={() => void setIsLogout(true)}
          className={clsx(
            'text-bodyMedium text-orange400 cursor-pointer',
            isLogout && 'text-orange400',
          )}
        >
          로그아웃
        </span>
      </button>
      {isLogout && (
        <div
          className='fixed inset-0 z-50 mobile-area h-screen flex-center flex-col bg-black/50 gap-6'
          onClick={() => void setIsLogout(false)}
        >
          <h2 className='text-headlineSmall text-white000'>
            로그아웃 하시겠습니까?
          </h2>
          <div className='px-14 w-full h-10 min-mobile:h-14 flex-center gap-2'>
            <button
              className={LOGOUT_BUTTON_STYLE + ' bg-white000/30'}
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <button
              className={LOGOUT_BUTTON_STYLE + ' bg-black000/40'}
              onClick={() => void setIsLogout(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
}
