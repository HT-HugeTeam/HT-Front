import type {
  CreateStoreRequest,
  CreateStoreResponse,
  StoreResponse,
  UpdateStoreRequest,
} from '../../../types/api';

import { apiClient } from '../axios-client-config';

/**
 * 가게 ID로 가게 정보를 조회합니다
 * @summary 가게 정보 조회
 */
export const getStoreByUserClient = () => {
  return apiClient<StoreResponse[]>({ url: `/stores`, method: 'GET' });
};

/**
 * 가게 ID로 가게 정보를 조회합니다
 * @summary 가게 정보 조회
 */
export const getStoreDetail = (storeId: string) => {
  return apiClient<StoreResponse>({ url: `/stores/${storeId}`, method: 'GET' });
};
/**
 * 기존 가게의 정보를 수정합니다
 * @summary 가게 정보 수정
 */
export const updateStore = (
  storeId: string,
  updateStoreRequest: UpdateStoreRequest,
) => {
  return apiClient<StoreResponse>({
    url: `/stores/${storeId}`,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    data: updateStoreRequest,
  });
};
/**
 * 새로운 가게를 생성합니다
 * @summary 가게 생성
 */
export const createStore = (createStoreRequest: CreateStoreRequest) => {
  return apiClient<CreateStoreResponse>({
    url: `/stores`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createStoreRequest,
  });
};
export type GetStoreDetailResult = NonNullable<
  Awaited<ReturnType<typeof getStoreDetail>>
>;
export type UpdateStoreResult = NonNullable<
  Awaited<ReturnType<typeof updateStore>>
>;
export type CreateStoreResult = NonNullable<
  Awaited<ReturnType<typeof createStore>>
>;
