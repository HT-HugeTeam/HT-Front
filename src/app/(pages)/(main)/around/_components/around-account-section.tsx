'use client';

import { useSnsTabQuery } from '@/hooks/use-sns-tab-query';
import {
  INSTAGRAM_FOOD_ACCOUNTS,
  type SocialAccount,
  TIKTOK_FOOD_ACCOUNTS,
  YOUTUBE_FOOD_ACCOUNTS,
} from '@/lib/mockdata/sns-accounts';
import { useEffect, useState } from 'react';
import { AroundAccountCard } from './around-account-card';

export function AroundAccountSection() {
  const { selectedTab } = useSnsTabQuery();
  const [accounts, setAccounts] = useState<SocialAccount[]>([]);
  useEffect(() => {
    if (selectedTab === 'instagram') {
      setAccounts(INSTAGRAM_FOOD_ACCOUNTS);
    } else if (selectedTab === 'youtube') {
      setAccounts(YOUTUBE_FOOD_ACCOUNTS);
    } else if (selectedTab === 'tiktok') {
      setAccounts(TIKTOK_FOOD_ACCOUNTS);
    }
  }, [selectedTab]);

  return (
    <section className='w-full h-auto flex flex-col gap-4'>
      {accounts.map(account => (
        <AroundAccountCard
          key={account.name}
          account={account}
          sns={selectedTab}
        />
      ))}
    </section>
  );
}
