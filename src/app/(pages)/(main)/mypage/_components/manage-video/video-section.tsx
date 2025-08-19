import { VideoManageCard } from './video-manage-card';

const STORE_NAME = '돈까스 광명';
const STORE_VIDEO_COUNT = 4;

export function VideoSection() {
  return (
    <div className='pt-6 w-full h-auto flex flex-col gap-4'>
      <h3 className='flex gap-2 text-displayMedium text-gray600'>
        {STORE_NAME} <span className=' text-gray500'>{STORE_VIDEO_COUNT}</span>
      </h3>
      <section className='w-full h-auto grid grid-cols-2 gap-x-2 gap-y-6'>
        {Array.from({ length: 4 }).map((_, index) => (
          <VideoManageCard key={index} />
        ))}
      </section>
    </div>
  );
}
