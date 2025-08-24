import { formatViewCount } from '@/lib/utils/format-view-count';
import { type VideoResponse } from '@/types/api';

export function VideoManageCard({ video }: { video: VideoResponse }) {
  return (
    <div className='flex-1 w-full h-auto flex flex-col gap-2'>
      <div className='relative w-full h-auto max-h-[284px] aspect-[160/284] bg-gray500 rounded-[10px]'>
        {/* <p className='absolute bottom-3 right-3 size-fit text-white000 text-largeSmall'>
          <span className='text-labelLargeMid text-white000'>
            {formatViewCount(video.views ?? 0)}
          </span>
        </p> */}
      </div>
      <div className='flex flex-col gap-1 items-end text-labelLargeMid text-gray500'>
        <span>{video.createdAt}</span>
        <span>{video.storeName}</span>
      </div>
    </div>
  );
}
