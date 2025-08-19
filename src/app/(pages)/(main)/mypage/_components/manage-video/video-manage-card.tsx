import { formatViewCount } from '@/lib/utils/format-view-count';

const HIT_COUNT = 9400000;
const FORMATTED_HIT_COUNT = formatViewCount(HIT_COUNT); // "940만회"
const VIDEO_CREATE_DATE = '2025.08.18';
const VIDEO_TITLE = '돈까스 광명 맛나보이죠?';

export function VideoManageCard() {
  return (
    <div className='flex-1 w-full h-auto flex flex-col gap-2'>
      <div className='relative w-full h-auto max-h-[284px] aspect-[160/284] bg-gray500 rounded-[10px]'>
        <p className='absolute bottom-3 right-3 size-fit text-white000 text-largeSmall'>
          <span className='text-labelLargeMid text-white000'>
            {FORMATTED_HIT_COUNT}
          </span>
        </p>
      </div>
      <div className='flex flex-col gap-1 items-end text-labelLargeMid text-gray500'>
        <span>{VIDEO_CREATE_DATE}</span>
        <span>{VIDEO_TITLE}</span>
      </div>
    </div>
  );
}
