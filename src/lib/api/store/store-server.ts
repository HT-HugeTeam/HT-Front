import { type StoreResponse } from '@/types/api';
import { apiServer } from '../axios-server-config';

export const getStoreByUserServer = () => {
  return apiServer<StoreResponse[]>({
    url: `/stores`,
    method: 'GET',
  });
};
