'use client';

import { useVideoCreationStore } from '@/stores/video-creation-store';
import { VideoStoreEdit } from './video-store-edit';
import { VideoImageUpload } from './video-image-upload';
import { VideoGenerate } from './video-generate';
import { StoreSelection } from './store-selection';

export function VideoCreationFlow() {
  const { currentStep, currentStore } = useVideoCreationStore();

  // 현재 스텝에 따른 컴포넌트 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'store-select':
        return <StoreSelection />;

      case 'store-edit':
        return currentStore ? <VideoStoreEdit /> : <StoreSelection />;

      case 'image-upload':
        return currentStore ? <VideoImageUpload /> : <StoreSelection />;

      case 'video-generate':
        return currentStore ? <VideoGenerate /> : <StoreSelection />;

      default:
        return <StoreSelection />;
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      {/* 진행 상태 표시 */}
      {/* <VideoCreationProgress /> */}

      {/* 현재 스텝 컴포넌트 */}
      <div className='flex-1'>{renderCurrentStep()}</div>
    </div>
  );
}

function VideoCreationProgress() {
  const { currentStep } = useVideoCreationStore();

  const steps = [
    { key: 'store-select', label: '가게 선택' },
    { key: 'store-edit', label: '정보 편집' },
    { key: 'image-upload', label: '사진 업로드' },
    { key: 'video-generate', label: '영상 생성' },
  ];

  const currentIndex = steps.findIndex(step => step.key === currentStep);

  return (
    <div className='w-full px-6 py-4 bg-white border-b border-gray-200'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => (
          <div key={step.key} className='flex items-center'>
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
              ${
                index <= currentIndex
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }
            `}
            >
              {index + 1}
            </div>
            <span
              className={`
              ml-2 text-sm font-medium
              ${index <= currentIndex ? 'text-orange-500' : 'text-gray-500'}
            `}
            >
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`
                w-8 h-0.5 mx-4
                ${index < currentIndex ? 'bg-orange-500' : 'bg-gray-200'}
              `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
