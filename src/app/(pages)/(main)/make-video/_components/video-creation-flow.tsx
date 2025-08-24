'use client';

import { useEffect } from 'react';
import { useVideoCreationStore } from '@/stores/video-creation-store';
import { VideoStoreEdit } from './video-store-edit';
import { VideoImageUpload } from './video-image-upload';
import { StoreSelection } from './store-selection';

export function VideoCreationFlow() {
  const { currentStep, currentStore, resetVideoCreation } =
    useVideoCreationStore();

  // 컴포넌트 마운트 시 step을 초기 상태로 리셋
  useEffect(() => {
    resetVideoCreation();
  }, [resetVideoCreation]);

  // 현재 스텝에 따른 컴포넌트 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'store-select':
        return <StoreSelection />;

      case 'store-edit':
        return currentStore ? <VideoStoreEdit /> : <StoreSelection />;

      case 'image-upload':
        return currentStore ? <VideoImageUpload /> : <StoreSelection />;

      default:
        return <StoreSelection />;
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      {/* 현재 스텝 컴포넌트 */}
      <div className='flex-1'>{renderCurrentStep()}</div>
    </div>
  );
}
