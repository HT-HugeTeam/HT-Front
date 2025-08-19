'use client';

import { cn } from '@/lib/utils/cn';
import { parseAsStringLiteral, useQueryState } from 'nuqs';

const TABS_LABEL = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '내 주변',
    value: 'around',
  },
  {
    label: '동종업계',
    value: 'same-industry',
  },
];
type ShortsTab = 'all' | 'around' | 'same-industry';

const SHORTS_TAB_PARSER = parseAsStringLiteral<ShortsTab>([
  'all',
  'around',
  'same-industry',
]);

export function ShortsVideoTabs() {
  const [selectedTab, setSelectedTab] = useQueryState<ShortsTab>(
    'shortsTab',
    SHORTS_TAB_PARSER.withDefault('all'),
  );
  return (
    <nav className='sticky top-0 z-10 py-4 w-full h-auto flex items-center justify-start gap-4 bg-gray100'>
      {TABS_LABEL.map(tab => (
        <button
          key={tab.value}
          type='button'
          className={cn(
            'px-4 py-1.5 w-fit h-auto flex-center rounded-[20px] border-[0.5px] border-gray500 bg-white000 text-labelLargeMid text-gray600 cursor-pointer transition-colors duration-200 hover:bg-orange100',
            selectedTab === tab.value &&
              'bg-orange100 border-orange400 text-orange400 hover:bg-orange200',
          )}
          onClick={() => setSelectedTab(tab.value as ShortsTab)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
