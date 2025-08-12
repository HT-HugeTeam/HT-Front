'use client';

import { useState } from 'react';
import { StepProps, UserType, USER_TYPE_INFO } from '@/types/onboarding';
import { StepLayout } from '../ui/step-layout';
import { UserTypeCard } from '../ui/user-type-card';
import { BottomButton } from '../ui/bottom-button';

export function UserTypeStep({ onNext, currentData }: StepProps) {
  const [selectedType, setSelectedType] = useState<UserType | null>(
    currentData?.userType ?? null,
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
          />
        ))}
      </div>

      <BottomButton text='다음' disabled={!selectedType} onClick={handleNext} />
    </StepLayout>
  );
}
