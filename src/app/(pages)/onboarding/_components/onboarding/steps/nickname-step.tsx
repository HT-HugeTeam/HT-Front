'use client';

import { useState } from 'react';
import { StepProps } from '@/types/onboarding';
import { StepLayout } from '../ui/step-layout';
import { BottomButton } from '../ui/bottom-button';

export function NicknameStep({ onNext, onBack, currentData }: StepProps) {
  const [nickname, setNickname] = useState(currentData?.nickname ?? '');

  const handleNext = () => {
    if (nickname.trim()) {
      onNext({ nickname: nickname.trim() });
    }
  };

  return (
    <StepLayout
      title='사용하실 닉네임을'
      subtitle='입력해주세요'
      step={2}
      totalSteps={3}
      // 임시처리
      onBack={onBack ?? (() => {})} // eslint-disable-line @typescript-eslint/no-empty-function
    >
      <div className='pt-6'>
        <input
          type='text'
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className='w-full h-12 border-b-2 border-gray600 text-bodyMedium text-gray600 focus:outline-none transition-all duration-200'
        />
      </div>

      <BottomButton
        text='다음'
        disabled={!nickname.trim()}
        onClick={handleNext}
      />
    </StepLayout>
  );
}
