'use client';

import { useState, useEffect } from 'react';
import { useVideoCreationStore } from '@/stores/video-creation-store';
import { useUploadService } from '@/hooks/use-upload-service';
import { VideoUploadCard } from './video-upload-card';
import { ImageUploadCard } from './image-upload-card';
import { FieldContainer } from '@/components/store-info';
import { toast } from 'sonner';
import MakeVideoStartIcon from '@/public/svg/make-video/make-video-start.svg';
import { GradientProgressBar } from '@/components/gradient-progress-bar';
import { useRouter } from 'next/navigation';
import { createVideoGeneration } from '@/lib/api/video/video';

export function VideoImageUpload() {
  const router = useRouter();
  const { currentStore, setCurrentStep, getCustomMenus } =
    useVideoCreationStore();
  const customMenus = getCustomMenus();

  // 업로드 상태
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // 파일 상태
  const [selectedVideoFiles, setSelectedVideoFiles] = useState<File[]>([]);
  const [selectedMenuImages, setSelectedMenuImages] = useState<
    Record<string, File | null>
  >({});

  const { uploadFiles, isUploading, getUploadedUrls } = useUploadService({
    onUploadComplete: results => {
      const urls = getUploadedUrls(results);

      setSelectedVideoFiles([]);
      setSelectedMenuImages({});

      const makeVideoText = currentStore?.description;
      const imageUrls = urls.filter(url => url.includes('images/'));
      const videoUrls = urls.filter(url => url.includes('videos/'));
      const images = imageUrls.map((imageUrl, index) => {
        // customMenus 배열의 순서대로 매칭 (업로드 순서와 동일하다고 가정)
        const menu = customMenus[index];
        return {
          name: menu?.name ?? `메뉴 ${index + 1}`,
          imageUrl: imageUrl,
        };
      });

      // 영상 생성 API 호출을 비동기로 처리
      void createVideoGeneration({
        text: makeVideoText ?? '',
        images: images,
        videos: videoUrls.map(url => ({
          videoUrl: url,
        })),
        storeId: currentStore?.id ?? '',
      })
        .then(response => {
          if (!response.videoGenerationId) {
            toast.error(
              '영상 생성에 실패했습니다. 새로고침 후 다시 시도해주세요.',
            );
            setIsProcessing(false);
            return;
          }
          router.replace(
            `/mypage/manage-video?generationId=${response.videoGenerationId}`,
          );
        })
        .catch(() => {
          toast.error(
            '영상 생성에 실패했습니다. 새로고침 후 다시 시도해주세요.',
          );
          setIsProcessing(false);
        });
    },
    onUploadError: error => {
      toast.error(error.message);
      setIsProcessing(false);
    },
    validateBeforeUpload: true,
    uploadMode: 'sequential',
  });

  const handleVideoFileSelect = (files: File[]) => {
    setSelectedVideoFiles(files);
  };

  const handleMenuImageSelect = (menuId: string) => (file: File | null) => {
    setSelectedMenuImages(prev => ({
      ...prev,
      [menuId]: file,
    }));
  };

  const handleUpload = () => {
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

    setIsProcessing(true);
    uploadFiles(allFiles);
  };

  const handleBack = () => {
    setCurrentStep('store-edit');
  };

  // 프로그레스 바 애니메이션
  useEffect(() => {
    if (!isProcessing) return;

    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 33.33, 90)); // 90%까지만
    }, 1000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  if (isProcessing) {
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
  if (!currentStore) {
    return <div>가게 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className='w-full h-full px-6 py-6 overflow-y-auto pb-24'>
      <div className='flex flex-col gap-8'>
        {/* 가게 정보 표시 */}
        <FieldContainer label='상호명' value={currentStore.name} />
        <FieldContainer label='주소' value={currentStore.address} />
        <FieldContainer label='소개' value={currentStore.description} />

        {/* 가게 영상 업로드 */}
        <div className='flex flex-col gap-2'>
          <h4 className='text-headlineMedium text-gray500 flex items-center'>
            가게 영상
          </h4>
          <VideoUploadCard
            onFileSelect={handleVideoFileSelect}
            maxSize={50 * 1024 * 1024}
            maxFiles={10}
          />
        </div>

        {/* 메뉴 사진 업로드 */}
        {customMenus.length > 0 && (
          <div className='flex flex-col gap-2'>
            <h4 className='text-headlineMedium text-gray500 flex items-center'>
              메뉴
            </h4>
            <div className='flex flex-wrap gap-2'>
              {customMenus.map(menu => (
                <ImageUploadCard
                  key={menu.id}
                  onFileSelect={handleMenuImageSelect(menu.id)}
                  maxSize={10 * 1024 * 1024}
                  menuName={menu.name}
                />
              ))}
            </div>
          </div>
        )}

        {customMenus.length === 0 && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <p className='text-yellow-800'>
              추가된 메뉴가 없습니다. 메뉴를 추가하면 해당 메뉴의 사진을
              업로드할 수 있어요.
            </p>
          </div>
        )}
        <FieldContainer
          label='네이버 지도 연결'
          value={currentStore.naverUrl ?? ''}
        />
      </div>

      {/* 하단 고정 버튼 */}
      <div className='px-6 pb-4 fixed bottom-20 left-0 right-0 mobile-area h-18 bg-white border-t border-gray-100'>
        <div className='flex gap-3 h-full items-center'>
          <button
            onClick={handleBack}
            className='flex-1 h-full flex-center border border-gray-300 text-gray-700 rounded-[15px] hover:bg-gray-50'
          >
            이전
          </button>
          <button
            onClick={handleUpload}
            disabled={
              (selectedVideoFiles.length === 0 &&
                Object.values(selectedMenuImages).every(
                  file => file === null,
                )) ||
              isUploading
            }
            className='flex-[2] h-full flex-center bg-orange400 rounded-[15px] text-bodySmall text-white000 cursor-pointer disabled:bg-gray400 disabled:cursor-not-allowed'
          >
            {isUploading ? '업로드 중...' : '영상 제작 시작'}
          </button>
        </div>
      </div>
    </div>
  );
}
