import { StoreDetail } from '@/types/store/store-detail.types';
import { donkatsuStore, gozhibiStore } from '@/lib/mockdata/store/store-detail';

export async function getStoreDetail(storeId: string): Promise<StoreDetail> {
  // simulate api call
  await new Promise(resolve => setTimeout(resolve, 1000));

  switch (storeId) {
    case 'donkatsu':
      return donkatsuStore;
    case 'gojibi':
      return gozhibiStore;
    default:
      throw new Error(`Store not found: ${storeId}`);
  }
}
