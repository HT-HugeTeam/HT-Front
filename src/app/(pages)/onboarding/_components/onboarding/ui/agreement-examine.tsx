'use client';

import LeftArrowInactive from '@/public/svg/left-arrow-inactive.svg';
import { AGREEMENT_TERM_DESCRIPTION } from '@/lib/constants/agreements.constant';
import { AGREEMENT_INFO } from '@/types/onboarding';

export function AgreementExamine({
  type,
  handleViewingType,
}: {
  type: keyof typeof AGREEMENT_INFO;
  handleViewingType: (type: keyof typeof AGREEMENT_INFO | '') => void;
}) {
  const title: string = AGREEMENT_INFO[type].title;
  const description: string = AGREEMENT_TERM_DESCRIPTION[type];

  const handleBack = () => {
    handleViewingType('');
  };

  return (
    <div className='w-full h-full'>
      <header className='fixed z-50 mobile-area top-0 left-0 right-0 w-full flex justify-between items-end pt-10 pb-2 px-6 text-headlineLarge text-gray600 bg-white000'>
        {/* 뒤로가기 버튼 */}
        <button className='w-fit h-fit cursor-pointer' onClick={handleBack}>
          <LeftArrowInactive />
        </button>

        {/* 헤더 제목 */}
        <span className='text-headlineLarge !font-bold text-gray600'>
          {title}
        </span>

        <div className='w-[27.66px] h-5' />
      </header>
      <main className='w-full h-full px-6 pt-24 pb-20 flex flex-col gap-4 overflow-y-auto custom-scrollbar scroll-smooth bg-white000'>
        <p className='text-bodySmall text-gray600 whitespace-pre-line'>
          {description}
        </p>
      </main>
    </div>
  );
}
