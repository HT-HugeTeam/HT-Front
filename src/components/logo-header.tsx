import HeaderMainLogo from '@/public/svg/logo/header-main-logo.svg';
import Link from 'next/link';

export function LogoHeader() {
  return (
    <header className='pt-10 pb-2 px-6 w-full h-auto flex justify-between items-center'>
      <Link href='/home' className='w-fit h-auto'>
        <HeaderMainLogo />
      </Link>
    </header>
  );
}
