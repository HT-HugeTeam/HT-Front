import { StoreDetail } from '@/types/mypage/store-detail.types';

export const donkatsuStore: StoreDetail = {
  storeId: 1,
  storeName: '돈까스 광명',
  storeAddress: '서울 마포구 포은로 25 1층',
  storeDescription:
    '합정 지역에서 유명한 웨이팅 맛집으로, 특히 로스카츠가 인기 메뉴입니다. 로스카츠는 한입 크기로 제공되며, 지방층이 풍부해 고소한 맛이 특징입니다.',
  storeMenu: ['로스카츠', '토스트', '치즈버거'],
};

// 고지비 mock data
export const gozhibiStore: StoreDetail = {
  storeId: 2,
  storeName: '고지비',
  storeAddress: '서울 종로구 필운대로 38 1층 고지비',
  storeDescription: '고지비는 제주산 식재료를 사용해 정갈하고 맛있...',
  storeMenu: ['고지비 리조또', '토스트', '치즈버거'],
};
