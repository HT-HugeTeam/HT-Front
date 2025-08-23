import { Header } from '@/components/header';
import { MakeVideoContents } from './_components/make-video-contents';
import { VideoCreationFlow } from './_components/video-creation-flow';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';
import { MakeVideoText } from './_components/make-video-text';

export default async function MakeVideoPage() {
  // URL 파라미터로 플로우 모드인지 확인 (예: /make-video?flow=true)
  // 또는 상태에 따라 다른 컴포넌트 렌더링

  return (
    <div className='w-full h-full'>
      <Suspense fallback={<></>}>
        <Header />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <main className='pt-18 pb-18 w-full h-full flex flex-col gap-6 min-h-0 overflow-y-auto scrollbar-hide'>
          {/* 기본 영상 제작 페이지 vs 새로운 플로우 */}
          <VideoCreationFlowWrapper />
        </main>
      </Suspense>
    </div>
  );
}

// 플로우 래퍼 컴포넌트
function VideoCreationFlowWrapper() {
  return (
    <>
      <MakeVideoText />
      {/* 상태에 따라 기존 MakeVideoContents 또는 새 VideoCreationFlow 렌더링 */}
      <VideoCreationFlow />
    </>
  );
}
