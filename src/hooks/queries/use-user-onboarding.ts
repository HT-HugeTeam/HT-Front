'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { type UserOnboardingStatusResponse } from '@/types/api';
import { getOnboardingStatus } from '@/lib/api/user/user';

/**
 * user onboarding 데이터를 전역 캐시로 관리하는 Tanstack Query Hook
 * @returns user onboarding 데이터와 로딩 상태, 에러 상태
 * @description 무한 캐싱 -> 편집 시 mutation으로 변경
 */
export function useUserOnboarding(initialData?: UserOnboardingStatusResponse) {
  return useQuery({
    queryKey: ['user-onboarding'],
    queryFn: () => getOnboardingStatus(),
    staleTime: Infinity, // 편집 시에만 변경되므로 무한 캐싱
    gcTime: 1000 * 60 * 60, // 1시간 메모리 보관
    retry: 2,
    initialData,
  });
}
