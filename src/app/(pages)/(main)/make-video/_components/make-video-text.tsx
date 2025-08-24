'use client';

import { useVideoCreationStore } from '@/stores/video-creation-store';

export function MakeVideoText() {
  const currentStep = useVideoCreationStore(state => state.currentStep);

  if (currentStep !== 'store-select') {
    return null;
  }

  return (
    <h2 className='pt-6 pl-6 text-displayLarge text-gray600'>
      영상을 제작할
      <br />
      가게를 선택해주세요
    </h2>
  );
}
