import { Header } from '@/components/header';
import { Suspense } from 'react';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full h-auto'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <main className='px-6 pt-18 pb-10 w-full h-full min-h-0'>{children}</main>
    </div>
  );
}
