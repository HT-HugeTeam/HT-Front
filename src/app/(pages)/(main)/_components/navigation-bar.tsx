'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import HomeActive from '@/public/svg/nav/home-active.svg';
import HomeInactive from '@/public/svg/nav/home-inactive.svg';
import MakeVideoActive from '@/public/svg/nav/makevideo-active.svg';
import MakeVideoInactive from '@/public/svg/nav/makevideo-inactive.svg';
import ShortsActive from '@/public/svg/nav/shorts-active.svg';
import ShortsInactive from '@/public/svg/nav/shorts-inactive.svg';
import DashboardActive from '@/public/svg/nav/dashboard-active.svg';
import DashboardInactive from '@/public/svg/nav/dashboard-inactive.svg';
import MyPageActive from '@/public/svg/nav/mypage-active.svg';
import MyPageInactive from '@/public/svg/nav/mypage-inactive.svg';

interface NavItem {
  href: string;
  label: string;
  key: string;
  activeIcon: React.ReactNode;
  inactiveIcon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/home',
    activeIcon: <HomeActive />,
    inactiveIcon: <HomeInactive />,
    label: '홈',
    key: 'home',
  },
  {
    href: '/make-video',
    activeIcon: <MakeVideoActive />,
    inactiveIcon: <MakeVideoInactive />,
    label: '영상제작',
    key: 'make-video',
  },
  {
    href: '/shorts',
    activeIcon: <ShortsActive />,
    inactiveIcon: <ShortsInactive />,
    label: '둘러보기',
    key: 'shorts',
  },
  {
    href: '/dashboard',
    activeIcon: <DashboardActive />,
    inactiveIcon: <DashboardInactive />,
    label: '대시보드',
    key: 'dashboard',
  },
  {
    href: '/mypage',
    activeIcon: <MyPageActive />,
    inactiveIcon: <MyPageInactive />,
    label: '마이페이지',
    key: 'mypage',
  },
];

export default function NavigationBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray100 mobile-area'>
      <div className='grid grid-cols-5 gap-4 h-20 pt-2 pb-6'>
        {navItems.map(item => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                'w-auto flex flex-col items-center justify-center text-gray500 transition-colors duration-200',
                active && 'text-orange500',
              )}
            >
              {/* 아이콘 영역 */}
              <span className='w-14 h-12 flex-center'>
                {active ? item.activeIcon : item.inactiveIcon}
              </span>

              {/* 텍스트 라벨 */}
              <span className='font-labelSmall text-[11px] min-mobile:text-[12px]'>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
