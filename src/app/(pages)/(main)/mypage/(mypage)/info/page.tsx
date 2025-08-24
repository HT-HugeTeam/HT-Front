import { Suspense } from 'react';
import { InfoContents } from '../../_components/info/info-contents';
import { LoadingSpinner } from '@/components/loading-spinner';
import { getStoreByUserClient } from '@/lib/api/store/store';
import { getStoreByUserServer } from '@/lib/api/store/store-server';
import { QueryClient } from '@tanstack/react-query';

export default async function MyPageInfoPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['store-user'],
    queryFn: () => getStoreByUserServer(),
    staleTime: Infinity,
  });

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InfoContents />
    </Suspense>
  );
}
