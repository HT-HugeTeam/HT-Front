'use client';

// 숏폴링 훅

import { useState, useEffect } from 'react';
import { getVideoGenerationStatus } from '@/lib/api/video/video';

export function useVideoGeneration(initialGenerationId?: string) {
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(
    null,
  );
  const [generatedVideoId, setGeneratedVideoId] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'IDLE' | 'IN_PROGRESS' | 'FINISHED' | 'FAILED'
  >('IDLE');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (initialGenerationId) {
      // 새로운 ID가 들어오면 로컬스토리지에 저장
      localStorage.setItem('activeVideoGeneration', initialGenerationId);
      setGenerationId(initialGenerationId);
    } else {
      // ID가 없으면 로컬스토리지에서 복원
      const saved = localStorage.getItem('activeVideoGeneration');
      if (saved) {
        setGenerationId(saved);
      }
    }
  }, [initialGenerationId]);
  useEffect(() => {
    if (!generationId) return;

    const poll = async () => {
      try {
        const result = await getVideoGenerationStatus(generationId);
        setStatus(result.status ?? 'IDLE');
        setGeneratedVideoUrl(result.generatedVideoUrl ?? null);
        setGeneratedVideoId(result.video?.id ?? null);
        localStorage.setItem('generatedVideoId', result.video?.id ?? '');

        // 상태별 프로그레스
        const progressMap = {
          IDLE: 33,
          IN_PROGRESS: 66,
          FINISHED: 100,
          FAILED: 0,
        };
        setProgress(progressMap[result.status ?? 'IDLE']);

        if (['FINISHED', 'FAILED'].includes(result.status ?? 'IDLE')) {
          localStorage.removeItem('activeVideoGeneration');
          return true;
        }

        return false;
      } catch (error) {
        setStatus('FAILED');
        return true;
      }
    };

    const interval = setInterval(() => {
      void poll().then(shouldStop => {
        if (shouldStop) clearInterval(interval);
      });
    }, 5000);

    void poll(); // 즉시 실행
    return () => clearInterval(interval);
  }, [generationId]);

  return {
    status,
    progress,
    hasActiveGeneration: !!generationId,
    generatedVideoUrl: generatedVideoUrl,
    generatedVideoId: generatedVideoId,
  };
}
