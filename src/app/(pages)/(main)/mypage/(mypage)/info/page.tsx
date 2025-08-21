import { Suspense } from 'react';
import { InfoContents } from '../../_components/info/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';

export default async function MyPageInfoPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InfoContents />
    </Suspense>
  );
}
