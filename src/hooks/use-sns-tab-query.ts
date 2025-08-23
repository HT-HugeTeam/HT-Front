'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

export type SnsTab = 'instagram' | 'youtube' | 'tiktok';

const SHORTS_TAB_PARSER = parseAsStringLiteral<SnsTab>([
  'instagram',
  'youtube',
  'tiktok',
]);

export function useSnsTabQuery() {
  const [selectedTab, setSelectedTab] = useQueryState<SnsTab>(
    'shortsTab',
    SHORTS_TAB_PARSER.withDefault('instagram'),
  );

  return {
    selectedTab,
    setSelectedTab,
  };
}
