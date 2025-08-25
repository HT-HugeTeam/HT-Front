import { PutObjectCommand } from '@aws-sdk/client-s3';
import type { IUploadService, UploadResult, UploadOptions } from './types';
import { DEFAULT_UPLOAD_CONFIG, UploadError } from './types';
import { BUCKET_NAME, serverS3Client } from '@/lib/utils/server-s3-client';

export class UploadService implements IUploadService {
  private static instance: UploadService;

  public static getInstance(): UploadService {
    if (!UploadService.instance) {
      UploadService.instance = new UploadService();
    }
    return UploadService.instance;
  }

  private constructor() {
    // 싱글톤 패턴을 위한 빈 생성자
  }

  /**
   * 단일 파일 업로드
   */
  async uploadSingle(file: File): Promise<UploadResult> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      const file = formData.get('file') as File;
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type.startsWith('image/') ? 'images' : 'videos';
      const key = `uploads/${fileType}/${timestamp}-${randomString}.${fileExtension}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      // S3에 업로드
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        Metadata: {
          originalName: Buffer.from(file.name, 'utf-8').toString('base64'),
          uploadedAt: new Date().toISOString(),
        },
      });
      await serverS3Client.send(command);

      // public URL 생성
      const publicUrl = `https://${BUCKET_NAME}.s3.ap-southeast-2.amazonaws.com/${key}`;

      const result = {
        success: true,
        url: publicUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      };

      // if (!response.ok) {
      //   const errorData = await response.json() as { error?: string };
      //   throw new UploadError(
      //     errorData.error ?? '업로드에 실패했습니다.',
      //     'UPLOAD_FAILED',
      //     file.name,
      //   );
      // }

      // const result = await response.json() as {
      //   url: string;
      //   fileName: string;
      //   fileSize: number;
      //   fileType: string;
      //   metadata?: Record<string, unknown>;
      // };

      return {
        success: true,
        url: result.url,
        fileName: result.fileName,
        fileSize: result.fileSize,
        fileType: result.fileType,
        uploadTime: Date.now(),
      };
    } catch (error) {
      if (error instanceof UploadError) {
        throw error;
      }

      throw new UploadError(
        '업로드 중 오류가 발생했습니다.',
        'UPLOAD_ERROR',
        file.name,
        error as Error,
      );
    }
  }

  /**
   * 다중 파일 업로드 (순차 처리) - Progress 제거된 단순 버전
   */
  async uploadFiles(
    files: File[],
    options?: UploadOptions,
  ): Promise<UploadResult[]> {
    const config = { ...DEFAULT_UPLOAD_CONFIG, ...options?.config };
    const results: UploadResult[] = [];
    const errors: Error[] = [];

    for (const file of files) {
      try {
        const result = await this.uploadSingleWithRetry(
          file,
          config.retryAttempts,
          config.retryDelay,
        );
        results.push(result);
      } catch (error) {
        errors.push(error as Error);
        console.error(`파일 업로드 실패: ${file.name}`, error);
      }
    }

    // 최종 결과 처리
    if (results.length === 0) {
      const error = new UploadError(
        '모든 파일 업로드가 실패했습니다.',
        'ALL_UPLOADS_FAILED',
      );
      options?.onError?.(error);
      throw error;
    }

    if (errors.length > 0) {
      console.warn(
        `${errors.length}개 파일 업로드 실패, ${results.length}개 성공`,
      );
    }

    options?.onSuccess?.(results);
    return results;
  }

  /**
   * 병렬 업로드 (성능 최적화용) - Progress 제거된 단순 버전
   */
  async uploadFilesParallel(
    files: File[],
    options?: UploadOptions,
  ): Promise<UploadResult[]> {
    const config = { ...DEFAULT_UPLOAD_CONFIG, ...options?.config };

    try {
      const uploadPromises = files.map(file =>
        this.uploadSingleWithRetry(
          file,
          config.retryAttempts,
          config.retryDelay,
        ),
      );

      const results = await Promise.all(uploadPromises);
      options?.onSuccess?.(results);
      return results;
    } catch (error) {
      const uploadError = new UploadError(
        '병렬 업로드 중 오류가 발생했습니다.',
        'PARALLEL_UPLOAD_ERROR',
        undefined,
        error as Error,
      );
      options?.onError?.(uploadError);
      throw uploadError;
    }
  }

  /**
   * 재시도 로직이 포함된 단일 파일 업로드
   */
  private async uploadSingleWithRetry(
    file: File,
    maxRetries: number,
    retryDelay: number,
  ): Promise<UploadResult> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await this.uploadSingle(file);
      } catch (error) {
        lastError = error as Error;

        if (attempt < maxRetries) {
          await this.delay(retryDelay * (attempt + 1));
          console.warn(
            `파일 업로드 재시도 ${attempt + 1}/${maxRetries}: ${file.name}`,
          );
        }
      }
    }

    throw (
      lastError ?? new UploadError('업로드 실패', 'UPLOAD_FAILED', file.name)
    );
  }

  /**
   * 지연 함수
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 파일 URL 검증 (업로드된 파일이 접근 가능한지 확인)
   */
  async validateUploadedFile(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  /**
   * 업로드 통계 정보 계산
   */
  calculateUploadStats(results: UploadResult[]): {
    totalFiles: number;
    totalSize: number;
    totalTime: number;
    averageFileSize: number;
    averageUploadTime: number;
  } {
    const totalFiles = results.length;
    const totalSize = results.reduce((sum, result) => sum + result.fileSize, 0);
    const totalTime = results.reduce(
      (sum, result) => sum + result.uploadTime,
      0,
    );

    return {
      totalFiles,
      totalSize,
      totalTime,
      averageFileSize: totalFiles > 0 ? totalSize / totalFiles : 0,
      averageUploadTime: totalFiles > 0 ? totalTime / totalFiles : 0,
    };
  }
}
