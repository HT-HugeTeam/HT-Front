'use client';

import { type SnsTab, useSnsTabQuery } from '@/hooks/use-sns-tab-query';
import { cn } from '@/lib/utils/cn';
const TABS_LABEL = [
  {
    label: '인스타그램',
    value: 'instagram',
  },
  {
    label: '유튜브',
    value: 'youtube',
  },
  {
    label: '틱톡',
    value: 'tiktok',
  },
];

export function AroundSnsTab() {
  const { selectedTab, setSelectedTab } = useSnsTabQuery();
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
          onClick={() => setSelectedTab(tab.value as SnsTab)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
