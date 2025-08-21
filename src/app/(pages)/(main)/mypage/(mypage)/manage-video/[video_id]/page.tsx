import { VideoPlayer } from '../../../_components/manage-video/video-player';

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ video_id: string }>;
}) {
  const videoId = (await params).video_id;
  console.log(videoId);

  return (
    <section className='py-6 w-full h-[calc(100vh-220px)] min-h-0'>
      <VideoPlayer videoId={videoId} />
    </section>
  );
}
