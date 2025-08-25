'use client';

import { Video } from '@/types/api';

export function VideoCard({ video }: { video: Video }) {
  return (
    <div className='relative min-w-[130px] h-auto flex flex-col items-start gap-2 aspect-[121/215] rounded-[10px] overflow-hidden cursor-pointer'>
      {video.videoUrl ? (
        <video
          src={video.videoUrl}
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
        </div>
      )}
    </div>
  );
}
