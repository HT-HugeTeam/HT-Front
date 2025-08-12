'use client';

import { useState, useEffect } from 'react';
import { StepProps, validators } from '@/types/onboarding';
import { StepLayout } from '../ui/step-layout';
import { BottomButton } from '../ui/bottom-button';

export function AgreementsStep({ onNext, onBack, currentData }: StepProps) {
  const [agreements, setAgreements] = useState({
    privacy: currentData?.agreements?.privacy ?? false,
    terms: currentData?.agreements?.terms ?? false,
    marketing: currentData?.agreements?.marketing ?? false,
  });

  const [_, setIsAllRequiredAgreed] = useState(false);

  // 필수 약관 동의 여부 확인
  useEffect(() => {
    setIsAllRequiredAgreed(validators.requiredAgreements(agreements));
  }, [agreements]);

  // const handleAgreementChange = (
  //   key: keyof typeof agreements,
  //   checked: boolean,
  // ) => {
  //   setAgreements(prev => ({ ...prev, [key]: checked }));
  // };

  // // 전체 동의 토글
  // const handleAllAgreements = (checked: boolean) => {
  //   setAgreements({
  //     privacy: checked,
  //     terms: checked,
  //     marketing: checked,
  //   });
  // };

  const handleNext = () => {
    onNext({ agreements });
  };

  return (
    <StepLayout
      title='쇼츠테이블 이용을 위한'
      subtitle='정보 동의가 필요해요'
      step={3}
      totalSteps={3}
      onBack={onBack ?? (() => {})} // eslint-disable-line @typescript-eslint/no-empty-function
    >
      <BottomButton
        text='동의하고 시작하기'
        disabled={false}
        // disabled={!isAllRequiredAgreed}
        onClick={handleNext}
      />
    </StepLayout>
  );
}
