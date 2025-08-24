'use client';

import NoneCameraIcon from '@/public/svg/home/none-camera.svg';
import { VideoCard } from './video-card';
import { useHomeData } from '@/hooks/queries/use-home-data';

export function VideoSection() {
  const { data: videoList } = useHomeData();

  return (
    <section className='mb-2 w-full h-auto flex flex-col items-start gap-2'>
      <header className='px-1.5 py-1 bg-orange100 rounded-[5px] flex-center text-labelSmall text-orange400'>
        업로드 된 영상
      </header>
      {videoList?.videos && videoList.videos.length > 0 ? (
        <div className='pb-3 w-full h-auto flex items-start gap-2 overflow-x-auto custom-scrollbar'>
          {videoList.videos.map(video => (
            <VideoCard key={video.id} />
          ))}
        </div>
      ) : (
        <NoneVideoSection />
      )}
    </section>
  );
}
export const NoneVideoSection = () => {
  return (
    <div className='w-full h-auto flex-center flex-col gap-2 aspect-[327/231] rounded-[10px] bg-gray100'>
      <NoneCameraIcon />
      <p className='text-labelLargeMid text-gray500'>
        아직 업로드 된 영상이 없어요
      </p>
    </div>
  );
};
