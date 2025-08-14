'use client';

import { create } from 'zustand';
import { toast } from 'sonner';
import type {
  StoreDetail,
  StoreFormData,
} from '@/types/mypage/store-detail.types';

interface MyPageStore {
  // 폼 데이터
  formData: StoreFormData;

  // 폼 필드 업데이트
  updateField: <K extends keyof StoreFormData>(
    field: K,
    value: StoreFormData[K],
  ) => void;

  // 폼 데이터 초기화 (storeDetail 기준)
  initializeFormData: (storeDetail: StoreDetail) => void;

  // 폼 데이터 리셋 (원본 데이터로 복원)
  resetFormData: (storeDetail: StoreDetail) => void;

  // 저장 함수
  handleSave: () => void;

  // 메뉴 관련 헬퍼 함수들
  addMenuItem: (menuItem: string) => void;
  removeMenuItem: (index: number) => void;
}

export const useMyPageStore = create<MyPageStore>((set, get) => ({
  formData: {
    storeName: '',
    storeAddress: '',
    storeDescription: '',
    storeMenu: [],
  },

  updateField: (field, value) => {
    set(state => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  },

  initializeFormData: storeDetail => {
    set({
      formData: {
        storeName: storeDetail.storeName,
        storeAddress: storeDetail.storeAddress,
        storeDescription: storeDetail.storeDescription,
        storeMenu: [...storeDetail.storeMenu],
      },
    });
  },

  resetFormData: storeDetail => {
    get().initializeFormData(storeDetail);
  },

  handleSave: () => {
    // TODO: API 호출 로직 추가
    toast.success('수정되었습니다.');
  },

  addMenuItem: menuItem => {
    if (menuItem.trim()) {
      set(state => ({
        formData: {
          ...state.formData,
          storeMenu: [...state.formData.storeMenu, menuItem.trim()],
        },
      }));
    }
  },

  removeMenuItem: index => {
    set(state => ({
      formData: {
        ...state.formData,
        storeMenu: state.formData.storeMenu.filter((_, i) => i !== index),
      },
    }));
  },
}));
