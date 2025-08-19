import Link from 'next/link';
import StoreIcon from '@/public/svg/mypage/store.svg';
import OwnerIcon from '@/public/svg/mypage/owner.svg';
import VideoIcon from '@/public/svg/mypage/video.svg';

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
    label: '영상 관리',
    herf: '/mypage/manage-video',
    icon: <VideoIcon />,
  },
];
export default function MyPage() {
  return (
    <div className='w-full h-auto flex flex-col'>
      <header className='w-full flex justify-center items-end pt-10 pb-2 px-6 text-headlineLarge text-gray600 !font-bold'>
        마이페이지
      </header>
      <section className='pt-8 pl-6 w-full h-auto flex flex-col items-start gap-4'>
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
      </section>
    </div>
  );
}
