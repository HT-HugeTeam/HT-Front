import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStore, createStore } from '@/lib/api/store/store';
import type {
  UpdateStoreRequest,
  CreateStoreRequest,
  StoreResponse,
  CreateStoreResponse,
} from '@/types/api';

/**
 * 가게 정보 수정 뮤테이션
 */
export function useUpdateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storeId,
      data,
    }: {
      storeId: string;
      data: UpdateStoreRequest;
    }) => updateStore(storeId, data),

    onSuccess: (updatedStore: StoreResponse) => {
      // storeByUser 캐시 직접 업데이트
      queryClient.setQueryData(['storeByUser'], (oldData: StoreResponse) => ({
        ...oldData,
        ...updatedStore,
      }));
    },

    onError: error => {
      console.error('가게 수정 실패:', error);
    },
  });
}

/**
 * 가게 생성 뮤테이션
 */
export function useCreateStore() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStoreRequest) => createStore(data),

    onSuccess: (newStore: CreateStoreResponse) => {
      // storeByUser 캐시에 새 가게 정보 설정
      queryClient.setQueryData(['storeByUser'], newStore);
    },

    onError: error => {
      console.error('가게 생성 실패:', error);
    },
  });
}

/**
 * 가게 수정/생성 통합 뮤테이션 (기존 로직과 호환)
 */
export function useStoreSubmit() {
  const queryClient = useQueryClient();
  const updateStoreMutation = useUpdateStore();
  const createStoreMutation = useCreateStore();

  const handleSave = async (
    mode: 'storeEdit' | 'storeAdd',
    data: UpdateStoreRequest | CreateStoreRequest,
    storeId?: string,
  ) => {
    try {
      let response;

      if (mode === 'storeEdit' && storeId) {
        response = await updateStoreMutation.mutateAsync({
          storeId,
          data: data as UpdateStoreRequest,
        });
      } else if (mode === 'storeAdd') {
        response = await createStoreMutation.mutateAsync(
          data as CreateStoreRequest,
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    handleSave,
    isLoading: updateStoreMutation.isPending || createStoreMutation.isPending,
    error: updateStoreMutation.error || createStoreMutation.error,
  };
}
