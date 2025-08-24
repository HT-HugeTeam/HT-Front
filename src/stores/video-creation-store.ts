import { create } from 'zustand';
import type { StoreResponse } from '@/types/api';

// 영상 제작 전용 메뉴 타입
export interface VideoMenu {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isCustom: boolean; // 사용자가 추가한 메뉴인지
}

// 영상 제작 전용 가게 정보
export interface VideoStoreInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  category: string;
  openingHours: string;
  menus: VideoMenu[];
  naverUrl: string;
}

interface VideoCreationState {
  // 현재 편집 중인 가게 정보
  currentStore: VideoStoreInfo | null;

  // 플로우 상태
  currentStep:
    | 'store-select'
    | 'store-edit'
    | 'image-upload'
    | 'video-generate';

  // 액션들
  setCurrentStore: (store: StoreResponse) => void;
  updateStoreInfo: (updates: Partial<VideoStoreInfo>) => void;
  addMenu: (menu: Omit<VideoMenu, 'id' | 'isCustom'>) => void;
  removeMenu: (menuId: string) => void;
  updateMenu: (menuId: string, updates: Partial<VideoMenu>) => void;
  setCurrentStep: (step: VideoCreationState['currentStep']) => void;
  resetVideoCreation: () => void;

  // 유틸리티
  getCustomMenus: () => VideoMenu[];
  resetStore: () => void;
  getOriginalMenus: () => VideoMenu[];
}

export const useVideoCreationStore = create<VideoCreationState>((set, get) => ({
  currentStore: null,
  currentStep: 'store-select',

  setCurrentStore: (store: StoreResponse) => {
    set({
      currentStore: {
        id: typeof store.id === 'string' ? store.id : String(store.id ?? 0),
        name: store.name ?? '',
        description: store.description ?? '',
        address: store.address ?? '',
        phone: '',
        category: '',
        openingHours: '',
        menus: [],
        naverUrl: store.naverUrl ?? '',
      },
      currentStep: 'store-edit',
    });
  },

  updateStoreInfo: updates => {
    set(state => ({
      currentStore: state.currentStore
        ? { ...state.currentStore, ...updates }
        : null,
    }));
  },

  addMenu: menu => {
    const newMenu: VideoMenu = {
      ...menu,
      id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isCustom: true,
    };

    set(state => ({
      currentStore: state.currentStore
        ? {
            ...state.currentStore,
            menus: [...state.currentStore.menus, newMenu],
          }
        : null,
    }));
  },

  removeMenu: menuId => {
    set(state => ({
      currentStore: state.currentStore
        ? {
            ...state.currentStore,
            menus: state.currentStore.menus.filter(menu => menu.id !== menuId),
          }
        : null,
    }));
  },

  updateMenu: (menuId, updates) => {
    set(state => ({
      currentStore: state.currentStore
        ? {
            ...state.currentStore,
            menus: state.currentStore.menus.map(menu =>
              menu.id === menuId ? { ...menu, ...updates } : menu,
            ),
          }
        : null,
    }));
  },

  setCurrentStep: step => {
    set({ currentStep: step });
  },

  resetVideoCreation: () => {
    set({
      currentStore: null,
      currentStep: 'store-select',
    });
  },

  // 유틸리티 함수들
  getCustomMenus: () => {
    const state = get();
    return state.currentStore?.menus.filter(menu => menu.isCustom) ?? [];
  },

  getOriginalMenus: () => {
    const state = get();
    return state.currentStore?.menus.filter(menu => !menu.isCustom) ?? [];
  },

  resetStore: () => {
    set({
      currentStore: null,
      currentStep: 'store-select',
    });
  },
}));
