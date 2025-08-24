'use client';

import { LoadingSpinnerBasic } from '@/components/loading-spinner';
import { FieldContainer } from '@/components/store-info';
import { useUserOnboarding } from '@/hooks/queries/use-user-onboarding';

export function InfoOwner() {
  const { data: userInfo, isLoading } = useUserOnboarding();

  if (isLoading) return <LoadingSpinnerBasic />;

  return (
    <div className='pt-8 w-full h-auto '>
      <FieldContainer label='닉네임' value={userInfo?.nickname ?? ''} />
    </div>
  );
}
