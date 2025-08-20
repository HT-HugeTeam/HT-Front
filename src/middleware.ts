// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // 그 외의 경우 계속 진행
}

export const config = {
  matcher: ['/'], // 미들웨어가 적용될 경로 설정
};
