'use client';

import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadService } from '@/services/upload/UploadService';
import { FileValidationService } from '@/services/upload/FileValidationService';
import type { UploadResult, ValidationResult } from '@/services/upload/types';
import { DEFAULT_UPLOAD_CONFIG, UploadError } from '@/services/upload/types';
import { toast } from 'sonner';

interface UseUploadServiceOptions {
  onUploadComplete?: (results: UploadResult[]) => void;
  onUploadError?: (error: Error) => void;
  onValidationError?: (validationResults: ValidationResult[]) => void;
  validateBeforeUpload?: boolean;
  uploadMode?: 'sequential' | 'parallel';
}

export function useUploadService(options: UseUploadServiceOptions = {}) {
  const {
    onUploadComplete,
    onUploadError,
    onValidationError,
    validateBeforeUpload = true,
    uploadMode = 'sequential',
  } = options;

  // 서비스 인스턴스 가져오기
  const uploadService = UploadService.getInstance();
  const validationService = FileValidationService.getInstance();

  // 로컬 상태 (단순화)
  const [lastUploadResults, setLastUploadResults] = useState<UploadResult[]>(
    [],
  );

  // 파일 검증
  const validateFiles = useCallback(
    (files: File[]): ValidationResult[] => {
      const config = DEFAULT_UPLOAD_CONFIG;
      const validationResults = validationService.validateMultiple(
        files,
        config,
      );

      // 검증 실패한 파일들의 오류 메시지 토스트로 표시
      const invalidResults = validationResults.filter(
        result => !result.isValid,
      );
      if (invalidResults.length > 0) {
        const errorMessages =
          FileValidationService.formatValidationErrors(invalidResults);
        errorMessages.forEach(message => toast.error(message));

        onValidationError?.(validationResults);
        return validationResults;
      }

      // 경고 메시지 표시
      const warningMessages =
        FileValidationService.formatValidationWarnings(validationResults);
      warningMessages.forEach(message => toast.warning(message));

      return validationResults;
    },
    [onValidationError, validationService],
  );

  // 업로드 mutation (단순화)
  const { mutate: executeUpload, isPending } = useMutation({
    mutationFn: async (files: File[]): Promise<UploadResult[]> => {
      if (validateBeforeUpload) {
        const validationResults = validateFiles(files);
        const validFiles = validationResults
          .filter(result => result.isValid)
          .map(result => result.fileInfo.file);

        if (validFiles.length === 0) {
          throw new UploadError(
            '업로드할 유효한 파일이 없습니다.',
            'NO_VALID_FILES',
          );
        }

        if (validFiles.length !== files.length) {
          toast.warning(
            `${files.length - validFiles.length}개 파일이 검증에 실패하여 제외되었습니다.`,
          );
        }

        files = validFiles;
      }

      const results =
        uploadMode === 'parallel'
          ? await uploadService.uploadFilesParallel(files)
          : await uploadService.uploadFiles(files);

      return results;
    },
    onSuccess: results => {
      setLastUploadResults(results);
      onUploadComplete?.(results);
    },
    onError: error => {
      onUploadError?.(error);
      toast.error(error.message);
    },
  });

  // 편의 메서드들
  const uploadFiles = useCallback(
    (files: File[]) => {
      if (files.length === 0) {
        toast.error('업로드할 파일을 선택해주세요.');
        return;
      }

      setLastUploadResults([]); // 이전 결과 초기화
      executeUpload(files);
    },
    [executeUpload],
  );

  const uploadSingleFile = useCallback(
    (file: File) => {
      uploadFiles([file]);
    },
    [uploadFiles],
  );

  // URL 유효성 검증
  const validateUploadedUrls = useCallback(
    async (urls: string[]) => {
      const validationPromises = urls.map(url =>
        uploadService.validateUploadedFile(url),
      );
      const results = await Promise.all(validationPromises);

      const invalidUrls = urls.filter((_, index) => !results[index]);
      if (invalidUrls.length > 0) {
        toast.error(
          `${invalidUrls.length}개 업로드된 파일에 접근할 수 없습니다.`,
        );
        return false;
      }

      return true;
    },
    [uploadService],
  );

  // 업로드 통계
  const getUploadStatistics = useCallback(
    (results: UploadResult[]) => {
      if (results.length === 0) {
        return null;
      }

      return uploadService.calculateUploadStats(results);
    },
    [uploadService],
  );

  // 결과에서 URL만 추출하는 유틸리티
  const getUploadedUrls = useCallback((results: UploadResult[]) => {
    return results.map(result => result.url);
  }, []);

  // 파일 타입별 URL 분류
  const getUrlsByType = useCallback((results: UploadResult[]) => {
    const videoUrls: string[] = [];
    const imageUrls: string[] = [];

    results.forEach(result => {
      if (result.fileType.startsWith('video/')) {
        videoUrls.push(result.url);
      } else if (result.fileType.startsWith('image/')) {
        imageUrls.push(result.url);
      }
    });

    return { videoUrls, imageUrls };
  }, []);

  // 초기화
  const reset = useCallback(() => {
    setLastUploadResults([]);
  }, []);

  return {
    // 업로드 실행
    uploadFiles,
    uploadSingleFile,

    // 상태
    isUploading: isPending,
    lastUploadResults,

    // 유틸리티
    validateFiles,
    validateUploadedUrls,
    getUploadStatistics,
    getUploadedUrls,
    getUrlsByType,

    // 액션
    reset,
  };
}
