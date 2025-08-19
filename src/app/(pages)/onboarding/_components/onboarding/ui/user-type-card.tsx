'use client';

import { type UserType } from '@/types/onboarding';
import { cn } from '@/lib/utils/cn';
import OwnerIcon from '@/public/svg/onboarding-owner.svg';
import CustomerIcon from '@/public/svg/onboarding-customer.svg';
import clsx from 'clsx';

interface UserTypeCardProps {
  type: UserType;
  title: string;
  selected: boolean;
  onSelect: () => void;
}

export function UserTypeCard({
  type,
  title,
  selected,
  onSelect,
}: UserTypeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'pt-4 px-8 flex-1 size-auto flex-center flex-col text-center gap-3 rounded-2xl border border-white bg-gray200 transition-all duration-200 aspect-square cursor-pointer',
        selected && 'border-orange400 bg-orange200 ',
      )}
    >
      {/* 텍스트 */}
      <div
        className={clsx(
          'w-fit h-auto text-center text-headlineMedium transition-colors min-mobile:text-displayMedium',
          selected ? 'text-orange400' : 'text-gray500',
        )}
      >
        {title}
      </div>

      <div className='flex-1 size-auto flex items-end'>
        {type === 'owner' ? <OwnerIcon /> : <CustomerIcon />}
      </div>
    </button>
  );
}
