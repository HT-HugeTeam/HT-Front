import { FieldContainer } from '@/components/store-info';
import { useManualUpload } from '@/hooks/use-manual-upload';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { VideoUploadCard } from './video-upload-card';
import { ImageUploadCard } from '@/components/image-upload-card';
import { useMakeVideoQuery } from '@/hooks/use-make-video-query';
import MakeVideoStartIcon from '@/public/svg/make-video/make-video-start.svg';
import { GradientProgressBar } from '@/components/gradient-progress-bar';
import {
  useFileUploadStore,
  useUploadStats,
  useVideoCreationStatus,
} from '@/lib/stores/file-upload-store';
import { useRouter } from 'next/navigation';
import { useStoreDetail } from '@/hooks/queries/use-store-detail';
import { StoreDetail } from '@/types/mypage/store-detail.types';

export const StoreField = [
  {
    label: '상호명',
    value: 'storeName',
  },
  {
    label: '주소',
    value: 'storeAddress',
  },
  {
    label: '소개',
    value: 'storeDescription',
  },
];

/**
 * Main Components (line 27)
 * - StoreDetailUI
 */
export function MakeVideoInputUi() {
  const router = useRouter();
  const { fileUpload, setFileUpload } = useMakeVideoQuery();

  // TanStack Query로 StoreDetail 가져오기
  const { data: storeDetail } = useStoreDetail('donkatsu');

  // 전역 store 사용
  const uploadStats = useUploadStats();
  const videoCreationStatus = useVideoCreationStatus();
  const { startVideoCreation, completeVideoCreation, resetUploadProgress } =
    useFileUploadStore();

  // storeDetail이 없으면 렌더링하지 않음 (상위에서 처리됨)
  if (!storeDetail) return null;

  // 동영상 파일들 관리
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);

  // 메뉴별 이미지 파일들 관리 (메뉴명을 키로 사용)
  const [selectedMenuImages, setSelectedMenuImages] = useState<
    Record<string, File | null>
  >({});

  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // 프로그레스 바 애니메이션 상태 (업로드 완료 후 영상 제작 진행바용)
  const [progress, setProgress] = useState(0);

  const { uploadFiles, uploadProgress, isUploading, resetProgress } =
    useManualUpload({
      onAllComplete: results => {
        const urls = results.map(result => result.url);
        setUploadedUrls(prev => [...prev, ...urls]);
        toast.success(`${results.length}개 파일 업로드 완료!`);
        setSelectedVideoFiles([]); // 동영상 파일 초기화
        setSelectedMenuImages({}); // 메뉴 이미지들 초기화

        // 업로드 완료 후 영상 제작 시작
        startVideoCreation();

        resetProgress();
      },
      onError: error => {
        toast.error(error.message);
      },
      onProgress: progress => {
        console.log('Upload progress:', progress);
      },
    });

  const handleVideoFileSelect = (files: File[]) => {
    setSelectedVideoFiles(files);
  };

  const handleMenuImageSelect = (menuName: string) => (file: File | null) => {
    setSelectedMenuImages(prev => ({
      ...prev,
      [menuName]: file,
    }));
  };

  const handleUpload = () => {
    // 선택된 모든 파일들을 하나의 배열로 합치기
    const allFiles: File[] = [
      ...selectedVideoFiles,
      ...Object.values(selectedMenuImages).filter(
        (file): file is File => file !== null,
      ),
    ];

    if (allFiles.length === 0) {
      toast.error('업로드할 파일을 선택해주세요.');
      return;
    }
    uploadFiles(allFiles);
  };

  const clearUploadedFiles = () => {
    setUploadedUrls([]);
  };

  // 프로그레스 바 애니메이션 효과 (3초 동안 1초마다 33.33%씩 증가)
  useEffect(() => {
    if (fileUpload) {
      setProgress(0); // 초기화

      // 1초마다 프로그레스 업데이트
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            // TODO: 3초 후 페이지 이동 로직 추가
            router.push('/mypage/manage-video');
            return 100;
          }
          return prev + 33.33; // 1초마다 33.33% 증가 (3초에 100%)
        });
      }, 1000);

      // 3초 후 정확히 100%로 설정하고 정리
      const timeout = setTimeout(() => {
        setProgress(100);
        clearInterval(interval);
        // TODO: 여기에 페이지 이동 로직 추가
        void setFileUpload(false);
        console.log('3초 완료! 페이지 이동 실행');
      }, 3000);

      // 컴포넌트 언마운트 시 정리
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [fileUpload, router, setFileUpload]);

  if (fileUpload) {
    return (
      <div className='w-full h-full flex-center'>
        <div className='flex-center flex-col gap-4'>
          <MakeVideoStartIcon />
          <p className='text-headlineSmall text-black000 text-center'>
            쇼츠테이블 AI가
            <br />
            영상 제작을 시작했어요!
          </p>
          <GradientProgressBar progress={progress} />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 상호명, 주소, 소개 */}
      {StoreField.map(field => (
        <FieldContainer
          key={field.label}
          label={field.label}
          value={storeDetail[field.value as keyof StoreDetail] as string}
        />
      ))}

      {/* 가게 영상 입력 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500 flex items-center '>
          가게 영상 (n개 이하)
        </h4>
        <VideoUploadCard
          onFileSelect={handleVideoFileSelect}
          maxSize={50 * 1024 * 1024}
          maxFiles={10}
        />
      </div>

      {/* 메뉴 사진 입력 */}
      <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500 flex items-center '>
          메뉴
        </h4>
        <div className='flex gap-2'>
          {storeDetail.storeMenu.map(menu => (
            <ImageUploadCard
              key={menu}
              onFileSelect={handleMenuImageSelect(menu)}
              maxSize={10 * 1024 * 1024} // 이미지는 10MB 제한
              menuName={menu}
            />
          ))}
        </div>
      </div>

      <FieldContainer
        label='네이버 지도 연결'
        value={storeDetail?.storeNaverMap ?? ''}
      />

      {/* 업로드 버튼 + position fixed */}
      <div className='px-6 pb-4 fixed bottom-20 left-0 right-0 mobile-area h-18 bg-white'>
        <button
          onClick={() => {
            void setFileUpload(true);
            void handleUpload();
          }}
          disabled={
            (selectedVideoFiles.length === 0 &&
              Object.values(selectedMenuImages).every(file => file === null)) ||
            isUploading
          }
          className='w-full h-full flex-center bg-orange400 rounded-[15px] text-bodySmall text-white000 cursor-pointer disabled:bg-gray400 disabled:cursor-not-allowed'
        >
          다음
        </button>
      </div>
    </>
  );
}
