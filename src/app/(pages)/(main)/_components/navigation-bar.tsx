'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { ChartBar, House, User, Video } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  key: string;  
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/home', icon: <House/>, label: '홈', key: 'home' },
  { href: '/make-video', icon: <Video/>, label: '영상제작', key: 'make-video' },
  { href: '/dashboard', icon: <ChartBar/>, label: '대시보드', key: 'dashboard' },
  { href: '/mypage', icon: <User/>, label: '마이페이지', key: 'mypage' },
];

export default function NavigationBar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray100 mobile-area">
      <div className="grid grid-cols-4 gap-4 h-20 pt-2 pb-6">
        {navItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center text-gray500 space-y-1 transition-colors duration-200",
                active 
                  && "text-orange500"
              )}
            >
              {/* 아이콘 영역 */}
              <div className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold">
                {item.icon}
              </div>
              
              {/* 텍스트 라벨 */}
              <span className="font-labelSmall">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}