import { useVideoGeneration } from '@/hooks/use-video-generation';
import { VideoProgressHeader } from '../../_components/manage-video/video-progress-header';
import { VideoSection } from '../../_components/manage-video/video-section';

export default async function ManageVideoPage({
  searchParams,
}: {
  searchParams: Promise<{ generationId?: string }>;
}) {
  const { generationId } = await searchParams;
  return (
    <>
      <VideoProgressHeader generationId={generationId ?? ''} />
      <VideoSection />
    </>
  );
}
