'use client';

import { GradientProgressBar } from '@/components/gradient-progress-bar';
import { useVideoGeneration } from '@/hooks/use-video-generation';
import TinyArrowOrangeIcon from '@/public/svg/mypage/tiny-arrow-orange.svg';
import Link from 'next/link';

export function VideoProgressHeader({
  generationId,
}: {
  generationId: string;
}) {
  const { status, progress, generatedVideoId } =
    useVideoGeneration(generationId);
  console.log(generatedVideoId);

  return (
    <header className='mt-8 p-6 w-full h-auto flex flex-col items-start gap-1 bg-white000 border border-gray100 rounded-[15px] shadow-[0_4px_10px_0_rgba(154,159,160,0.15)]'>
      <h3 className='text-labelLargeMid text-gray500'>
        새로운 영상이 제작중이에요!
        <br />
        <strong className='text-labelSmall text-orange400'>
          (예상 소요 시간 : 3분)
        </strong>
      </h3>
      {status === 'FINISHED' ? (
        <>
          <span className='mt-1 flex items-center justify-between w-full text-headlineLarge text-orange400'>
            <h2 className='max-w-[168px] truncate text-ellipsis line-clamp-1'>
              영상 제작이 완료되었어요!
            </h2>
            <Link
              href={`/mypage/manage-video/${generatedVideoId}`}
              className='flex items-center'
            >
              <span className='text-labelLargeMid text-orange400'>
                영상 확인하기
              </span>
              <TinyArrowOrangeIcon />
            </Link>
          </span>
        </>
      ) : (
        <>
          <span className='mt-1 flex items-center justify-between w-full text-headlineLarge text-orange500'>
            <h2 className='max-w-[200px] truncate text-ellipsis line-clamp-1'>
              {status === 'FAILED'
                ? '영상 제작에 실패했어요'
                : status === 'IDLE'
                  ? '현재 제작중인 영상이 없습니다'
                  : '영상 제작이 진행중입니다'}
            </h2>
            <p>{progress}%</p>
          </span>
          <GradientProgressBar progress={progress} />
        </>
      )}
    </header>
  );
}
