// hooks/use-store-detail.ts
'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type StoreDetail } from '@/types/store';
import { getStoreByUserClient, getStoreDetail } from '@/lib/api/store/store';
import { type StoreResponse } from '@/types/api';

export function useStoreByUser(initialData?: StoreResponse[]) {
  return useQuery({
    queryKey: ['store-user'],
    queryFn: () => getStoreByUserClient(),
    staleTime: Infinity, // 편집 시에만 변경되므로 무한 캐싱
    gcTime: 1000 * 60 * 60, // 1시간 메모리 보관
    retry: 2,
    initialData,
  });
}

/**
 * StoreDetail 데이터를 전역 캐시로 관리하는 Tanstack Query Hook
 * @property storeId - 가게 아이디
 * @returns StoreDetail 데이터와 로딩 상태, 에러 상태
 * @description 무한 캐싱 -> 편집 시 mutation으로 변경
 */
export function useStoreDetail(storeId?: string) {
  return useQuery({
    queryKey: ['store', 'detail', storeId],
    queryFn: () => getStoreDetail(storeId!),
    enabled: !!storeId,
    staleTime: Infinity, // 편집 시에만 변경되므로 무한 캐싱
    gcTime: 1000 * 60 * 60, // 1시간 메모리 보관
    retry: 2,
  });
}

/**
 * 특정 storeId의 데이터를 프리패치하는 Hook
 * 페이지 이동 전 미리 데이터를 로드할 때 사용
 */
export function usePrefetchStoreDetail() {
  const queryClient = useQueryClient();

  const prefetchStore = async (storeId: string) => {
    await queryClient.prefetchQuery({
      queryKey: ['store', 'detail', storeId],
      queryFn: () => getStoreDetail(storeId),
      staleTime: Infinity,
    });
  };

  return { prefetchStore };
}

/**
 * 현재 캐시된 모든 store 데이터를 가져오는 Hook
 * 디버깅이나 전체 데이터가 필요할 때 사용
 */
export function useAllCachedStores(): StoreDetail[] {
  const queryClient = useQueryClient();

  const queryCache = queryClient.getQueryCache();
  const cachedStores: StoreDetail[] = [];

  queryCache.getAll().forEach(query => {
    if (
      query.queryKey[0] === 'store' &&
      query.queryKey[1] === 'detail' &&
      query.state.data
    ) {
      cachedStores.push(query.state.data as StoreDetail);
    }
  });

  return cachedStores;
}
