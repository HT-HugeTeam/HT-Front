import { getVideo } from '@/lib/api/video/video';
import { VideoPlayer } from '../../../_components/manage-video/video-player';

export default async function VideoDetailPage() {
  const videoId = localStorage.getItem('generatedVideoId');
  const videoInfo = await getVideo(videoId ?? '');
  return (
    <section className='py-6 w-full h-[calc(100vh-220px)] min-h-0'>
      <VideoPlayer
        videoUrl={videoInfo.videoUrl ?? ''}
        videoId={videoId ?? ''}
      />
    </section>
  );
}
