'use client';

import { cn } from '@/lib/utils/cn';

interface BottomButtonProps {
  text: string;
  disabled: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function BottomButton({
  text,
  disabled,
  onClick,
  variant = 'primary',
}: BottomButtonProps) {
  return (
    <div className='fixed mobile-area bottom-0 left-0 right-0 p-6 bg-white'>
      <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'w-full h-14 px-6 py-2 rounded-2xl text-bodySmall transition-all duration-200',
          variant === 'primary' && [
            disabled
              ? 'bg-gray400 text-white cursor-not-allowed'
              : 'bg-orange400 text-white hover:bg-orange400/80 active:scale-[0.98] shadow-lg',
          ],
          variant === 'secondary' && [
            disabled
              ? 'bg-gray400 text-white border border-gray400 cursor-not-allowed'
              : 'bg-white text-gray600 border border-gray400 hover:bg-gray200 active:scale-[0.98]',
          ],
        )}
      >
        {text}
      </button>
    </div>
  );
}
