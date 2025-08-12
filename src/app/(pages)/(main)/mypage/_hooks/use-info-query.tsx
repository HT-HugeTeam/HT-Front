import { parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs';

export type TabType = 'store' | 'store-detail' | 'owner' | 'video';

export const tabs: Record<TabType, string> = {
  store: '가게 정보',
  'store-detail': '상세 정보',
  owner: '사장님 정보',
  video: '영상 관리',
} as const;

const DEFAULT_TAB: TabType = 'store';

const validTabs = Object.keys(tabs) as TabType[];

/**
 * 마이페이지의 탭 상태를 관리하는 커스텀 훅
 *
 * @returns {Object} 탭 관련 상태와 유틸리티 함수들을 포함하는 객체
 * @property {TabType} tab - 현재 선택된 탭
 * @property {Function} setTab - 탭을 변경하는 함수
 * @property {Function} isActiveTab - 특정 탭이 현재 활성화되어 있는지 확인하는 함수
 * @property {string} tabLabel - 현재 선택된 탭의 레이블
 * @property {Record<TabType, string>} allTabs - 모든 탭과 레이블을 포함하는 객체
 *
 * @example
 * const { tab, setTab, isActiveTab, tabLabel } = useInfoQuery();
 * // tab이 'store'일 때
 * console.log(tabLabel); // '가게 정보'
 * console.log(isActiveTab('store')); // true
 */

export function useInfoQuery() {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsStringLiteral(validTabs).withDefault(DEFAULT_TAB),
  );
  const [storeName, setStoreName] = useQueryState('storeName', parseAsString);

  return {
    tab,
    storeName,
    setStoreName,
    setTab,
    isActiveTab: (targetTab: TabType) => tab === targetTab,
    tabLabel: tabs[tab],
    allTabs: tabs,
  } as const;
}

// 타입 가드 함수 (선택적)
export function isValidTab(value: string): value is TabType {
  return validTabs.includes(value as TabType);
}
