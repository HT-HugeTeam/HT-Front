import { useState, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { VideoGenerationService, type VideoGenerationInput, type PollingOptions } from '../services/video/VideoGenerationService';
import type { VideoGenerationStatusResponse } from '../types/api';

interface UseVideoGenerationOptions {
  onSuccess?: (result: VideoGenerationStatusResponse) => void;
  onError?: (error: Error) => void;
  onStatusUpdate?: (status: VideoGenerationStatusResponse) => void;
  pollingOptions?: PollingOptions;
}

export function useVideoGeneration(options?: UseVideoGenerationOptions) {
  const [currentStatus, setCurrentStatus] = useState<VideoGenerationStatusResponse | null>(null);
  const videoService = VideoGenerationService.getInstance();

  // 영상 생성 뮤테이션
  const generateVideoMutation = useMutation({
    mutationFn: async (input: VideoGenerationInput) => {
      return videoService.generateVideo(input, {
        ...options?.pollingOptions,
        onStatusUpdate: (status) => {
          setCurrentStatus(status);
          options?.onStatusUpdate?.(status);
        },
      });
    },
    onSuccess: (result) => {
      setCurrentStatus(result);
      options?.onSuccess?.(result);
    },
    onError: (error: Error) => {
      console.error('영상 생성 오류:', error);
      options?.onError?.(error);
    },
  });

  // 영상 생성 시작
  const generateVideo = useCallback(
    (input: VideoGenerationInput) => {
      setCurrentStatus(null);
      return generateVideoMutation.mutate(input);
    },
    [generateVideoMutation],
  );

  // 영상 생성 상태 폴링 (독립적으로 사용할 때)
  const pollStatus = useCallback(
    async (generationId: string) => {
      try {
        const result = await videoService.pollVideoGenerationStatus(generationId, {
          ...options?.pollingOptions,
          onStatusUpdate: (status) => {
            setCurrentStatus(status);
            options?.onStatusUpdate?.(status);
          },
        });
        setCurrentStatus(result);
        return result;
      } catch (error) {
        console.error('상태 폴링 오류:', error);
        throw error;
      }
    },
    [videoService, options],
  );

  return {
    // 상태
    isGenerating: generateVideoMutation.isPending,
    isError: generateVideoMutation.isError,
    error: generateVideoMutation.error,
    currentStatus,
    
    // 액션
    generateVideo,
    pollStatus,
    
    // 유틸리티
    reset: () => {
      generateVideoMutation.reset();
      setCurrentStatus(null);
    },
  };
}

// 특정 영상 생성 상태를 조회하는 쿼리 훅
export function useVideoGenerationStatus(
  generationId: string | null,
  options?: {
    enabled?: boolean;
    refetchInterval?: number;
  },
) {
  const videoService = VideoGenerationService.getInstance();

  return useQuery({
    queryKey: ['videoGenerationStatus', generationId],
    queryFn: async () => {
      if (!generationId) throw new Error('Generation ID is required');
      const response = await videoService.pollVideoGenerationStatus(generationId, {
        maxAttempts: 1, // 단일 조회만
      });
      return response;
    },
    enabled: !!generationId && (options?.enabled ?? true),
    refetchInterval: options?.refetchInterval ?? 3000, // 3초마다 자동 갱신
    refetchIntervalInBackground: false,
  });
}