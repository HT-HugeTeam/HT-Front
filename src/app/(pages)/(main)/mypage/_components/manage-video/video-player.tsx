'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useRouter } from 'next/navigation';

export function VideoPlayer({ videoId }: { videoId: string }) {
  const router = useRouter();
  const videoUrl =
    'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/6683c14f-7d35-45ea-9402-d87fd498f5a7.mp4';

  return (
    <>
      {/* ReactPlayer - 전체 화면 꽉 채우기 */}
      <div className='w-full h-full flex flex-col rounded-[15px] gap-4'>
        {videoUrl ? (
          <video
            src={videoUrl}
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
