import { GradientProgressBar } from '@/components/gradient-progress-bar';
import TinyArrowOrangeIcon from '@/public/svg/mypage/tiny-arrow-orange.svg';
import Link from 'next/link';
const FILE_PROGRESS = 72;
const FILE_NAME = '파일명파일명파일명파일명파일명파일명파일명파일명파일명';
const FILE_RESULT = true;

export function VideoProgressHeader() {
  return (
    <header className='mt-8 p-6 w-full h-auto flex flex-col items-start gap-1 bg-white000 border border-gray100 rounded-[15px] shadow-[0_4px_10px_0_rgba(154,159,160,0.15)]'>
      <h3 className='text-labelLargeMid text-gray500'>
        새로운 영상이 제작중이에요!
      </h3>
      {FILE_RESULT ? (
        <>
          <span className='mt-1 flex items-center justify-between w-full text-headlineLarge text-orange400'>
            <h2 className='max-w-[168px] truncate text-ellipsis line-clamp-1'>
              {FILE_NAME}
            </h2>
            <Link
              href={`/mypage/manage-video/${1}`}
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
          <span className='mt-1 flex items-center justify-between w-full text-headlineLarge text-orange400'>
            <h2 className='max-w-[168px] truncate text-ellipsis line-clamp-1'>
              {FILE_NAME}
            </h2>
            <p>{FILE_PROGRESS}%</p>
          </span>
          <GradientProgressBar progress={FILE_PROGRESS} />
        </>
      )}
    </header>
  );
}
