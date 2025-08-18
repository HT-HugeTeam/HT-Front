// hooks/use-secure-file-upload.ts
'use client';

import { useMutation } from '@tanstack/react-query';

interface UploadResponse {
  success: boolean;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UseSecureFileUploadOptions {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export function useSecureFileUpload(options?: UseSecureFileUploadOptions) {
  return useMutation({
    mutationFn: async (file: File): Promise<UploadResponse> => {
      // S3에 파일 업로드
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '업로드에 실패했습니다.');
      }

      const uploadData = await response.json();
      return uploadData;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}
