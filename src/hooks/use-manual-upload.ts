// hooks/use-manual-upload.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import {
  useFileUploadStore,
  UploadProgress,
} from '@/lib/stores/file-upload-store';

interface UploadResponse {
  success: boolean;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UseManualUploadOptions {
  onAllComplete?: (results: UploadResponse[]) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: UploadProgress[]) => void;
}

export function useManualUpload(options?: UseManualUploadOptions) {
  // 전역 store 사용
  const {
    uploadProgress,
    isUploading,
    setUploadProgress,
    updateUploadProgress,
    setIsUploading,
    resetUploadProgress,
  } = useFileUploadStore();

  const uploadSingleFile = async (file: File): Promise<UploadResponse> => {
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

    return await response.json();
  };

  const { mutate: executeUpload, isPending } = useMutation({
    mutationFn: async (files: File[]): Promise<UploadResponse[]> => {
      // 전역 store에 업로드 상태 설정
      setIsUploading(true);

      // 진행상태 초기화
      const initialProgress: UploadProgress[] = files.map(file => ({
        fileName: file.name,
        progress: 0,
        status: 'pending',
      }));
      setUploadProgress(initialProgress);
      options?.onProgress?.(initialProgress);

      const results: UploadResponse[] = [];

      // 파일을 순차적으로 업로드 (병렬도 가능)
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;
        try {
          // 업로드 시작
          updateUploadProgress(file.name, {
            status: 'uploading',
            progress: 50,
          });
          options?.onProgress?.(uploadProgress);

          const result = await uploadSingleFile(file as File);
          console.log('result', result);
          results.push(result);

          // 업로드 완료
          updateUploadProgress(file.name, {
            status: 'completed',
            progress: 100,
            result,
          });
          options?.onProgress?.(uploadProgress);
        } catch (error) {
          // 업로드 실패
          updateUploadProgress(file.name, {
            status: 'error',
            progress: 0,
            error: error instanceof Error ? error.message : '업로드 실패',
          });
          options?.onProgress?.(uploadProgress);

          throw error; // 실패 시 전체 중단
        }
      }

      return results;
    },
    onSuccess: results => {
      setIsUploading(false);
      options?.onAllComplete?.(results);
    },
    onError: error => {
      setIsUploading(false);
      options?.onError?.(error);
    },
  });

  const uploadFiles = (files: File[]) => {
    if (files.length === 0) {
      options?.onError?.(new Error('업로드할 파일이 없습니다.'));
      return;
    }
    executeUpload(files);
  };

  // 병렬 업로드 버전 (옵션)
  const { mutate: executeParallelUpload, isPending: isParallelPending } =
    useMutation({
      mutationFn: async (files: File[]): Promise<UploadResponse[]> => {
        setIsUploading(true);

        // 진행상태 초기화
        const initialProgress: UploadProgress[] = files.map(file => ({
          fileName: file.name,
          progress: 0,
          status: 'pending',
        }));
        setUploadProgress(initialProgress);
        options?.onProgress?.(initialProgress);

        // 모든 파일을 병렬로 업로드
        const uploadPromises = files.map(async file => {
          try {
            // 업로드 시작
            updateUploadProgress(file.name, {
              status: 'uploading',
              progress: 50,
            });

            const result = await uploadSingleFile(file);

            // 업로드 완료
            updateUploadProgress(file.name, {
              status: 'completed',
              progress: 100,
              result,
            });

            return result;
          } catch (error) {
            // 업로드 실패
            updateUploadProgress(file.name, {
              status: 'error',
              progress: 0,
              error: error instanceof Error ? error.message : '업로드 실패',
            });

            throw error;
          }
        });

        const results = await Promise.all(uploadPromises);
        return results;
      },
      onSuccess: results => {
        setIsUploading(false);
        options?.onAllComplete?.(results);
      },
      onError: error => {
        setIsUploading(false);
        options?.onError?.(error);
      },
    });

  const uploadFilesParallel = (files: File[]) => {
    if (files.length === 0) {
      options?.onError?.(new Error('업로드할 파일이 없습니다.'));
      return;
    }
    executeParallelUpload(files);
  };

  return {
    uploadFiles, // 순차 업로드
    uploadFilesParallel, // 병렬 업로드
    uploadProgress,
    isUploading,
    resetProgress: resetUploadProgress,
  };
}
