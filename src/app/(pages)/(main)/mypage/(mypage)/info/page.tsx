import { Suspense } from 'react';
import { InfoContents } from '../../_components/info/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';
import { getStoreByUserServer } from '@/lib/api/store/store-server';

export default async function MyPageInfoPage() {
  const storeData = await getStoreByUserServer();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InfoContents initialStoreData={storeData} />
    </Suspense>
  );
}
