import { VideoCheckDescription } from '../../../../_components/manage-video/video-check-description';
import { cn } from '@/lib/utils/cn';
import { VideoCheckButton } from '../../../../_components/manage-video/video-check-button';

const VIDEO_URL =
  'https://f002.backblazeb2.com/file/creatomate-c8xg3hsxdu/6683c14f-7d35-45ea-9402-d87fd498f5a7.mp4';
const VIDEO_FILE_NAME = '사장님 대상 영상 설명';

export default async function VideoCheckPage({
  params,
}: {
  params: Promise<{ video_id: string }>;
}) {
  const videoId = (await params).video_id;
  console.log(videoId);

  return (
    <div className='pt-6 w-full h-full flex flex-col gap-6 min-h-0 overflow-y-auto custom-scrollbar'>
      <div className='w-full h-auto flex items-start gap-4'>
        <video
          src={VIDEO_URL}
          controls
          className='w-1/2 h-auto aspect-[160/284] rounded-[8px]'
        />
        <div className='flex-1 w-full h-auto flex flex-col gap-2 '>
          <h4 className='text-headlineMedium text-gray500'>파일명</h4>
          <p className={cn('text-bodySmall text-gray600 !font-normal ')}>
            {VIDEO_FILE_NAME}
          </p>
        </div>
      </div>
      <VideoCheckDescription />
      <VideoCheckButton videoUrl={VIDEO_URL} />
    </div>
  );
}
