import { type SnsTab } from '@/hooks/use-sns-tab-query';
import { type SocialAccount } from '@/lib/mockdata/sns-accounts';
import AroundAccountIcon from '@/public/svg/shorts/around-card-arrow.svg';
import { UserCircle } from 'lucide-react';
import Link from 'next/link';
import InstagramIcon from '@/public/svg/logo/instagram.svg';
import YoutubeIcon from '@/public/svg/logo/youtube.svg';
import TiktokIcon from '@/public/svg/logo/tiktok.svg';

const SNS_ICON = {
  instagram: <InstagramIcon />,
  youtube: <YoutubeIcon />,
  tiktok: <TiktokIcon />,
};

export function AroundAccountCard({
  account,
  sns,
}: {
  account: SocialAccount;
  sns: SnsTab;
}) {
  return (
    <Link
      href={account.url}
      target='_blank'
      rel='noopener noreferrer'
      className='p-4 flex-1 w-full h-auto flex items-center justify-between rounded-[15px] bg-white000 border border-gray100 shadow-[0_4px_10px_0_rgba(154,159,160,0.15)] hover:bg-orange100 transition-colors duration-200 cursor-pointer'
    >
      <div className='w-full flex items-center gap-4'>
        <span className='relative size-18 aspect-square rounded-full bg-gray400 flex-center'>
          <UserCircle className='size-18 text-white000' />
          <span className='absolute -bottom-4 -right-4 size-auto aspect-square flex-center'>
            {SNS_ICON[sns]}
          </span>
        </span>
        <div className='flex flex-col gap-1 justify-center'>
          <h2 className='text-displayMedium text-gray600'>{account.name}</h2>
          <p className='text-bodySmall text-gray500'>
            팔로워 {account.followers}
          </p>
        </div>
      </div>
      <AroundAccountIcon />
    </Link>
  );
}
