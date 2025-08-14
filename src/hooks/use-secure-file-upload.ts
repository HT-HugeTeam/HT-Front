// hooks/use-secure-file-upload.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { FileService } from '@/lib/api/file-service';

interface UploadResponse {
  success: boolean;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UseSecureFileUploadOptions {
  onSuccess?: (data: UploadResponse & { backendResponse?: any }) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
  // 백엔드 전송 옵션
  submitToBackend?: boolean;
  backendOptions?: {
    endpoint?: string;
    headers?: Record<string, string>;
    category?: string;
    description?: string;
    tags?: string[];
  };
}

export function useSecureFileUpload(options?: UseSecureFileUploadOptions) {
  return useMutation({
    mutationFn: async (
      file: File,
    ): Promise<UploadResponse & { backendResponse?: any }> => {
      // 1. S3에 파일 업로드
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
      console.log('uploadData', uploadData);

      // 2. 백엔드에 파일 정보 전송 (선택적)
      let backendResponse;
      if (options?.submitToBackend) {
        try {
          const fileSubmissionData: any = {
            url: uploadData.url,
            fileName: uploadData.fileName,
            fileSize: uploadData.fileSize,
            fileType: uploadData.fileType,
            uploadedAt: new Date().toISOString(),
          };

          if (options.backendOptions?.category) {
            fileSubmissionData.category = options.backendOptions.category;
          }
          if (options.backendOptions?.description) {
            fileSubmissionData.description = options.backendOptions.description;
          }
          if (options.backendOptions?.tags) {
            fileSubmissionData.tags = options.backendOptions.tags;
          }

          const requestOptions: any = {};
          if (options.backendOptions?.endpoint) {
            requestOptions.endpoint = options.backendOptions.endpoint;
          }
          if (options.backendOptions?.headers) {
            requestOptions.headers = options.backendOptions.headers;
          }

          backendResponse = await FileService.submitFileToBackend(
            fileSubmissionData,
            requestOptions,
          );
        } catch (error) {
          console.error('Backend submission failed:', error);
          // S3 업로드는 성공했지만 백엔드 전송 실패
          throw new Error(
            '파일 업로드는 완료되었지만 백엔드 저장에 실패했습니다.',
          );
        }
      }

      return {
        ...uploadData,
        backendResponse,
      };
    },
    onSuccess: data => {
      options?.onSuccess?.(data);
    },
    onError: error => {
      options?.onError?.(error);
    },
  });
}
