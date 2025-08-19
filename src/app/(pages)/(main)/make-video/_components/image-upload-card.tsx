'use client';

import React from 'react';
import { useFileSelection } from '@/hooks/use-file-selection';
import PlusIcon from '@/public/svg/plus.svg';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

interface ImageUploadCardProps {
  onFileSelect: (file: File | null) => void;
  maxSize?: number;
  className?: string;
  menuName?: string;
}

export function ImageUploadCard({
  onFileSelect,
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  menuName,
}: ImageUploadCardProps) {
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
    allowedTypes: ['image'],
    maxSize,
    maxFiles: 1, // 단일 파일만
    onFileSelect: files => {
      // 단일 파일이므로 첫 번째 파일만 전달하거나 null
      onFileSelect(files[0] ?? null);
    },
  });

  const hasImage = previews.length > 0;

  const handleRemove = () => {
    removeFile(0);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* 이미지 업로드 카드 */}
      <div
        className={`
          relative w-[104px] h-[139px] flex-center rounded-[8px] cursor-pointer transition-colors duration-300 border
          ${
            hasImage
              ? 'bg-transparent'
              : dragActive
                ? 'bg-orange100 border-orange300'
                : 'bg-gray100 hover:bg-orange100 border-gray200 hover:border-orange300'
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!hasImage ? openFileDialog : undefined}
      >
        {hasImage ? (
          <>
            {/* 선택된 이미지 표시 */}
            <Image
              src={previews[0]!.url}
              alt='Menu image'
              className='w-full h-full object-cover rounded-[8px]'
              width={104}
              height={139}
            />

            {/* 삭제 버튼 */}
            <button
              onClick={e => {
                e.stopPropagation();
                handleRemove();
              }}
              className='absolute -top-1 -right-1 size-[18px] flex-center bg-gray600 text-white rounded-full hover:bg-gray800 transition-colors'
            >
              <XIcon size={12} />
            </button>
          </>
        ) : (
          /* 플러스 아이콘 */
          <PlusIcon className='text-gray400' />
        )}

        {/* 숨겨진 파일 input */}
        <input
          ref={fileInputRef}
          type='file'
          className='hidden'
          accept={getAcceptTypes()}
          onChange={handleChange}
        />
      </div>

      {/* 메뉴명 표시 */}
      {menuName && (
        <p className='text-bodySmall text-gray500 text-center w-[104px] truncate'>
          {menuName}
        </p>
      )}
    </div>
  );
}
