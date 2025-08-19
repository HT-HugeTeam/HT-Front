'use client';

import React from 'react';
import { useFileSelection } from '@/hooks/use-file-selection';
import PlusIcon from '@/public/svg/plus.svg';
import { XIcon } from 'lucide-react';

interface VideoUploadCardProps {
  onFileSelect: (files: File[]) => void;
  allowedTypes?: ['video'];
  maxSize?: number;
  maxFiles?: number;
  className?: string;
}

export function VideoUploadCard({
  onFileSelect,
  maxSize = 50 * 1024 * 1024, // 50MB
  maxFiles = 10,
  className = '',
}: VideoUploadCardProps) {
  const {
    previews,
    dragActive,
    fileInputRef,
    openFileDialog,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleChange,
    removeFile,
    getAcceptTypes,
  } = useFileSelection({
    allowedTypes: ['video'],
    maxSize,
    maxFiles,
    onFileSelect,
  });

  return (
    <div className={`w-full h-auto flex gap-2 ${className}`}>
      {/* 플러스 버튼 (항상 표시) */}
      <div
        className={`
          relative flex-shrink-0 w-[104px] h-[139px] flex-center rounded-[8px] cursor-pointer transition-colors duration-300 border
          ${
            dragActive
              ? 'bg-orange100 border-orange300'
              : 'bg-gray100 hover:bg-orange100 border-gray200 hover:border-orange300'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <PlusIcon className='text-gray400' />

        <input
          ref={fileInputRef}
          type='file'
          className='hidden'
          accept={getAcceptTypes()}
          multiple
          onChange={handleChange}
        />
      </div>

      {/* 선택된 동영상 목록 (가로로 나열) */}
      {previews.length > 0 && (
        <>
          {previews.map((preview, index) => (
            <div
              key={index}
              className='relative flex-shrink-0 w-[104px] h-[139px] flex-center bg-gray100 rounded-[8px]'
            >
              <video
                src={preview.url}
                className='w-full h-full object-cover rounded-[8px] border'
                muted
              />

              {/* 삭제 버튼 */}
              <button
                onClick={() => removeFile(index)}
                className='absolute -top-1 -right-1 size-[18px] flex-center bg-gray600 text-white rounded-full hover:bg-gray800 transition-colors'
              >
                <XIcon size={12} />
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
