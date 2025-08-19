// lib/stores/file-upload-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
  result?: {
    success: boolean;
    url: string;
    fileName: string;
    fileSize: number;
    fileType: string;
  };
}

export interface VideoCreationStatus {
  isCreating: boolean;
  progress: number;
  status: 'idle' | 'uploading' | 'creating' | 'completed' | 'error';
  createdVideoUrl?: string;
  error?: string;
}

export interface UploadStats {
  total: number;
  completed: number;
  failed: number;
  uploading: number;
  percentage: number;
  isAllCompleted: boolean;
  hasErrors: boolean;
}

const computeUploadStats = (progressList: UploadProgress[]): UploadStats => {
  const total = progressList.length;
  const completed = progressList.filter(p => p.status === 'completed').length;
  const failed = progressList.filter(p => p.status === 'error').length;
  const uploading = progressList.filter(p => p.status === 'uploading').length;
  return {
    total,
    completed,
    failed,
    uploading,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    isAllCompleted: total > 0 && completed === total,
    hasErrors: failed > 0,
  };
};

interface FileUploadStore {
  // 업로드 진행 상태
  uploadProgress: UploadProgress[];
  isUploading: boolean;
  uploadStats: UploadStats;

  // 영상 제작 상태
  videoCreation: VideoCreationStatus;

  // Actions
  setUploadProgress: (progress: UploadProgress[]) => void;
  updateUploadProgress: (
    fileName: string,
    update: Partial<UploadProgress>,
  ) => void;
  setIsUploading: (isUploading: boolean) => void;
  resetUploadProgress: () => void;

  // 영상 제작 관련 Actions
  setVideoCreationStatus: (status: Partial<VideoCreationStatus>) => void;
  startVideoCreation: () => void;
  completeVideoCreation: (videoUrl: string) => void;
  resetVideoCreation: () => void;

  // 전체 초기화
  resetAll: () => void;
}

export const useFileUploadStore = create<FileUploadStore>()(
  devtools(
    set => ({
      // Initial state
      uploadProgress: [],
      isUploading: false,
      uploadStats: computeUploadStats([]),
      videoCreation: {
        isCreating: false,
        progress: 0,
        status: 'idle',
      },

      // Upload progress actions
      setUploadProgress: (progress: UploadProgress[]) =>
        set(
          {
            uploadProgress: progress,
            uploadStats: computeUploadStats(progress),
          },
          false,
          'setUploadProgress',
        ),

      updateUploadProgress: (
        fileName: string,
        update: Partial<UploadProgress>,
      ) =>
        set(
          state => {
            const nextProgress = state.uploadProgress.map(item =>
              item.fileName === fileName ? { ...item, ...update } : item,
            );
            return {
              uploadProgress: nextProgress,
              uploadStats: computeUploadStats(nextProgress),
            };
          },
          false,
          'updateUploadProgress',
        ),

      setIsUploading: (isUploading: boolean) =>
        set({ isUploading }, false, 'setIsUploading'),

      resetUploadProgress: () =>
        set(
          {
            uploadProgress: [],
            isUploading: false,
            uploadStats: computeUploadStats([]),
          },
          false,
          'resetUploadProgress',
        ),

      // Video creation actions
      setVideoCreationStatus: (status: Partial<VideoCreationStatus>) =>
        set(
          state => ({
            videoCreation: { ...state.videoCreation, ...status },
          }),
          false,
          'setVideoCreationStatus',
        ),

      startVideoCreation: () =>
        set(
          {
            videoCreation: {
              isCreating: true,
              progress: 0,
              status: 'creating',
            },
          },
          false,
          'startVideoCreation',
        ),

      completeVideoCreation: (videoUrl: string) =>
        set(
          {
            videoCreation: {
              isCreating: false,
              progress: 100,
              status: 'completed',
              createdVideoUrl: videoUrl,
            },
          },
          false,
          'completeVideoCreation',
        ),

      resetVideoCreation: () =>
        set(
          {
            videoCreation: {
              isCreating: false,
              progress: 0,
              status: 'idle',
            },
          },
          false,
          'resetVideoCreation',
        ),

      // Reset all
      resetAll: () =>
        set(
          {
            uploadProgress: [],
            isUploading: false,
            uploadStats: computeUploadStats([]),
            videoCreation: {
              isCreating: false,
              progress: 0,
              status: 'idle',
            },
          },
          false,
          'resetAll',
        ),
    }),
    {
      name: 'file-upload-store',
    },
  ),
);

// Selectors for easy access
export const useUploadProgress = () =>
  useFileUploadStore(state => state.uploadProgress);

export const useIsUploading = () =>
  useFileUploadStore(state => state.isUploading);

export const useVideoCreationStatus = () =>
  useFileUploadStore(state => state.videoCreation);

// Computed selectors (memoized in store)
export const useUploadStats = () =>
  useFileUploadStore(state => state.uploadStats);
