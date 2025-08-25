'use client';
import { getVideo } from '@/lib/api/video/video';
import { VideoPlayer } from '../../../_components/manage-video/video-player';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function VideoDetailPage() {
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
    <section className='py-6 w-full h-[calc(100vh-220px)] min-h-0'>
      <VideoPlayer
        videoUrl={videoQuery.data.videoUrl ?? ''}
        videoId={video_id ?? ''}
      />
    </section>
  );
}
