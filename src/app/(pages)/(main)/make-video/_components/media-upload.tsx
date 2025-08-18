// components/media-upload.tsx
'use client';

import { useSecureFileUpload } from '@/hooks/use-secure-file-upload';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

interface MediaUploadProps {
  onUploadComplete: (url: string, fileType: 'image' | 'video') => void;
  allowedTypes?: ('image' | 'video')[];
  maxSize?: number;
  className?: string;
  children?: React.ReactNode;
}

export function MediaUpload({
  onUploadComplete,
  allowedTypes = ['image', 'video'],
  maxSize = 50 * 1024 * 1024, // 50MB
  className = '',
  children,
}: MediaUploadProps) {
  const [preview, setPreview] = useState<{
    url: string;
    type: 'image' | 'video';
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending, error } = useSecureFileUpload({
    onSuccess: (data) => {
      const fileType = data.fileType.startsWith('image/') ? 'image' : 'video';
      onUploadComplete(data.url, fileType);
      toast.success(`${fileType === 'image' ? '이미지' : '동영상'} 업로드 완료!`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const validateFile = (file: File): boolean => {
    // 파일 타입 검증
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!allowedTypes.includes('image') && isImage) {
      toast.error('이미지 파일은 허용되지 않습니다.');
      return false;
    }
    
    if (!allowedTypes.includes('video') && isVideo) {
      toast.error('동영상 파일은 허용되지 않습니다.');
      return false;
    }

    if (!isImage && !isVideo) {
      toast.error('이미지 또는 동영상 파일만 업로드할 수 있습니다.');
      return false;
    }

    // 파일 크기 검증
    if (file.size > maxSize) {
      const sizeMB = Math.round(maxSize / (1024 * 1024));
      toast.error(`파일 크기가 ${sizeMB}MB를 초과할 수 없습니다.`);
      return false;
    }

    return true;
  };

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setPreview({ url: result, type });
    };
    reader.readAsDataURL(file);

    // 업로드 시작
    uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const getAcceptTypes = () => {
    const types = [];
    if (allowedTypes.includes('image')) {
      types.push('image/*');
    }
    if (allowedTypes.includes('video')) {
      types.push('video/*');
    }
    return types.join(',');
  };

  if (children) {
    return (
      <div className={className} onClick={openFileDialog}>
        {children}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={getAcceptTypes()}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${isPending ? 'pointer-events-none opacity-50' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        {preview ? (
          <div className="space-y-4">
            {preview.type === 'image' ? (
              <img
                src={preview.url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            ) : (
              <video
                src={preview.url}
                className="w-full h-48 object-cover rounded-lg"
                controls
                muted
              />
            )}
            
            {isPending && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full animate-pulse" />
                </div>
                <p className="text-sm text-gray-600">업로드 중...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                파일을 드래그하거나 클릭해서 업로드
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {allowedTypes.includes('image') && allowedTypes.includes('video')
                  ? '이미지 또는 동영상'
                  : allowedTypes.includes('image')
                  ? '이미지'
                  : '동영상'}
                {' '}(최대 {Math.round(maxSize / (1024 * 1024))}MB)
              </p>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={getAcceptTypes()}
          onChange={handleChange}
          disabled={isPending}
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">
          업로드 실패: {error.message}
        </p>
      )}
    </div>
  );
}