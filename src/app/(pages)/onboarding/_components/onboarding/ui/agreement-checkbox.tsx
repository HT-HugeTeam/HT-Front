'use client';

import { cn } from '@/lib/utils/cn';
import TinyArrowRightIcon from '@/public/svg/onboarding-tiny-arrow.svg';
import CheckIcon from '@/public/svg/onboarding-check.svg';

interface AgreementCheckboxProps {
  id: string;
  title: string;
  required: boolean;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  onViewTerms?: () => void;
}

export function AgreementCheckbox({
  id,
  title,
  required,
  checked,
  onCheck,
  onViewTerms,
}: AgreementCheckboxProps) {
  return (
    <div className='flex items-center justify-between py-4'>
      {/* 체크박스와 제목 */}
      <div className='flex items-center gap-3'>
        <button
          type='button'
          onClick={() => onCheck(!checked)}
          className={cn(
            'size-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
            checked
              ? 'border-orange400 bg-orange400'
              : 'border-gray300 bg-transparent',
          )}
        >
          {checked && <CheckIcon />}
        </button>

        <label
          htmlFor={id}
          className={cn(
            'text-headlineMedium cursor-pointer font-bold',
            checked ? 'text-gray600' : 'text-gray500',
          )}
          onClick={() => onCheck(!checked)}
        >
          {title}
          {required && <span className='text-orange400 ml-1'>(필수)</span>}
          {!required && <span className='text-gray400 ml-1'>(선택)</span>}
        </label>
      </div>

      {/* 약관 보기 화살표 */}
      {onViewTerms && (
        <button
          type='button'
          onClick={onViewTerms}
          className='p-1 text-gray400 hover:text-gray600 transition-colors'
        >
          <TinyArrowRightIcon />
        </button>
      )}
    </div>
  );
}
