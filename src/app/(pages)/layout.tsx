import type { Metadata } from 'next';
import '@/styles/globals.css';
import { GlobalProvider } from '@/lib/providers/global-providers';

export const metadata: Metadata = {
  title: '쇼츠테이블',
  description:
    '음식점 사장님을 위한 쇼츠 영상 제작 플랫폼. AI로 쉽고 빠르게 가게 홍보 영상을 만들어 조회수와 매출을 늘려보세요.',
  keywords: [
    '쇼츠테이블',
    'shorts-table',
    'ai',
    'shorts',
    '음식',
    '식당',
    '신촌',
    '서대문구',
    '쇼츠',
    '테이블',
    '영상',
    '제작',
    'creatomate',
    '홍보',
    '마케팅',
  ],
  openGraph: {
    title: '쇼츠테이블, 음식점 홍보 숏폼 영상 제작 AI 서비스',
    description: '쇼츠테이블, 음식점 홍보 숏폼 영상 제작 AI 서비스',
    type: 'website',
    siteName: '쇼츠테이블',
    url: 'https://shorts-table.com',
    locale: 'ko-KR',
    countryName: '대한민국',
    images: [
      {
        url: 'https://shorts-table.com/img/og/og-image.png',
        width: 1200,
        height: 630,
        alt: '쇼츠테이블, 음식점 홍보 숏폼 영상 제작 AI 서비스',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '쇼츠테이블, 음식점 홍보 숏폼 영상 제작 AI 서비스',
    description: '쇼츠테이블, 음식점 홍보 숏폼 영상 제작 AI 서비스',
    images: ['https://shorts-table.com/img/og/og-image.png'],
    creator: '@shorts-table',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: '쇼츠테이블', url: 'https://shorts-table.com' }],
  creator: '쇼츠테이블',
  publisher: '쇼츠테이블',
  category: 'technology',
  applicationName: '쇼츠테이블',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
  themeColor: '#fa502e',
  appleWebApp: {
    title: '쇼츠테이블',
    statusBarStyle: 'default',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        {/* Pretendard 웹폰트 CDN 설정 */}
        <link
          rel='stylesheet'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css'
          crossOrigin='anonymous'
        />
        {/* viewport 설정 */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
        />
        <meta name='application-name' content='쇼츠테이블' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='쇼츠테이블' />

        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className='select-none antialiased mobile-area w-full h-screen bg-gray-200'>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
