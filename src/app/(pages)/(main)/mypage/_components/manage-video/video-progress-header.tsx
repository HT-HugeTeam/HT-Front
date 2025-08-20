'use client';

import { GradientProgressBar } from '@/components/gradient-progress-bar';

const FILE_PROGRESS = 72;
const FILE_NAME = '파일명파일명파일명파일명파일명파일명파일명파일명파일명';

export function VideoProgressHeader() {
  return (
    <>
      {true && (
        <header className='mt-8 p-6 w-full h-auto flex flex-col items-start gap-1 bg-white000 border border-gray100 rounded-[15px] shadow-[0_4px_10px_0_rgba(154,159,160,0.15)]'>
          <h3 className='text-labelLargeMid text-gray500'>
            새로운 영상이 제작중이에요!
          </h3>
          <span className='mt-1 flex items-center justify-between w-full text-headlineLarge text-orange400'>
            <h2 className='max-w-[168px] truncate text-ellipsis line-clamp-1'>
              {FILE_NAME}
            </h2>
            <p>{FILE_PROGRESS}%</p>
          </span>
          <GradientProgressBar progress={FILE_PROGRESS} />
        </header>
      )}
    </>
  );
}
