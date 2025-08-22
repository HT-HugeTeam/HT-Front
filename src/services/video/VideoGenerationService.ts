import type {
  CreateVideoGenerationRequest,
  CreateVideoGenerationResponse,
  VideoGenerationStatusResponse,
  ImageRequestDto,
  VideoRequestDto,
} from '../../types/api';
import {
  createVideoGeneration,
  getVideoGenerationStatus,
} from '../../lib/api/video/video';
import type { AxiosResponse } from 'axios';

export interface VideoGenerationInput {
  text: string;
  images: File[];
  videos: File[];
  storeId: string;
}

export interface PollingOptions {
  interval?: number; // 폴링 간격 (ms)
  maxAttempts?: number; // 최대 폴링 횟수
  onStatusUpdate?: (status: VideoGenerationStatusResponse) => void;
}

export class VideoGenerationService {
  private static instance: VideoGenerationService;

  public static getInstance(): VideoGenerationService {
    if (!VideoGenerationService.instance) {
      VideoGenerationService.instance = new VideoGenerationService();
    }
    return VideoGenerationService.instance;
  }

  private constructor() {}

  /**
   * 영상 생성 요청 후 상태 폴링까지 처리하는 통합 메서드
   */
  async generateVideo(
    input: VideoGenerationInput,
    options?: PollingOptions,
  ): Promise<VideoGenerationStatusResponse> {
    try {
      // 1. 파일들을 S3에 업로드하고 URL 얻기
      const [imageUrls, videoUrls] = await Promise.all([
        this.uploadFiles(input.images, 'image'),
        this.uploadFiles(input.videos, 'video'),
      ]);

      // 2. 영상 생성 요청
      const generationRequest: CreateVideoGenerationRequest = {
        text: input.text,
        images: imageUrls,
        videos: videoUrls,
        storeId: input.storeId,
      };

      const response: AxiosResponse<CreateVideoGenerationResponse> =
        await createVideoGeneration(generationRequest);

      const generationId = response.data.id;

      // 3. 상태 폴링 시작
      return this.pollVideoGenerationStatus(generationId, options);
    } catch (error) {
      console.error('영상 생성 중 오류 발생:', error);
      throw error;
    }
  }

  /**
   * 영상 생성 상태를 폴링하여 완료될 때까지 대기
   */
  async pollVideoGenerationStatus(
    generationId: string,
    options?: PollingOptions,
  ): Promise<VideoGenerationStatusResponse> {
    const interval = options?.interval ?? 3000; // 기본 3초
    const maxAttempts = options?.maxAttempts ?? 100; // 기본 5분 (3초 * 100)

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response: AxiosResponse<VideoGenerationStatusResponse> =
          await getVideoGenerationStatus(generationId);

        const status = response.data;
        options?.onStatusUpdate?.(status);

        // 완료 상태 체크
        if (status.status === 'COMPLETED') {
          return status;
        }

        // 실패 상태 체크
        if (status.status === 'FAILED') {
          throw new Error(`영상 생성 실패: ${status.errorMessage || '알 수 없는 오류'}`);
        }

        // 다음 폴링까지 대기
        if (attempt < maxAttempts - 1) {
          await this.delay(interval);
        }
      } catch (error) {
        console.error(`폴링 시도 ${attempt + 1} 실패:`, error);
        if (attempt === maxAttempts - 1) {
          throw error;
        }
        await this.delay(interval);
      }
    }

    throw new Error('영상 생성 상태 확인 시간 초과');
  }

  /**
   * 파일들을 S3에 업로드하고 API 요청용 객체로 변환
   */
  private async uploadFiles(
    files: File[],
    type: 'image' | 'video',
  ): Promise<ImageRequestDto[] | VideoRequestDto[]> {
    if (files.length === 0) return [];

    // 각 파일을 S3에 업로드
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`파일 업로드 실패: ${file.name}`);
      }

      const result = await response.json() as { url: string };
      return {
        url: result.url,
        originalName: file.name,
      };
    });

    return Promise.all(uploadPromises);
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}