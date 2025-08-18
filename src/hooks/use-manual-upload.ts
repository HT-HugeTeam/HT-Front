// hooks/use-manual-upload.ts
'use client';

import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface UploadResponse {
  success: boolean;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  result?: UploadResponse;
}

interface UseManualUploadOptions {
  onAllComplete?: (results: UploadResponse[]) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: UploadProgress[]) => void;
}

export function useManualUpload(options?: UseManualUploadOptions) {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);

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

        try {
          // 업로드 시작
          setUploadProgress(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              status: 'uploading',
              progress: 50,
              fileName: file?.name ?? '',
            };
            options?.onProgress?.(updated);
            return updated;
          });

          const result = await uploadSingleFile(file as File);
          console.log('result', result);
          results.push(result);

          // 업로드 완료
          setUploadProgress(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              status: 'completed',
              progress: 100,
              result,
              fileName: file?.name ?? '',
            };
            options?.onProgress?.(updated);
            return updated;
          });
        } catch (error) {
          // 업로드 실패
          setUploadProgress(prev => {
            const updated = [...prev];
            updated[i] = {
              ...updated[i],
              status: 'error',
              progress: 0,
              error: error instanceof Error ? error.message : '업로드 실패',
              fileName: file?.name ?? '',
            };
            options?.onProgress?.(updated);
            return updated;
          });

          throw error; // 실패 시 전체 중단
        }
      }

      return results;
    },
    onSuccess: results => {
      options?.onAllComplete?.(results);
    },
    onError: error => {
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
        // 진행상태 초기화
        const initialProgress: UploadProgress[] = files.map(file => ({
          fileName: file.name,
          progress: 0,
          status: 'pending',
        }));
        setUploadProgress(initialProgress);
        options?.onProgress?.(initialProgress);

        // 모든 파일을 병렬로 업로드
        const uploadPromises = files.map(async (file, index) => {
          try {
            // 업로드 시작
            setUploadProgress(prev => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                status: 'uploading',
                progress: 50,
                fileName: file?.name ?? '',
              };
              options?.onProgress?.(updated);
              return updated;
            });

            const result = await uploadSingleFile(file);

            // 업로드 완료
            setUploadProgress(prev => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                status: 'completed',
                progress: 100,
                result,
                fileName: file?.name ?? '',
              };
              options?.onProgress?.(updated);
              return updated;
            });

            return result;
          } catch (error) {
            // 업로드 실패
            setUploadProgress(prev => {
              const updated = [...prev];
              updated[index] = {
                ...updated[index],
                status: 'error',
                progress: 0,
                error: error instanceof Error ? error.message : '업로드 실패',
                fileName: file?.name ?? '',
              };
              options?.onProgress?.(updated);
              return updated;
            });

            throw error;
          }
        });

        const results = await Promise.all(uploadPromises);
        return results;
      },
      onSuccess: results => {
        options?.onAllComplete?.(results);
      },
      onError: error => {
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

  const resetProgress = () => {
    setUploadProgress([]);
  };

  return {
    uploadFiles, // 순차 업로드
    uploadFilesParallel, // 병렬 업로드
    uploadProgress,
    isUploading: isPending || isParallelPending,
    resetProgress,
  };
}
