'use client';

import { useState } from 'react';
import {
  type StepProps,
  type UserType,
  USER_TYPE_INFO,
} from '@/types/onboarding';
import { StepLayout } from '../ui/step-layout';
import { UserTypeCard } from '../ui/user-type-card';
import { BottomButton } from '../ui/bottom-button';
import AlertIcon from '@/public/svg/mypage/alert.svg';

// mvp 단계 고객님 타입 비활성화

export function UserTypeStep({ onNext, currentData }: StepProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(
    currentData?.userType ?? 'owner', // 사장님으로 기본 선택
  );

  const handleNext = () => {
    if (selectedType) {
      onNext({ userType: selectedType });
    }
  };

  return (
    <StepLayout title='저는' step={1} totalSteps={3}>
      <div className='pt-6 flex gap-4 min-mobile:gap-6'>
        {(
          Object.entries(USER_TYPE_INFO) as [
            UserType,
            (typeof USER_TYPE_INFO)[UserType],
          ][]
        ).map(([type, info]) => (
          <UserTypeCard
            key={type}
            type={type}
            title={info.title}
            selected={selectedType === type}
            onSelect={() => setSelectedType(type)}
            disabled={type === 'customer'} // 고객님 타입 비활성화
          />
        ))}
      </div>
      <span className='p-4 mt-4 w-full h-17 flex flex-col gap-1 bg-gray100 rounded-[8px]'>
        <AlertIcon />
        <span className='text-labelSmall text-gray600'>
          현재는 사장님만 이용가능합니다.
        </span>
      </span>

      <BottomButton text='다음' disabled={!selectedType} onClick={handleNext} />
    </StepLayout>
  );
}
