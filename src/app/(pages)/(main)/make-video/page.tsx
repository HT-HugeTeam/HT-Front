'use client';

import { MediaUpload } from '@/components/media-upload';

export default function MakeVideoPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <MediaUpload onUploadComplete={() => {}} />
    </div>
  );
}
