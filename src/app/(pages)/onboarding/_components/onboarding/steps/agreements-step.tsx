'use client';

import { useState, useEffect } from 'react';
import { type StepProps, validators, AGREEMENT_INFO } from '@/types/onboarding';
import { StepLayout } from '../ui/step-layout';
import { BottomButton } from '../ui/bottom-button';
import { AgreementCheckbox } from '../ui/agreement-checkbox';
import { AGREEMENT_TERM_DESCRIPTION } from '@/lib/constants/agreements.constant';
import { AgreementExamine } from '../ui/agreement-examine';

export function AgreementsStep({ onNext, onBack, currentData }: StepProps) {
  const [agreements, setAgreements] = useState({
    terms: currentData?.agreements?.terms ?? false,
    privacy: currentData?.agreements?.privacy ?? false,
    location: currentData?.agreements?.location ?? false,
  });

  const [isAllRequiredAgreed, setIsAllRequiredAgreed] = useState(false);
  const [viewingType, setViewingType] = useState<
    keyof typeof AGREEMENT_INFO | ''
  >('');

  // 필수 약관 동의 여부 확인
  useEffect(() => {
    setIsAllRequiredAgreed(validators.requiredAgreements(agreements));
  }, [agreements]);

  const handleAgreementChange = (
    key: keyof typeof agreements,
    checked: boolean,
  ) => {
    setAgreements(prev => ({ ...prev, [key]: checked }));
  };

  // 약관 보기 핸들러 (추후 구현)
  const handleViewTerms = (type: keyof typeof agreements) => {
    setViewingType(type);
  };

  const handleNext = () => {
    onNext({ agreements });
  };
  if (viewingType) {
    return (
      <AgreementExamine type={viewingType} handleViewingType={setViewingType} />
    );
  }

  return (
    <StepLayout
      title='쇼츠테이블 이용을 위한'
      subtitle='정보 동의가 필요해요'
      step={3}
      totalSteps={3}
      onBack={onBack ?? (() => {})} // eslint-disable-line @typescript-eslint/no-empty-function
    >
      <div className='pt-6 flex flex-col'>
        {/* 약관 체크박스 목록 */}
        {(
          Object.entries(AGREEMENT_INFO) as [
            keyof typeof agreements,
            (typeof AGREEMENT_INFO)[keyof typeof AGREEMENT_INFO],
          ][]
        ).map(([key, info]) => (
          <AgreementCheckbox
            key={key}
            id={key}
            title={info.title}
            required={info.required}
            checked={agreements[key]}
            onCheck={checked => handleAgreementChange(key, checked)}
            onViewTerms={() => handleViewTerms(key)}
          />
        ))}
      </div>

      <BottomButton
        text='시작하기'
        disabled={!isAllRequiredAgreed}
        onClick={handleNext}
      />
    </StepLayout>
  );
}
