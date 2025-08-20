export type FileType = 'image' | 'video' | 'document';
export type UploadStatus = 'pending' | 'uploading' | 'completed' | 'failed';
export type VideoGenerationStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

// 기본 파일 정보
export interface FileInfo {
  file: File;
  id: string;
  type: FileType;
  size: number;
  name: string;
  lastModified: number;
}

// 업로드 결과
export interface UploadResult {
  success: boolean;
  url: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadTime: number;
  metadata?: Record<string, unknown>;
}

// 영상 생성 요청 데이터
export interface VideoGenerationRequest {
  storeInfo: {
    storeName: string;
    storeAddress: string;
    storeDescription: string;
    storeMenu: string[];
    storeNaverMap?: string;
  };
  fileUrls: {
    videoUrls: string[];
    imageUrls: Record<string, string>; // menuName -> imageUrl
  };
}

// 영상 생성 응답
export interface VideoGenerationResponse {
  generationId: string;
  status: VideoGenerationStatus;
  message?: string;
  estimatedTime?: number; // seconds
}

// 영상 생성 상태 조회 응답
export interface VideoGenerationStatusResponse {
  generationId: string;
  status: VideoGenerationStatus;
  progress: number; // 0-100
  message?: string;
  videoUrl?: string; // completed일 때만
  thumbnailUrl?: string; // completed일 때만
  error?: string; // failed일 때만
  estimatedTimeRemaining?: number; // seconds
  createdAt: string;
  updatedAt: string;
}

// 파일 검증 결과
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  fileInfo: FileInfo;
}

// 업로드 설정
export interface UploadConfig {
  maxFileSize: number;
  allowedTypes: FileType[];
  maxFiles: number;
  retryAttempts: number;
  retryDelay: number;
  validateBeforeUpload: boolean;
}

// 업로드 옵션
export interface UploadOptions {
  onSuccess?: (results: UploadResult[]) => void;
  onError?: (error: Error) => void;
  config?: Partial<UploadConfig>;
}

// 영상 생성 옵션
export interface VideoGenerationOptions {
  pollingInterval?: number; // milliseconds, default: 3000
  maxPollingTime?: number; // milliseconds, default: 300000 (5 minutes)
  onStatusUpdate?: (status: VideoGenerationStatusResponse) => void;
  onProgress?: (progress: number) => void;
  onComplete?: (result: VideoGenerationStatusResponse) => void;
  onError?: (error: Error) => void;
}

// 서비스 인터페이스들
export interface IUploadService {
  uploadFiles(files: File[], options?: UploadOptions): Promise<UploadResult[]>;
  uploadSingle(file: File): Promise<UploadResult>;
}

export interface IVideoGenerationService {
  createVideoGeneration(
    request: VideoGenerationRequest,
  ): Promise<VideoGenerationResponse>;
  getGenerationStatus(
    generationId: string,
  ): Promise<VideoGenerationStatusResponse>;
  pollGenerationStatus(
    generationId: string,
    options?: VideoGenerationOptions,
  ): Promise<VideoGenerationStatusResponse>;
  cancelGeneration?(generationId: string): Promise<void>;
}

export interface IFileValidator {
  validate(file: File, config: UploadConfig): ValidationResult;
  validateMultiple(files: File[], config: UploadConfig): ValidationResult[];
}

// 통합 워크플로우 결과
export interface VideoCreationWorkflowResult {
  uploadResults: UploadResult[];
  generationId: string;
  finalStatus: VideoGenerationStatusResponse;
}

// 에러 타입들
export class UploadError extends Error {
  constructor(
    message: string,
    public code: string,
    public fileId?: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'UploadError';
  }
}

export class ValidationError extends UploadError {
  constructor(message: string, fileId?: string) {
    super(message, 'VALIDATION_ERROR', fileId);
    this.name = 'ValidationError';
  }
}

export class VideoGenerationError extends Error {
  constructor(
    message: string,
    public code: string,
    public generationId?: string,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'VideoGenerationError';
  }
}

// 기본 설정들
export const DEFAULT_UPLOAD_CONFIG: UploadConfig = {
  maxFileSize: 50 * 1024 * 1024, // 50MB
  allowedTypes: ['image', 'video'],
  maxFiles: 10,
  retryAttempts: 3,
  retryDelay: 1000,
  validateBeforeUpload: true,
};

export const DEFAULT_VIDEO_GENERATION_OPTIONS: VideoGenerationOptions = {
  pollingInterval: 3000, // 3 seconds
  maxPollingTime: 300000, // 5 minutes
};

// 파일 타입별 설정
export const FILE_TYPE_CONFIGS: Record<FileType, Partial<UploadConfig>> = {
  image: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image'],
  },
  video: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video'],
  },
  document: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['document'],
  },
};
