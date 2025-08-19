'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { FileValidationService } from '@/services/upload/FileValidationService';
import { DEFAULT_UPLOAD_CONFIG } from '@/services/upload/types';

interface FilePreview {
  file: File;
  url: string;
  type: 'image' | 'video';
}

interface UseFileSelectionOptions {
  allowedTypes?: ('image' | 'video')[];
  maxSize?: number;
  maxFiles?: number;
  onFileSelect?: (files: File[]) => void;
  onPreviewsChange?: (previews: FilePreview[]) => void;
}

export function useFileSelection(options: UseFileSelectionOptions = {}) {
  const {
    allowedTypes = ['image', 'video'],
    maxSize = 50 * 1024 * 1024, // 50MB
    maxFiles = 10,
    onFileSelect,
    onPreviewsChange,
  } = options;

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<FilePreview[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 서비스 레이어 사용
  const validationService = FileValidationService.getInstance();

  const validateFile = (file: File): boolean => {
    // 서비스 레이어로 검증 로직 위임
    const config = {
      ...DEFAULT_UPLOAD_CONFIG,
      allowedTypes: allowedTypes.map(type =>
        type === 'image' ? 'image' : type === 'video' ? 'video' : 'document',
      ) as ('image' | 'video' | 'document')[],
      maxFileSize: maxSize,
      maxFiles,
    };

    const result = validationService.validate(file, config);

    if (!result.isValid) {
      if (result.errors.length > 0) {
        toast.error(result.errors[0]);
      }
      return false;
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach(warning => toast.warning(warning));
    }

    return true;
  };

  const addFiles = (newFiles: File[]) => {
    // 전체 파일 목록 (기존 + 새로운)으로 검증
    const allFiles = [...selectedFiles, ...newFiles];

    // 서비스 레이어로 다중 파일 검증 (중복 체크 포함)
    const config = {
      ...DEFAULT_UPLOAD_CONFIG,
      allowedTypes: allowedTypes.map(type =>
        type === 'image' ? 'image' : type === 'video' ? 'video' : 'document',
      ) as ('image' | 'video' | 'document')[],
      maxFileSize: maxSize,
      maxFiles,
    };

    const validationResults = validationService.validateMultiple(
      allFiles,
      config,
    );

    // 새로운 파일들에 대한 검증 결과만 확인
    const newFileResults = validationResults.slice(selectedFiles.length);
    const validNewFiles = newFiles.filter(
      (_, index) => newFileResults[index]?.isValid,
    );

    // 검증 실패한 파일들의 에러 메시지 표시
    newFileResults.forEach((result, index) => {
      if (!result.isValid) {
        result.errors.forEach(error =>
          toast.error(`${newFiles[index]?.name}: ${error}`),
        );
      }
    });

    if (validNewFiles.length === 0) {
      return;
    }

    // 미리보기 생성
    const newPreviews = validNewFiles.map(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/')
        ? 'image'
        : ('video' as 'image' | 'video');
      return { file, url, type };
    });

    const updatedFiles = [...selectedFiles, ...validNewFiles];
    const updatedPreviews: FilePreview[] = [...previews, ...newPreviews];

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFileSelect?.(updatedFiles);
    onPreviewsChange?.(updatedPreviews);
  };

  const removeFile = (index: number) => {
    // Object URL 메모리 해제
    if (previews[index]?.url) {
      URL.revokeObjectURL(previews[index].url);
    }

    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFileSelect?.(updatedFiles);
    onPreviewsChange?.(updatedPreviews);
  };

  const clearAll = () => {
    // 모든 Object URL 메모리 해제
    previews.forEach(preview => URL.revokeObjectURL(preview.url));

    setSelectedFiles([]);
    setPreviews([]);
    onFileSelect?.([]);
    onPreviewsChange?.([]);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 파일 타입 확인
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

  // 드래그앤드롭 핸들러들
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      addFiles(files);
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
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) {
      addFiles(files);
    }
    // input 값 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = '';
  };

  // 메모리 정리
  useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  return {
    // State
    selectedFiles,
    previews,
    dragActive,
    fileInputRef,

    // Actions
    addFiles,
    removeFile,
    clearAll,
    openFileDialog,

    // Handlers
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleChange,

    // Utils
    getAcceptTypes,
    validateFile,
  };
}
