import { formatViewCount } from '@/lib/utils/format-view-count';
import LocationIcon from '@/public/svg/shorts/location.svg';
import RightArrowIcon from '@/public/svg/shorts/right-arrow.svg';

const VIDEO_STORE_LOCATION = '서울 강남구';
const VIDEO_STORE_NAME = '돈까스광명';
const HITS_COUNT = 9400000;
const FORMATTED_HITS_COUNT = formatViewCount(HITS_COUNT);

export function ShortsVideoCard() {
  return (
    <div className='px-1.5 pt-1.5 pb-3 flex-1 w-full h-atuo flex flex-col gap-3 rounded-[10px] bg-white000'>
      {/* 비디오 썸네일 들어가는 부분 */}
      <div className='relative w-full h-auto max-h-[284px] aspect-[160/284] rounded-[10px] bg-gray500'>
        <p className='absolute bottom-3 right-3 size-fit text-white000 text-largeSmall'>
          <span className='text-labelLargeMid text-white000'>
            {FORMATTED_HITS_COUNT}
          </span>
        </p>
      </div>

      {/* 비디오 정보 들어가는 부분 */}
      <div className='w-full h-auto flex items-center justify-between'>
        <div className='pl-1.5 flex flex-col gap-0.5 items-start'>
          <span className='flex items-center gap-0.5'>
            <LocationIcon />
            <span className='text-labelSmall text-gray600'>
              {VIDEO_STORE_LOCATION}
            </span>
          </span>
          <h2 className='text-headlineLarge text-black000'>
            {VIDEO_STORE_NAME}
          </h2>
        </div>
        <RightArrowIcon />
      </div>
    </div>
  );
}
