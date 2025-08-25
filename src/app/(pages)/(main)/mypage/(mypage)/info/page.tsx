import { InfoContents } from '../../_components/info/info-contents';
import { getStoreByUserServer } from '@/lib/api/store/store-server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function MyPageInfoPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['store-user'],
    queryFn: () => getStoreByUserServer(),
    staleTime: Infinity,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfoContents />
    </HydrationBoundary>
  );
}
