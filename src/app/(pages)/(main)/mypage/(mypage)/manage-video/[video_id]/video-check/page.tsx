'use client';

import { VideoCheckDescription } from '../../../../_components/manage-video/video-check-description';
import { cn } from '@/lib/utils/cn';
import { VideoCheckButton } from '../../../../_components/manage-video/video-check-button';
import { getVideo } from '@/lib/api/video/video';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const VIDEO_URL =
  'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/6683c14f-7d35-45ea-9402-d87fd498f5a7.mp4';
const VIDEO_FILE_NAME = '사장님 대상 영상 설명';

export default function VideoCheckPage() {
  const { video_id } = useParams<{ video_id: string }>();

  const videoQuery = useQuery({
    queryKey: [video_id, 'video', 'detail'],
    queryFn: () => {
      return getVideo(video_id ?? '');
    },
    staleTime: 0,
    gcTime: 0,
  });

  if (!videoQuery.data) {
    return null;
  }

  return (
    <div className='pt-6 w-full h-full flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar'>
      <div className='w-full h-auto flex items-start gap-4'>
        <video
          src={videoQuery.data.videoUrl}
          controls
          className='w-1/2 h-auto aspect-[160/284] rounded-[8px]'
        />
        <div className='flex-1 w-full h-auto flex flex-col gap-2 '>
          <h4 className='text-headlineMedium text-gray500'>가게명</h4>
          <p className={cn('text-bodySmall text-gray600 !font-normal ')}>
            {videoQuery.data.storeName}
          </p>
        </div>
      </div>
      <VideoCheckDescription video={videoQuery.data} />
      <VideoCheckButton videoUrl={videoQuery.data.videoUrl ?? ''} />
    </div>
  );
}
