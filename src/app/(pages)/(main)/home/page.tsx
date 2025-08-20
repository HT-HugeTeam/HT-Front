import { LogoHeader } from '@/components/logo-header';
import { OwnerIntro } from './_components/owner-intro';
import Link from 'next/link';
import { VideoSection } from './_components/video-section';
import VideoLayerIcon from '@/public/svg/home/video-layer.svg';
import VideoTapeLayerIcon from '@/public/svg/home/video-tape-layer.svg';

const HITS_COUNT = 333333;
const HOME_BUTTON_STYLE =
  'pl-6 py-6 w-full h-auto flex flex-col bg-white000 items-start gap-2 rounded-[15px] shadow-[0_4px_10px_0_rgba(154,159,160,0.15)] hover:bg-slate-50/40 transition-colors duration-300';

export default function HomePage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <LogoHeader />
      <main className='w-full h-full px-6 pt-6 pb-nav-height flex flex-col gap-4 overflow-y-auto scrollbar-hide scroll-smooth'>
        <OwnerIntro />

        <VideoSection />

        {/* 영상 제작 링크 이동 버튼 */}
        <Link href='/make-video' className={'relative ' + HOME_BUTTON_STYLE}>
          <h4 className='text-labelLargeMid text-gray500'>
            우리 가게 홍보가 필요할 때
          </h4>
          <h1 className='text-displayMedium text-orange400'>영상 제작하기</h1>
          <span className='absolute top-0 right-0'>
            <VideoTapeLayerIcon />
          </span>
        </Link>

        {/* 최근 영상 조회수 버튼 */}
        <button className={'relative ' + HOME_BUTTON_STYLE}>
          <h4 className='text-labelLargeMid text-gray500'>
            가장 최근 영상 조회수
          </h4>
          <h1 className='text-[32px] leading-[30px] font-[500] text-orange400 flex gap-2 items-end'>
            {HITS_COUNT.toLocaleString()}
            <span className='text-labelLargeMid text-gray500'>회</span>
          </h1>
          <span className='absolute top-0 right-0'>
            <VideoLayerIcon />
          </span>
        </button>
      </main>
    </div>
  );
}
