import { type VideoResponse } from '@/types/api';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export function VideoManageCard({ video }: { video: VideoResponse }) {
  return (
    <div className='flex-1 w-full h-auto flex flex-col gap-2'>
      <div className='relative w-full h-auto max-h-[284px] aspect-[160/284] bg-gray500 rounded-[10px]'>
        <video
          src={video.videoUrl}
          controls={true}
          muted={true}
          //   pip={false}
          loop={true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '15px',
            zIndex: 100,
          }}
        />
      </div>
      <div className='flex flex-col gap-1 items-end text-labelLargeMid text-gray500'>
        <span>{formatDate(video.createdAt ?? '')}</span>
        <span>{video.storeName}</span>
      </div>
    </div>
  );
}
