import Link from 'next/link';

const LinkItems = [
  {
    label: '가게 정보',
    herf: '/mypage/info?tab=store',
  },
  {
    label: '사장님 정보',
    herf: '/mypage/info?tab=owner',
  },
  {
    label: '영상 관리',
    herf: '/mypage/info?tab=video',
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
            <span className='size-6 aspect-square bg-[#FF9C9C]' />
            <span className='text-bodyMedium text-gray600'>{item.label}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
