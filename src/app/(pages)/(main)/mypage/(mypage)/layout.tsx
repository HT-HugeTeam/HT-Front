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
      {children}
    </div>
  );
}
