'use client';

import { FieldContainer } from '@/components/store-info';
import { useUploadService } from '@/hooks/use-upload-service';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { VideoUploadCard } from './video-upload-card';
import { ImageUploadCard } from './image-upload-card';
import MakeVideoStartIcon from '@/public/svg/make-video/make-video-start.svg';
import { GradientProgressBar } from '@/components/gradient-progress-bar';
import { useRouter } from 'next/navigation';
import { useStoreDetail } from '@/hooks/queries/use-store';
import type { StoreDetail } from '@/types/store';
import { type StoreResponse } from '@/types/api';

export const StoreField = [
  {
    label: '상호명',
    value: 'name',
  },
  {
    label: '주소',
    value: 'address',
  },
  {
    label: '소개',
    value: 'description',
  },
];

export function MakeVideoInputUi({
  storeDetail,
}: {
  storeDetail: Required<StoreResponse>;
}) {
  const router = useRouter();
  const [fileUpload, setFileUpload] = useState(false);

  // 동영상 파일들 관리
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);

  // 메뉴별 이미지 파일들 관리
  const [selectedMenuImages, setSelectedMenuImages] = useState<
    Record<string, File | null>
  >({});

  // 프로그레스 바 애니메이션 상태 (업로드 임시 진행바)
  const [progress, setProgress] = useState(0);

  const { uploadFiles, isUploading, getUploadedUrls } = useUploadService({
    onUploadComplete: results => {
      setSelectedVideoFiles([]); // 동영상 파일 초기화
      setSelectedMenuImages({}); // 메뉴 이미지들 초기화

      const urls = getUploadedUrls(results);

      // TODO: 추후 백엔드 API 연동 시 여기서 영상 생성 요청
    },
    onUploadError: error => {
      toast.error(error.message);
    },
    validateBeforeUpload: true,
    uploadMode: 'sequential',
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

  const handleUpload = (): void => {
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

  useEffect(() => {
    if (!fileUpload) return;

    setProgress(0); // 초기화

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 33.33;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      setProgress(100);
      clearInterval(interval);
      router.push('/mypage/manage-video');
    }, 3000);

    return () => {
      void setFileUpload(false);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fileUpload, router]);

  if (fileUpload) {
    return (
      <div className='w-full h-full flex-center'>
        <div className='pt-10 flex-center flex-col gap-4'>
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
          value={storeDetail[field.value as keyof StoreResponse]}
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
      {/* <div className='flex flex-col gap-2'>
        <h4 className='text-headlineMedium text-gray500 flex items-center '>
          메뉴
        </h4>
        <div className='flex gap-2'>
          {storeDetail.storeMenu.map(menu => (
            <ImageUploadCard
              key={menu}
              onFileSelect={handleMenuImageSelect(menu) ?? null}
              maxSize={10 * 1024 * 1024} // 이미지는 10MB 제한
              menuName={menu}
            />
          ))}
        </div>
      </div> */}

      <FieldContainer
        label='네이버 지도 연결'
        value={storeDetail?.naverUrl ?? ''}
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
