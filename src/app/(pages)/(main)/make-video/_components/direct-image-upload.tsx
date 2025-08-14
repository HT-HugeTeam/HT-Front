// components/DirectImageUploader.tsx
'use client';

import { useDirectS3Upload } from '@/hooks/use-direct-s3upload';
import { useState } from 'react';

interface DirectImageUploaderProps {
  onUploadComplete: (imageUrl: string) => void;
  maxSize?: number;
  acceptedTypes?: string[];
}

export function DirectImageUpload({
  onUploadComplete = () => {},
  maxSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
}: DirectImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    mutate: uploadFile,
    isPending,
    error,
  } = useDirectS3Upload({
    onSuccess: imageUrl => {
      console.log('업로드 완료된 URL:', imageUrl);
      onUploadComplete(imageUrl);
      setUploadProgress(100);
    },
  });

  const handleFile = (file: File) => {
    // 파일 검증
    if (!acceptedTypes.includes(file.type)) {
      alert('지원하지 않는 파일 형식입니다.');
      return;
    }

    if (file.size > maxSize) {
      alert('파일 크기가 너무 큽니다.');
      return;
    }

    // 미리보기 생성
    const reader = new FileReader();
    reader.onload = e => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    // 업로드 시작
    setUploadProgress(0);
    uploadFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <div className='relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors'>
        {preview ? (
          <div className='space-y-4'>
            <img
              src={preview}
              alt='Preview'
              className='w-full h-40 object-cover rounded-lg'
            />

            {isPending && (
              <div className='space-y-2'>
                <div className='w-full bg-gray-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className='text-sm text-gray-600'>업로드 중...</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className='space-y-2'>
              <div className='flex justify-center'>
                <svg
                  className='w-12 h-12 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                  />
                </svg>
              </div>
              <p className='text-sm text-gray-600'>이미지를 선택해서 업로드</p>
              <p className='text-xs text-gray-400'>PNG, JPG, WEBP (최대 5MB)</p>
            </div>

            <input
              type='file'
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              accept={acceptedTypes.join(',')}
              onChange={handleChange}
              disabled={isPending}
            />
          </>
        )}
      </div>

      {error && (
        <p className='mt-2 text-sm text-red-600'>
          업로드 실패: {error.message}
        </p>
      )}
    </div>
  );
}
