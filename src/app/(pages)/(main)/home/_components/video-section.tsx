import NoneCameraIcon from '@/public/svg/home/none-camera.svg';
import { VideoCard } from './video-card';

const UPLOAD_VIDEO_STATE = false;
const VIDEO_CARD_LIST = [
  {
    id: 1,
    hits_count: 9400000,
  },
  {
    id: 2,
    hits_count: 9400000,
  },
  {
    id: 3,
    hits_count: 9400000,
  },
  {
    id: 4,
    hits_count: 9400000,
  },
  {
    id: 5,
    hits_count: 9400000,
  },
];

export function VideoSection() {
  return (
    <section className='mb-2 w-full h-auto flex flex-col items-start gap-2'>
      <header className='px-1.5 py-1 bg-orange100 rounded-[5px] flex-center text-labelSmall text-orange400'>
        업로드 된 영상
      </header>
      {UPLOAD_VIDEO_STATE ? (
        <div className='pb-3 w-full h-auto flex items-start gap-2 overflow-x-auto custom-scrollbar'>
          {VIDEO_CARD_LIST.map(video => (
            <VideoCard key={video.id} />
          ))}
        </div>
      ) : (
        <div className='w-full h-auto flex-center flex-col gap-2 aspect-[327/231] rounded-[10px] bg-gray100'>
          <NoneCameraIcon />
          <p className='text-labelLargeMid text-gray500'>
            아직 업로드 된 영상이 없어요
          </p>
        </div>
      )}
    </section>
  );
}
