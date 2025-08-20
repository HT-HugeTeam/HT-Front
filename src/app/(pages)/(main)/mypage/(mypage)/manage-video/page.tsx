import { VideoProgressHeader } from '../../_components/manage-video/video-progress-header';
import { VideoSection } from '../../_components/manage-video/video-section';

export default function ManageVideoPage() {
  return (
    <main className='px-6 pt-18 pb-10 w-full h-full min-h-0'>
      <VideoProgressHeader />
      <VideoSection />
    </main>
  );
}
