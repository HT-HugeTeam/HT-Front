import {
  parseAsBoolean,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';
import { useEffect, useRef } from 'react';

export type TabType = 'store' | 'store-detail' | 'owner' | 'video';

export const tabs: Record<TabType, string> = {
  store: '가게 정보',
  'store-detail': '상세 정보',
  owner: '사장님 정보',
  video: '영상관리',
} as const;

const DEFAULT_TAB: TabType = 'store';

const validTabs = Object.keys(tabs) as TabType[];

/**
 * 마이페이지의 탭 상태를 관리하는 커스텀 훅
 *
 * @returns {Object} 탭 관련 상태와 유틸리티 함수들을 포함하는 객체
 * @description 현재 보여주는 정보를 관리하는 커스텀 훅으로 쿼리파라미터로 상태를 관리
 *
 */

export function useInfoQuery() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(validTabs).withDefault(DEFAULT_TAB),
  );

  // 가게 상세 페이지 정보를 위한 쿼리 파라미터
  const [storeName, setStoreName] = useQueryState('storeName', parseAsString);

  // 가게 상세 정보 편집 여부
  const [edit, setEdit] = useQueryState(
    'edit',
    parseAsBoolean.withDefault(false),
  );

  // 탭 히스토리 추적
  const tabHistoryRef = useRef<TabType[]>([DEFAULT_TAB]);
  const previousTabRef = useRef<TabType>(DEFAULT_TAB);

  // 탭 변경 시 히스토리에 추가
  useEffect(() => {
    if (tab !== previousTabRef.current) {
      if (tabHistoryRef.current[tabHistoryRef.current.length - 1] !== tab) {
        tabHistoryRef.current = [...tabHistoryRef.current, tab];
      }
      previousTabRef.current = tab;
    }
  }, [tab]);

  // 뒤로가기 함수
  const goBackTab = () => {
    if (tabHistoryRef.current.length > 1) {
      // 현재 탭을 히스토리에서 제거
      const newHistory = tabHistoryRef.current.slice(0, -1);
      const previousTab = newHistory[newHistory.length - 1];

      tabHistoryRef.current = newHistory;

      void setTab(previousTab ?? DEFAULT_TAB);

      if (previousTab === 'store') {
        void setStoreName(null);
        void setEdit(false);
      }

      return true;
    }
    return false;
  };

  return {
    tab,
    storeName,
    setStoreName,
    edit,
    setEdit,
    setTab,
    goBackTab,
    canGoBackTab: tabHistoryRef.current.length > 1,
    isActiveTab: (targetTab: TabType) => tab === targetTab,
    tabLabel: tabs[tab],
    allTabs: tabs,
  } as const;
}
