import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json({ error: '토큰이 필요합니다' }, { status: 400 });
    }

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({ success: true });

    // NextResponse로 쿠키 설정 (더 안정적)
    response.cookies.set('accessToken', token, {
      httpOnly: isProduction,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    console.log('Cookie set via NextResponse');

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: '토큰 설정 중 오류가 발생했습니다' },
      { status: 500 },
    );
  }
}
