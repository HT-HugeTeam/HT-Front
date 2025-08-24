import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 인증이 필요한 경로들
const PROTECTED_ROUTES = [
  '/home',
  '/mypage',
  '/make-video',
  '/dashboard',
  '/shorts',
];

// 인증된 사용자가 접근하면 안 되는 경로들 (로그인 페이지 등)
const AUTH_ROUTES = ['/login'];

/**
 * 요청 경로가 특정 경로 패턴과 매치되는지 확인
 */
function isRouteMatch(pathname: string, routes: string[]): boolean {
  return routes.some(route => {
    if (route.endsWith('*')) {
      // 와일드카드 패턴 지원
      const baseRoute = route.slice(0, -1);
      return pathname.startsWith(baseRoute);
    }
    return pathname === route || pathname.startsWith(route + '/');
  });
}

/**
 * 로그인 페이지로 리디렉션하며 원래 URL을 보존
 */
function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);

  // 현재 URL을 callbackUrl로 저장 (로그인 후 원래 페이지로 돌아가기 위함)
  // if (request.nextUrl.pathname !== '/login') {
  //   loginUrl.searchParams.set('callbackUrl', request.url);
  // }

  return NextResponse.redirect(loginUrl);
}

/**
 * 홈페이지로 리디렉션
 */
function redirectToHome(request: NextRequest): NextResponse {
  const homeUrl = new URL('/home', request.url);
  return NextResponse.redirect(homeUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API 라우트는 미들웨어에서 제외
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // 쿠키에서 토큰 추출
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const isAuthenticated = !!accessToken;

  // 인증된 사용자가 로그인/인증 페이지에 접근하는 경우
  if (isAuthenticated && isRouteMatch(pathname, AUTH_ROUTES)) {
    return redirectToHome(request);
  }

  // 루트 경로 처리
  if (pathname === '/') {
    if (isAuthenticated) {
      return redirectToHome(request);
    } else {
      return redirectToLogin(request);
    }
  }

  // 보호된 경로에 인증되지 않은 사용자가 접근하는 경우
  if (isRouteMatch(pathname, PROTECTED_ROUTES) && !isAuthenticated) {
    return redirectToLogin(request);
  }

  // 토큰이 있지만 유효하지 않은 경우 쿠키 삭제
  if (accessToken && !isAuthenticated) {
    const response = redirectToLogin(request);
    response.cookies.delete('accessToken');
    return response;
  }

  // 정상적인 요청은 보안 헤더와 함께 통과
  return NextResponse.next();
}

export const config = {
  // 미들웨어가 실행될 경로 패턴
  matcher: [
    /*
     * 다음을 제외한 모든 경로에서 실행:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 파일 확장자가 있는 경로
     */
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};
