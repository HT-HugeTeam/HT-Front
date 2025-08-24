'use client';

import LeftArrow from '@/public/svg/left-arrow-inactive.svg';
import { useRouter } from 'next/navigation';

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  children: React.ReactNode;
}

export function StepLayout({
  title,
  subtitle,
  step,
  totalSteps,
  onBack,
  children,
}: StepLayoutProps) {
  const router = useRouter();

  return (
    <div className='min-h-screen bg-white flex flex-col mobile-area'>
      {/* Header */}
      <header className='pt-10 px-6 pb-2 flex items-center justify-between'>
        {step > 1 ? (
          <button
            onClick={() => {
              if (onBack) {
                onBack();
              } else {
                router.back();
              }
            }}
            className='cursor-pointer'
          >
            <LeftArrow />
          </button>
        ) : (
          <div className='w-6 h-6' />
        )}
      </header>

      {/* Progress Bar */}
      <div className='px-6 py-6'>
        <div className='w-full bg-gray-200 rounded-full h-2'>
          <div
            className='bg-orange-500 h-2 rounded-full transition-all duration-500 ease-out'
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 px-6 pb-6 flex flex-col'>
        <h1 className='text-displayLarge text-gray600'>{title}</h1>
        {subtitle && (
          <p className='text-displayLarge text-gray600'>{subtitle}</p>
        )}
        <div className='flex-1'>{children}</div>
      </div>
    </div>
  );
}
