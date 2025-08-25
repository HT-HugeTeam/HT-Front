'use client';

import { useUserOnboarding } from '@/hooks/queries/use-user-onboarding';

export function OwnerIntro() {
  const { data: user } = useUserOnboarding();

  return (
    <header className='pb-4 w-full h-auto flex flex-col items-start gap-2'>
      <div className='flex flex-col gap-1'>
        <h2 className='flex gap-1 items-end text-gray600'>
          <span className='text-displayLarge'>{user?.nickname}</span>
          <span className='text-displayMedium'>사장님</span>
        </h2>
        <h3 className='text-displayMedium text-gray600'>
          숏폼으로 입소문 타는 중!
        </h3>
      </div>
    </header>
  );
}
