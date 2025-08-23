'use client';

import { create } from 'zustand';
import { toast } from 'sonner';
import type { StoreFormData } from '@/types/store';
import { createStore, updateStore } from '../api/store/store';
import { type StoreResponse } from '@/types/api';
import { useStoreByUser } from '@/hooks/queries/use-store';
import { useQueryClient } from '@tanstack/react-query';

interface MyPageStore {
  // 폼 데이터
  formData: StoreFormData;

  // 폼 필드 업데이트
  updateField: <K extends keyof StoreFormData>(
    field: K,
    value: StoreFormData[K],
  ) => void;

  // 폼 데이터 초기화 (storeDetail 기준)
  initializeFormData: (storeDetail: StoreResponse) => void;

  // 폼 데이터 리셋 (원본 데이터로 복원)
  resetFormData: (storeDetail: StoreResponse) => void;

  // 저장 함수
  handleStoreSave: (saveType: 'storeAdd' | 'storeEdit') => StoreResponse;

  // // 메뉴 관련 헬퍼 함수들
  // addMenuItem: (menuItem: string) => void;
  // removeMenuItem: (index: number) => void;
}

export const useMyPageStore = create<MyPageStore>((set, get) => ({
  formData: {
    id: '',
    name: '',
    address: '',
    description: '',
    naverUrl: '',
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
        id: storeDetail.id ?? '',
        name: storeDetail.name ?? '',
        address: storeDetail.address ?? '',
        description: storeDetail.description ?? '',
        naverUrl: storeDetail.naverUrl ?? '',
      },
    });
  },

  resetFormData: storeDetail => {
    get().initializeFormData(storeDetail);
  },

  handleStoreSave: async (saveType: 'storeAdd' | 'storeEdit') => {
    if (saveType === 'storeAdd') {
      const response = await createStore({
        name: get().formData.name,
        address: get().formData.address,
        description: get().formData.description,
        naverUrl: get().formData.naverUrl ?? '',
      });
      console.log('response', response);
      toast.success('추가되었습니다.');
      return response;
    } else if (saveType === 'storeEdit') {
      const response = await updateStore(get().formData.id, {
        name: get().formData.name,
        address: get().formData.address,
        description: get().formData.description,
        naverUrl: get().formData.naverUrl ?? '',
      });
      console.log('update response', response);

      toast.success('수정되었습니다. 새로고침 후 적용됩니다.');
      return response;
    }
    return null;
  },

  // addMenuItem: menuItem => {
  //   if (menuItem.trim()) {
  //     set(state => ({
  //       formData: {
  //         ...state.formData,
  //       },
  //     }));
  //   }
  // },

  // removeMenuItem: index => {
  //   set(state => ({
  //     formData: {
  //       ...state.formData,
  //       storeMenu: state.formData.storeMenu.filter((_, i) => i !== index),
  //     },
  //   }));
  // },
}));
