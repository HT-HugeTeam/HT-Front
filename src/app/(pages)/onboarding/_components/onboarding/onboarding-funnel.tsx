'use client';

import { useFunnel } from '@use-funnel/browser';
import { useState } from 'react';
import { type OnboardingData, type OnboardingStep } from '@/types/onboarding';
import { UserTypeStep } from './steps/user-type-step';
import { NicknameStep } from './steps/nickname-step';
import { AgreementsStep } from './steps/agreements-step';

export function OnboardingFunnel() {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>(
    {},
  );

  const funnel = useFunnel<Record<OnboardingStep, OnboardingData>>({
    id: 'onboarding-funnel',
    initial: {
      step: 'user-type',
      context: {
        userType: 'owner',
        nickname: '',
        agreements: { terms: false, privacy: false, location: false },
      },
    },
  });

  // 다음 단계로 이동하면서 데이터 업데이트
  const handleNext = (
    step: OnboardingStep,
    stepData: Partial<OnboardingData>,
  ) => {
    const newData = { ...onboardingData, ...stepData };
    setOnboardingData(newData);

    // 다음 단계 결정
    const nextStep = getNextStep(step);
    if (nextStep) {
      void funnel.history.push(nextStep, newData);
    } else {
      // 온보딩 완료 처리
      void handleOnboardingComplete(newData as OnboardingData);
    }
  };

  // 이전 단계로 이동
  const handleBack = () => {
    void funnel.history.back();
  };

  // 다음 단계 결정 로직
  const getNextStep = (
    currentStep: OnboardingStep,
  ): OnboardingStep | undefined => {
    const stepOrder: OnboardingStep[] = ['user-type', 'nickname', 'agreements'];
    const currentIndex = stepOrder.indexOf(currentStep);
    return currentIndex < stepOrder.length - 1
      ? stepOrder[currentIndex + 1]
      : undefined;
  };

  // 온보딩 완료 처리
  const handleOnboardingComplete = async (data: OnboardingData) => {
    try {
      // TODO: API 호출로 사용자 온보딩 데이터 저장
      console.log('온보딩 완료:', data);

      // 성공 후 메인 페이지로 리디렉션
      const redirectPath = data.userType === 'owner' ? '/home' : '/home';
      window.location.href = redirectPath;
    } catch (error) {
      console.error('온보딩 저장 실패:', error);
      // TODO: 에러 처리 (토스트 메시지 등)
    }
  };

  return (
    <div className='fixed inset-0 z-10 mobile-area min-h-screen overflow-hidden'>
      <funnel.Render
        user-type={() => (
          <UserTypeStep
            onNext={data => handleNext('user-type', data)}
            currentData={onboardingData}
          />
        )}
        nickname={() => (
          <NicknameStep
            onNext={data => handleNext('nickname', data)}
            onBack={handleBack}
            currentData={onboardingData}
          />
        )}
        agreements={() => (
          <AgreementsStep
            onNext={data => handleNext('agreements', data)}
            onBack={handleBack}
            currentData={onboardingData}
          />
        )}
      />
    </div>
  );
}
