import { Header } from '@/components/header';
import { Suspense } from 'react';
import MainLogoGray from '@/public/svg/logo/main-logo-gray.svg';

export default function DashboardPage() {
  return (
    <div className='w-full h-full flex flex-col'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className='pt-18 px-6 pb-10 w-full h-auto flex-1 flex-center flex-col min-h-0 gap-6 bg-white000 overflow-y-auto custom-scrollbar'>
        <MainLogoGray />
        <p className='text-displayMedium text-gray400'>
          현재 준비중인 서비스입니다
        </p>
      </main>
    </div>
  );
}
