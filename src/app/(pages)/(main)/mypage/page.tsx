// ssg 정적 페이지 생성
export const dynamic = 'force-static';

import Link from 'next/link';
import StoreIcon from '@/public/svg/mypage/store.svg';
import OwnerIcon from '@/public/svg/mypage/owner.svg';
import VideoIcon from '@/public/svg/mypage/video.svg';
import { LogoutButton } from '@/components/logout-button';
import { Suspense } from 'react';
import { Header } from '@/components/header';

const LinkItems = [
  {
    label: '가게 정보',
    herf: '/mypage/info?tab=store',
    icon: <StoreIcon />,
  },
  {
    label: '사장님 정보',
    herf: '/mypage/info?tab=owner',
    icon: <OwnerIcon />,
  },
  {
    label: '영상관리',
    herf: '/mypage/manage-video',
    icon: <VideoIcon />,
  },
];
export default function MyPage() {
  return (
    <div className='w-full h-auto flex flex-col'>
      <header className='fixed z-50 mobile-area top-0 left-0 right-0 w-full h-18 flex justify-center items-end pt-10 pb-2 px-6 text-headlineLarge text-gray600 !font-bold bg-white000'>
        마이페이지
      </header>

      <section className='pt-26 pl-6 w-full h-auto flex flex-col items-start gap-4'>
        {LinkItems.map(item => (
          <Link
            href={item.herf}
            key={item.label}
            className='w-fit h-auto flex justify-start items-center gap-2'
          >
            <span className='size-6 aspect-square flex-center'>
              {item.icon}
            </span>
            <span className='text-bodyMedium text-gray600'>{item.label}</span>
          </Link>
        ))}
        <LogoutButton />
      </section>
    </div>
  );
}
