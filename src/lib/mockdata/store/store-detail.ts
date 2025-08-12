import { StoreDetail } from '@/types/store/store-detail.types';

export const donkatsuStore: StoreDetail = {
  storeId: 1,
  storeName: '돈까스 광명',
  storeAddress: '서울 마포구 포은로 25 1층',
  storeDescription: '합정 지역에서 유명한 웨이팅 맛집으로, 특히 토...',
  storeMenu: ['로스카츠'],
};

// 고지비 mock data
export const gozhibiStore: StoreDetail = {
  storeId: 2,
  storeName: '고지비',
  storeAddress: '서울 종로구 필운대로 38 1층 고지비',
  storeDescription: '고지비는 제주산 식재료를 사용해 정갈하고 맛있...',
  storeMenu: ['고지비 리조또'],
};
