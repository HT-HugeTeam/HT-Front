// hooks/use-file-selection.ts
'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

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
      toast.error(`${allowedTypes.join(', ')} 파일만 선택할 수 있습니다.`);
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

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);

    if (selectedFiles.length + validFiles.length > maxFiles) {
      toast.error(`최대 ${maxFiles}개의 파일만 선택할 수 있습니다.`);
      return;
    }

    // 중복 파일 체크 (이름과 크기로 비교)
    const uniqueFiles = validFiles.filter(
      newFile =>
        !selectedFiles.some(
          existingFile =>
            existingFile.name === newFile.name &&
            existingFile.size === newFile.size,
        ),
    );

    if (uniqueFiles.length === 0) {
      toast.error('이미 선택된 파일입니다.');
      return;
    }

    // 미리보기 생성
    const newPreviews = uniqueFiles.map(file => {
      const url = URL.createObjectURL(file);
      const type = file.type.startsWith('image/')
        ? 'image'
        : ('video' as 'image' | 'video');
      return { file, url, type };
    });

    const updatedFiles = [...selectedFiles, ...uniqueFiles];
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
    const files = Array.from(e.target.files || []);
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
  }, []);

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
