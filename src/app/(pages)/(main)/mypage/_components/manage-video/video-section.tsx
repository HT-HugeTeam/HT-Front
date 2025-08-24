'use client';

import { useHomeData } from '@/hooks/queries/use-home-data';
import { VideoManageCard } from './video-manage-card';
import { useStoreByUser } from '@/hooks/queries/use-store';
import MainLogoGrayIcon from '@/public/svg/logo/main-logo-gray.svg';

export function VideoSection() {
  const { data: homeData } = useHomeData();
  const { data: storeData } = useStoreByUser();
  return (
    <div className='pt-6 w-full h-auto flex flex-col gap-4'>
      <h3 className='flex gap-2 text-displayMedium text-gray600'>
        {storeData?.[0]?.name}{' '}
        <span className=' text-gray500'>{homeData?.videos?.length}</span>
      </h3>

      {homeData?.videos && homeData.videos.length > 0 ? (
        <section className='w-full h-auto grid grid-cols-2 gap-x-2 gap-y-6'>
          {homeData?.videos?.map((video, index) => (
            <VideoManageCard key={index} video={video} />
          ))}
        </section>
      ) : (
        <div className='pt-20 w-full h-auto flex-center flex-col gap-4'>
          <MainLogoGrayIcon />
          <p className='text-labelLargeMid text-gray500'>
            제작된 영상이 존재하지 않습니다.
          </p>
        </div>
      )}
    </div>
  );
}
