'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useRouter } from 'next/navigation';

// ReactPlayer를 dynamic import로 로드하여 SSR 문제 해결
const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
}) as any;

export function VideoPlayer({ videoId }: { videoId: string }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const videoUrl: string =
    'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/6683c14f-7d35-45ea-9402-d87fd498f5a7.mp4';
  const handleReady = () => {
    setIsReady(true);
  };

  const handleRedo = () => {
    // TODO: 다시만들기 로직 구현
    console.log('다시만들기 클릭');
  };

  const handleNext = () => {
    // TODO: 다음 버튼 로직 구현
    console.log('다음 클릭');
  };
  return (
    <>
      {/* ReactPlayer - 전체 화면 꽉 채우기 */}
      <div className='w-full h-full flex flex-col rounded-[15px] gap-4'>
        {videoUrl ? (
          <video
            src={videoUrl}
            onPlay={e => {
              console.log('비디오 재생');
            }}
            controls={true}
            muted={true}
            //   pip={false}
            loop={true}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px',
              zIndex: 100,
            }}
          />
        ) : (
          <div className='flex-1 w-full h-auto flex-center bg-gray200 rounded-[15px]'>
            <p className='text-bodySmall text-gray600'>영상 준비 중입니다...</p>
            <LoadingSpinner />
          </div>
        )}
        <div className='flex items-center gap-2'>
          <button className='flex-1 w-full h-10 min-mobile:h-14 text-bodySmall rounded-[8px] bg-gray500 text-white000 cursor-pointer'>
            다시 만들기
          </button>
          <button
            onClick={() =>
              router.push(`/mypage/manage-video/${videoId}/video-check`)
            }
            className='flex-1 w-full h-10 min-mobile:h-14 text-bodySmall rounded-[8px] bg-orange400 text-white000 cursor-pointer'
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}
